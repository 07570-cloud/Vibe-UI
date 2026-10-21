import { createClient } from '@supabase/supabase-js';
import { HtmlVibe } from '@/types/vibe';
import { INITIAL_VIBES } from './initialData';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const STORAGE_KEY = 'vibe_ui_show_local_vibes';

// Get local fallback data
const getLocalVibes = (): HtmlVibe[] => {
  if (typeof window === 'undefined') return INITIAL_VIBES;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_VIBES));
      return INITIAL_VIBES;
    }
    return JSON.parse(saved);
  } catch {
    return INITIAL_VIBES;
  }
};

const saveLocalVibes = (vibes: HtmlVibe[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vibes));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
};

/**
 * Fetch all HTML Vibes
 */
export async function fetchVibes(): Promise<HtmlVibe[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('vibes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetch error, using local fallback:', error.message);
        return getLocalVibes();
      }
      if (data && data.length > 0) {
        return data as HtmlVibe[];
      }
      return getLocalVibes();
    } catch (err) {
      console.warn('Error querying Supabase:', err);
      return getLocalVibes();
    }
  }

  return getLocalVibes();
}

/**
 * Create a new HTML Vibe
 */
export async function createVibe(vibeData: Omit<HtmlVibe, 'id' | 'likes_count' | 'views_count' | 'created_at'>): Promise<HtmlVibe> {
  const newVibe: HtmlVibe = {
    ...vibeData,
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `vibe-${Date.now()}`,
    likes_count: 0,
    views_count: 1,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('vibes')
        .insert([newVibe])
        .select()
        .single();

      if (!error && data) {
        return data as HtmlVibe;
      }
      console.warn('Supabase insert failed, saving locally:', error?.message);
    } catch (err) {
      console.warn('Supabase insert exception, saving locally:', err);
    }
  }

  // Fallback to local storage
  const current = getLocalVibes();
  const updated = [newVibe, ...current];
  saveLocalVibes(updated);
  return newVibe;
}

/**
 * Delete a Vibe (Admin Action)
 */
export async function deleteVibe(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('vibes').delete().eq('id', id);
      if (error) {
        console.error('Supabase delete error:', error);
      }
    } catch (err) {
      console.error('Supabase delete exception:', err);
    }
  }

  // Also remove from local storage
  const current = getLocalVibes();
  const updated = current.filter(v => v.id !== id);
  saveLocalVibes(updated);
  return true;
}

/**
 * Increment like count
 */
export async function likeVibe(id: string): Promise<number> {
  let newLikes = 1;
  const current = getLocalVibes();
  const target = current.find(v => v.id === id);
  if (target) {
    target.likes_count = (target.likes_count || 0) + 1;
    newLikes = target.likes_count;
    saveLocalVibes([...current]);
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.rpc('increment_likes', { row_id: id });
      if (error) {
        // Fallback standard update if rpc doesn't exist
        await supabase
          .from('vibes')
          .update({ likes_count: newLikes })
          .eq('id', id);
      }
    } catch {
      // Ignored for graceful degradation
    }
  }

  return newLikes;
}

/**
 * Increment view count
 */
export async function incrementView(id: string): Promise<void> {
  const current = getLocalVibes();
  const target = current.find(v => v.id === id);
  if (target) {
    target.views_count = (target.views_count || 0) + 1;
    saveLocalVibes([...current]);
  }

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('vibes')
        .update({ views_count: (target?.views_count || 1) })
        .eq('id', id);
    } catch {
      // Ignored
    }
  }
}
