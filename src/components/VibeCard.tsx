'use client';

import React, { useState } from 'react';
import { Maximize2, Download, Copy, Heart, Trash2, Eye, User, FileCode, Check } from 'lucide-react';
import { HtmlVibe } from '@/types/vibe';

interface VibeCardProps {
  vibe: HtmlVibe;
  onPreview: (vibe: HtmlVibe) => void;
  onInspectCode: (vibe: HtmlVibe) => void;
  onLike: (id: string) => void;
  onDelete?: (id: string) => void;
  onCopyLink: (vibe: HtmlVibe) => void;
  isAdmin: boolean;
}

export const VibeCard: React.FC<VibeCardProps> = ({
  vibe,
  onPreview,
  onInspectCode,
  onLike,
  onDelete,
  onCopyLink,
  isAdmin,
}) => {
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (!bytes || bytes === 0) return '1.2 KB';
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('th-TH', {
        day: 'numeric',
        month: 'short',
        year: '2-digit',
      });
    } catch {
      return 'เมื่อเร็วๆ นี้';
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const blob = new Blob([vibe.html_code], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = vibe.file_name.endsWith('.html') || vibe.file_name.endsWith('.htm') 
      ? vibe.file_name 
      : `${vibe.file_name}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!liked) {
      setLiked(true);
      onLike(vibe.id);
    }
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopyLink(vibe);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border-2 border-[#76C0EC]/30 shadow-md hover:shadow-xl hover:border-[#76C0EC] transition-all duration-300 flex flex-col">
      
      {/* Mini Preview Thumbnail Container */}
      <div 
        onClick={() => onPreview(vibe)}
        className="relative h-48 w-full bg-slate-900 overflow-hidden cursor-pointer group-hover:brightness-95 transition-all"
        title="คลิกเพื่อดูตัวอย่างแบบเต็มจอ"
      >
        {/* Scaled Sandboxed iframe */}
        <div className="absolute inset-0 pointer-events-none origin-top-left scale-50 w-[200%] h-[200%]">
          <iframe
            srcDoc={vibe.html_code}
            sandbox="allow-scripts"
            title={vibe.title}
            className="w-full h-full border-0 bg-white"
            loading="lazy"
          />
        </div>

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-[#425B9A]/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-[#425B9A] text-xs font-semibold shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all">
            <Maximize2 className="w-3.5 h-3.5 text-[#FF95A5]" />
            คลิกดูเต็มจอ (Preview)
          </span>
        </div>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[11px] font-mono">
            {formatFileSize(vibe.file_size)}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-white/80 backdrop-blur-md text-[#425B9A] text-[11px] font-semibold">
            {formatDate(vibe.created_at)}
          </span>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Tags */}
          {vibe.tags && vibe.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {vibe.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-[#FFF6DC] text-[#425B9A] border border-[#76C0EC]/30 text-[10px] font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Title & Description */}
          <h3 
            onClick={() => onPreview(vibe)}
            className="text-base font-bold text-[#425B9A] hover:text-[#34487b] line-clamp-1 cursor-pointer transition-colors"
          >
            {vibe.title}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 mt-1 min-h-[32px]">
            {vibe.description || "ไฟล์ HTML ตัวอย่างสำหรับนักพัฒนาและผู้ที่สนใจ"}
          </p>

          {/* Author & File Info */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <div className="w-5 h-5 rounded-full bg-[#76C0EC]/20 text-[#425B9A] flex items-center justify-center">
                <User className="w-3 h-3" />
              </div>
              <span className="truncate max-w-[120px]">{vibe.author_name}</span>
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              <span className="flex items-center gap-0.5 text-slate-400">
                <Eye className="w-3 h-3" />
                {vibe.views_count || 1}
              </span>
              <button
                onClick={handleLike}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full transition-all ${
                  liked 
                    ? 'bg-rose-50 text-[#FF95A5] font-bold' 
                    : 'text-slate-500 hover:text-[#FF95A5] hover:bg-rose-50'
                }`}
                title="กดถูกใจ"
              >
                <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-[#FF95A5] text-[#FF95A5]' : ''}`} />
                <span>{vibe.likes_count + (liked ? 1 : 0)}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="mt-4 pt-3 border-t border-[#76C0EC]/20 flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-1">
            {/* Fullscreen Preview */}
            <button
              onClick={() => onPreview(vibe)}
              className="p-1.5 text-xs font-medium text-[#425B9A] hover:bg-[#76C0EC]/20 rounded-lg transition-colors flex items-center gap-1"
              title="ดูผลลัพธ์แบบเต็มจอ"
            >
              <Maximize2 className="w-4 h-4 text-[#425B9A]" />
              <span className="text-[11px] hidden sm:inline">พรีวิว</span>
            </button>

            {/* Inspect HTML Code */}
            <button
              onClick={() => onInspectCode(vibe)}
              className="p-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1"
              title="ดูซอร์สโค้ด HTML"
            >
              <FileCode className="w-4 h-4 text-[#76C0EC]" />
              <span className="text-[11px] hidden sm:inline">โค้ด</span>
            </button>
          </div>

          <div className="flex items-center gap-1">
            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                copied ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
              }`}
              title="คัดลอกลิงก์แชร์"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="px-2.5 py-1.5 bg-[#425B9A] hover:bg-[#34487b] text-white rounded-lg text-[11px] font-semibold flex items-center gap-1 shadow-xs transition-colors"
              title="ดาวน์โหลดไฟล์ HTML"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ดาวน์โหลด</span>
            </button>

            {/* Admin Delete Action */}
            {isAdmin && onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`ต้องการลบผลงาน "${vibe.title}" หรือไม่?`)) {
                    onDelete(vibe.id);
                  }
                }}
                className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                title="ลบไฟล์ (Admin)"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
