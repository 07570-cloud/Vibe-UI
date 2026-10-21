export interface HtmlVibe {
  id: string;
  title: string;
  description: string;
  author_name: string;
  file_name: string;
  file_size: number;
  html_code: string;
  likes_count: number;
  views_count: number;
  created_at: string;
  tags?: string[];
}

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export type SortOption = 'latest' | 'popular' | 'views';
