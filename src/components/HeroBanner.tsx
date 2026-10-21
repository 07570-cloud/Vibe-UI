'use client';

import React from 'react';
import { Sparkles, Database, FileCode, Flame, Heart, Eye } from 'lucide-react';
import { SortOption } from '@/types/vibe';

interface HeroBannerProps {
  totalCount: number;
  totalLikes: number;
  totalViews: number;
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  isSupabaseActive: boolean;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  totalCount,
  totalLikes,
  totalViews,
  currentSort,
  onSortChange,
  isSupabaseActive,
}) => {
  return (
    <div className="relative pt-8 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-gradient-to-r from-[#76C0EC]/20 via-[#FF95A5]/20 to-[#425B9A]/15 blur-3xl -z-10 pointer-events-none rounded-full" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left Column: Heading & Tagline */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#76C0EC] text-xs font-medium text-[#425B9A] shadow-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FF95A5]" />
            <span>แหล่งรวมแรงบันดาลใจโค้ด HTML ประจำวัน</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#76C0EC]" />
            <span className="text-[11px] text-slate-500">Live Webview Iframe</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#425B9A] tracking-tight leading-tight">
            ค้นพบ & โชว์พลังความคิดสร้างสรรค์ <br className="hidden sm:block" />
            ผ่านไฟล์ <span className="text-[#FF95A5] underline decoration-[#76C0EC] decoration-wavy decoration-2">HTML</span> ของคุณ
          </h1>

          <p className="mt-2.5 text-slate-700 text-sm sm:text-base leading-relaxed">
            อัปโหลดไฟล์ HTML เพื่อทดสอบเล่นแบบสดๆ ผ่าน Webview แบ่งปันเทคนิค CSS/JS สุดว้าว 
            หรือดาวน์โหลดโค้ดตัวอย่างไปต่อยอดโปรเจกต์ของคุณได้ฟรีทันที!
          </p>
        </div>

        {/* Right Column: Mini Stats Card */}
        <div className="flex flex-wrap sm:flex-nowrap gap-3 bg-white/90 backdrop-blur-md p-4 rounded-2xl border-2 border-[#76C0EC]/40 shadow-sm shrink-0">
          <div className="px-3.5 py-1.5 text-center border-r border-slate-100 last:border-none">
            <div className="flex items-center justify-center gap-1.5 text-[#425B9A]">
              <FileCode className="w-4 h-4 text-[#76C0EC]" />
              <span className="text-xl font-bold">{totalCount}</span>
            </div>
            <span className="text-[11px] text-slate-500">ไฟล์ HTML</span>
          </div>

          <div className="px-3.5 py-1.5 text-center border-r border-slate-100 last:border-none">
            <div className="flex items-center justify-center gap-1.5 text-[#425B9A]">
              <Heart className="w-4 h-4 text-[#FF95A5]" />
              <span className="text-xl font-bold">{totalLikes}</span>
            </div>
            <span className="text-[11px] text-slate-500">ถูกใจ</span>
          </div>

          <div className="px-3.5 py-1.5 text-center">
            <div className="flex items-center justify-center gap-1.5 text-[#425B9A]">
              <Eye className="w-4 h-4 text-[#76C0EC]" />
              <span className="text-xl font-bold">{totalViews}</span>
            </div>
            <span className="text-[11px] text-slate-500">ยอดวิว</span>
          </div>
        </div>
      </div>

      {/* Sort Filter Bar & Status Bar */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#76C0EC]/30">
        
        {/* Sort Tabs */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">
            เรียงตาม:
          </span>
          <button
            onClick={() => onSortChange('latest')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentSort === 'latest'
                ? 'bg-[#425B9A] text-white shadow-xs'
                : 'bg-white/80 text-slate-700 hover:bg-white border border-[#76C0EC]/40'
            }`}
          >
            ล่าสุด
          </button>
          <button
            onClick={() => onSortChange('popular')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
              currentSort === 'popular'
                ? 'bg-[#FF95A5] text-white shadow-xs'
                : 'bg-white/80 text-slate-700 hover:bg-white border border-[#76C0EC]/40'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            ยอดนิยม (Likes)
          </button>
          <button
            onClick={() => onSortChange('views')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentSort === 'views'
                ? 'bg-[#76C0EC] text-slate-900 shadow-xs'
                : 'bg-white/80 text-slate-700 hover:bg-white border border-[#76C0EC]/40'
            }`}
          >
            เข้าชมสูงสุด
          </button>
        </div>

        {/* Database Engine Status */}
        <div className="flex items-center gap-2 text-xs text-slate-600 bg-white/70 px-3 py-1 rounded-full border border-slate-200">
          <Database className={`w-3.5 h-3.5 ${isSupabaseActive ? 'text-emerald-500' : 'text-amber-500'}`} />
          <span>ฐานข้อมูล:</span>
          {isSupabaseActive ? (
            <span className="font-semibold text-emerald-600 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              Supabase Connected
            </span>
          ) : (
            <span className="font-medium text-amber-600" title="สามารถตั้งค่า .env.local เพื่อเชื่อม Supabase หรือใช้งาน Local Mode ได้ทันที">
              Local Storage Mode (ทดสอบระบบ)
            </span>
          )}
        </div>

      </div>
    </div>
  );
};
