'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroBanner } from '@/components/HeroBanner';
import { VibeCard } from '@/components/VibeCard';
import { UploadModal } from '@/components/UploadModal';
import { FullscreenPreviewModal } from '@/components/FullscreenPreviewModal';
import { AdminModal } from '@/components/AdminModal';
import { Toast, ToastMessage } from '@/components/Toast';
import { HtmlVibe, SortOption } from '@/types/vibe';
import { 
  fetchVibes, 
  createVibe, 
  deleteVibe, 
  likeVibe, 
  incrementView, 
  isSupabaseConfigured 
} from '@/lib/supabase';
import { SearchX, Sparkles, Heart } from 'lucide-react';

export default function Home() {
  const [vibes, setVibes] = useState<HtmlVibe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSort, setCurrentSort] = useState<SortOption>('latest');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [previewVibe, setPreviewVibe] = useState<HtmlVibe | null>(null);
  const [previewTab, setPreviewTab] = useState<'preview' | 'code'>('preview');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load vibes on mount
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchVibes();
        setVibes(data);
      } catch (err) {
        console.error('Failed to load vibes', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();

    // Check if admin was enabled in session
    if (typeof window !== 'undefined') {
      const savedAdmin = sessionStorage.getItem('vibe_is_admin');
      if (savedAdmin === 'true') {
        setIsAdmin(true);
      }

      // Check query param for direct preview
      const urlParams = new URLSearchParams(window.location.search);
      const vibeId = urlParams.get('vibe');
      if (vibeId) {
        // Will be matched once vibes load
      }
    }
  }, []);

  // Handle direct link query param after vibes loaded
  useEffect(() => {
    if (vibes.length > 0 && typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const vibeId = urlParams.get('vibe');
      if (vibeId) {
        const found = vibes.find(v => v.id === vibeId);
        if (found) {
          setPreviewVibe(found);
          incrementView(found.id);
        }
      }
    }
  }, [vibes]);

  // Toast handler
  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Filter & Sort Vibes
  const filteredAndSortedVibes = useMemo(() => {
    let result = [...vibes];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((v) =>
        v.title.toLowerCase().includes(q) ||
        v.description?.toLowerCase().includes(q) ||
        v.author_name.toLowerCase().includes(q) ||
        v.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (currentSort === 'latest') {
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (currentSort === 'popular') {
      result.sort((a, b) => (b.likes_count || 0) - (a.likes_count || 0));
    } else if (currentSort === 'views') {
      result.sort((a, b) => (b.views_count || 0) - (a.views_count || 0));
    }

    return result;
  }, [vibes, searchQuery, currentSort]);

  // Total stats
  const totalLikes = useMemo(() => vibes.reduce((acc, v) => acc + (v.likes_count || 0), 0), [vibes]);
  const totalViews = useMemo(() => vibes.reduce((acc, v) => acc + (v.views_count || 0), 0), [vibes]);

  // Handle Upload
  const handleUploadSuccess = async (newVibeData: Omit<HtmlVibe, 'id' | 'likes_count' | 'views_count' | 'created_at'>) => {
    const created = await createVibe(newVibeData);
    setVibes((prev) => [created, ...prev]);
  };

  // Handle Like
  const handleLike = async (id: string) => {
    const newLikes = await likeVibe(id);
    setVibes((prev) =>
      prev.map((v) => (v.id === id ? { ...v, likes_count: newLikes } : v))
    );
  };

  // Handle Delete (Admin)
  const handleDelete = async (id: string) => {
    await deleteVibe(id);
    setVibes((prev) => prev.filter((v) => v.id !== id));
    showToast('ลบไฟล์ผลงานเรียบร้อยแล้ว', 'info');
  };

  // Handle Open Preview Modal
  const handleOpenPreview = (vibe: HtmlVibe) => {
    setPreviewVibe(vibe);
    setPreviewTab('preview');
    incrementView(vibe.id);
    setVibes((prev) =>
      prev.map((v) => (v.id === vibe.id ? { ...v, views_count: (v.views_count || 0) + 1 } : v))
    );
  };

  // Handle Open Code View Modal
  const handleInspectCode = (vibe: HtmlVibe) => {
    setPreviewVibe(vibe);
    setPreviewTab('code');
    incrementView(vibe.id);
  };

  // Handle Share / Copy Link
  const handleCopyLink = (vibe: HtmlVibe) => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}${window.location.pathname}?vibe=${vibe.id}`;
      navigator.clipboard.writeText(url);
      showToast(`คัดลอกลิงก์แชร์ "${vibe.title}" สำเร็จ!`, 'success');
    }
  };

  // Admin Authentication
  const handleAdminAuth = (pass: string) => {
    const validPass = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || 'vibe-admin';
    if (pass === validPass) {
      setIsAdmin(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('vibe_is_admin', 'true');
      }
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('vibe_is_admin');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF6DC]">
      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Header Navigation */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenUpload={() => setIsUploadOpen(true)}
        isAdmin={isAdmin}
        onToggleAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Hero Section & Stats */}
      <HeroBanner
        totalCount={vibes.length}
        totalLikes={totalLikes}
        totalViews={totalViews}
        currentSort={currentSort}
        onSortChange={setCurrentSort}
        isSupabaseActive={isSupabaseConfigured}
      />

      {/* Main Gallery Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {loading ? (
          /* Loading skeleton */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-white/70 rounded-2xl animate-pulse border-2 border-[#76C0EC]/30 p-4 flex flex-col justify-between">
                <div className="h-44 bg-slate-200/80 rounded-xl" />
                <div className="space-y-2 mt-3">
                  <div className="h-4 bg-slate-200/80 rounded w-3/4" />
                  <div className="h-3 bg-slate-200/80 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredAndSortedVibes.length > 0 ? (
          /* Gallery Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedVibes.map((vibe) => (
              <VibeCard
                key={vibe.id}
                vibe={vibe}
                onPreview={handleOpenPreview}
                onInspectCode={handleInspectCode}
                onLike={handleLike}
                onDelete={isAdmin ? handleDelete : undefined}
                onCopyLink={handleCopyLink}
                isAdmin={isAdmin}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-20 px-4 bg-white/60 rounded-3xl border-2 border-dashed border-[#76C0EC]/50 max-w-xl mx-auto my-8">
            <div className="w-16 h-16 rounded-3xl bg-[#76C0EC]/20 text-[#425B9A] flex items-center justify-center mx-auto mb-4">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#425B9A]">ไม่พบผลงานที่ตรงกับการค้นหา</h3>
            <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
              ลองค้นหาด้วยคำอื่น หรือเป็นคนแรกที่อัปโหลดไอเดียโค้ด HTML ในหัวข้อนี้!
            </p>
            <div className="mt-5 flex justify-center gap-3">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 bg-white text-slate-700 text-xs font-semibold rounded-xl border border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  ล้างคำค้นหา
                </button>
              )}
              <button
                onClick={() => setIsUploadOpen(true)}
                className="px-5 py-2 bg-[#FF95A5] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#ff7d92] transition-colors"
              >
                + อัปโหลดไฟล์ HTML ใหม่
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-[#425B9A] text-white/90 border-t border-[#34487b] py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FF95A5]" />
            <span className="font-bold tracking-wider">Vibe UI show</span>
            <span className="text-white/60">• แพลตฟอร์มพรีวิวและแบ่งปันโค้ด HTML ออนไลน์</span>
          </div>
          <div className="flex items-center gap-4 text-white/70">
            <span>Palette: #425B9A • #76C0EC • #FFF6DC • #FF95A5</span>
            <span>Deploy ready on Vercel & Supabase</span>
          </div>
        </div>
      </footer>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={handleUploadSuccess}
        showToast={showToast}
      />

      {/* Fullscreen Preview / Code Inspector Modal */}
      <FullscreenPreviewModal
        vibe={previewVibe}
        initialTab={previewTab}
        onClose={() => setPreviewVibe(null)}
        onCopyLink={handleCopyLink}
        showToast={showToast}
      />

      {/* Admin Passcode Modal */}
      <AdminModal
        isOpen={isAdminModalOpen}
        isAdmin={isAdmin}
        onClose={() => setIsAdminModalOpen(false)}
        onAuthenticate={handleAdminAuth}
        onLogout={handleAdminLogout}
        showToast={showToast}
      />
    </div>
  );
}
