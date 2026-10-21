'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, X, FileCode, CheckCircle2, Sparkles, AlertCircle, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';
import { HtmlVibe } from '@/types/vibe';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newVibe: Omit<HtmlVibe, 'id' | 'likes_count' | 'views_count' | 'created_at'>) => Promise<void>;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

const AVAILABLE_TAGS = ['Animation', 'CSS Art', 'Glassmorphism', 'Neumorphism', 'Card', 'Game', 'Cyberpunk', 'Dashboard', 'Form'];

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  showToast,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModalPreview, setShowModalPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFile = (selectedFile: File) => {
    if (!selectedFile.name.endsWith('.html') && !selectedFile.name.endsWith('.htm')) {
      showToast('กรุณาเลือกไฟล์ที่มีนามสกุล .html หรือ .htm เท่านั้น', 'error');
      return;
    }

    setFile(selectedFile);
    if (!title) {
      // Auto-populate title from filename
      const cleanName = selectedFile.name.replace(/\.(html|htm)$/i, '').replace(/[-_]/g, ' ');
      setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setHtmlContent(content || '');
    };
    reader.readAsText(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length >= 4) {
        showToast('เลือกได้สูงสุด 4 แท็ก', 'info');
        return;
      }
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!htmlContent.trim()) {
      showToast('กรุณาอัปโหลดไฟล์ HTML หรือใส่โค้ด HTML', 'error');
      return;
    }

    if (!title.trim()) {
      showToast('กรุณาระบุชื่อผลงาน', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSuccess({
        title: title.trim(),
        description: description.trim() || 'ผลงานสร้างสรรค์ด้วยโค้ด HTML',
        author_name: authorName.trim() || 'Anonymous Developer',
        file_name: file?.name || `${title.toLowerCase().replace(/\s+/g, '-')}.html`,
        file_size: file?.size || new Blob([htmlContent]).size,
        html_code: htmlContent,
        tags: selectedTags,
      });

      // Fire confetti celebration!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#425B9A', '#76C0EC', '#FF95A5', '#FFF6DC']
        });
      } catch {
        // Confetti fallback
      }

      showToast('อัปโหลดผลงาน HTML สำเร็จเรียบร้อย!', 'success');
      handleResetAndClose();
    } catch {
      showToast('เกิดข้อผิดพลาดในการอัปโหลด กรุณาลองใหม่อีกครั้ง', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setFile(null);
    setHtmlContent('');
    setTitle('');
    setAuthorName('');
    setDescription('');
    setSelectedTags([]);
    setShowModalPreview(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-2xl bg-[#FFF6DC] rounded-3xl shadow-2xl border-4 border-[#76C0EC]/50 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="bg-[#425B9A] px-6 py-5 text-white flex items-center justify-between border-b border-[#34487b]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
              <Sparkles className="w-5 h-5 text-[#FF95A5]" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-wide">อัปโหลดไฟล์ HTML</h2>
              <p className="text-xs text-[#76C0EC]">แชร์ผลงานหรือไอเดียโค้ดของคุณสู่ Vibe UI Community</p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Drag & Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
              dragActive 
                ? 'border-[#FF95A5] bg-[#FF95A5]/10 scale-[1.01]' 
                : file 
                  ? 'border-emerald-500 bg-emerald-50/70' 
                  : 'border-[#76C0EC] bg-white/70 hover:bg-white hover:border-[#425B9A]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".html,.htm"
              onChange={handleFileInputChange}
              className="hidden"
            />

            {file ? (
              <div className="flex flex-col items-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-2" />
                <p className="text-sm font-bold text-slate-800">{file.name}</p>
                <p className="text-xs text-slate-500 mt-1">
                  ขนาดไฟล์: {(file.size / 1024).toFixed(1)} KB • คลิกเพื่อเปลี่ยนไฟล์
                </p>
                {htmlContent && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowModalPreview(!showModalPreview);
                    }}
                    className="mt-3 px-3 py-1 bg-[#425B9A] text-white text-xs rounded-lg flex items-center gap-1.5 hover:bg-[#34487b]"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#76C0EC]" />
                    {showModalPreview ? 'ซ่อนพรีวิว' : 'ทดสอบดูพรีวิวสดก่อนบันทึก'}
                  </button>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-[#76C0EC]/20 text-[#425B9A] flex items-center justify-center mb-3">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-800">
                  ลากไฟล์ HTML มาวางที่นี่ หรือ <span className="text-[#425B9A] underline">คลิกเพื่อเลือกไฟล์</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  รองรับไฟล์ .html, .htm (มี CSS & JS ภายในไฟล์ได้)
                </p>
              </div>
            )}
          </div>

          {/* Quick Mini Live Preview inside Modal */}
          {showModalPreview && htmlContent && (
            <div className="bg-white rounded-2xl p-3 border-2 border-[#76C0EC] shadow-inner">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2 px-1">
                <span className="font-semibold text-[#425B9A]">ตัวอย่างการแสดงผลแบบสด:</span>
                <span>Sandboxed Iframe</span>
              </div>
              <div className="h-44 w-full rounded-xl overflow-hidden border border-slate-200">
                <iframe
                  srcDoc={htmlContent}
                  sandbox="allow-scripts"
                  className="w-full h-full border-0 bg-white"
                  title="Upload Preview"
                />
              </div>
            </div>
          )}

          {/* Work Title Input */}
          <div>
            <label className="block text-xs font-bold text-[#425B9A] uppercase tracking-wider mb-1.5">
              ชื่อผลงาน HTML <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="เช่น Cyberpunk Neon Glow Card, Minimal Button"
              className="w-full px-4 py-2.5 bg-white text-slate-800 rounded-xl text-sm border-2 border-[#76C0EC]/60 focus:border-[#425B9A] focus:outline-none focus:ring-2 focus:ring-[#76C0EC]/20 transition-all shadow-xs"
            />
          </div>

          {/* Author Name Input */}
          <div>
            <label className="block text-xs font-bold text-[#425B9A] uppercase tracking-wider mb-1.5">
              ชื่อผู้เขียน / ผู้สร้างสรรค์
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="เช่น Your Name, @github_user, หรือปล่อยว่างเป็น Anonymous"
              className="w-full px-4 py-2.5 bg-white text-slate-800 rounded-xl text-sm border-2 border-[#76C0EC]/60 focus:border-[#425B9A] focus:outline-none focus:ring-2 focus:ring-[#76C0EC]/20 transition-all shadow-xs"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-xs font-bold text-[#425B9A] uppercase tracking-wider mb-1.5">
              คำอธิบายสั้นๆ เกี่ยวกับผลงาน
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="อธิบายลูกเล่น เทคนิค CSS หรือวิธีนำไปใช้งาน..."
              className="w-full px-4 py-2.5 bg-white text-slate-800 rounded-xl text-sm border-2 border-[#76C0EC]/60 focus:border-[#425B9A] focus:outline-none focus:ring-2 focus:ring-[#76C0EC]/20 transition-all shadow-xs resize-none"
            />
          </div>

          {/* Tag Selection */}
          <div>
            <label className="block text-xs font-bold text-[#425B9A] uppercase tracking-wider mb-1.5">
              หมวดหมู่ / แท็ก (เลือกได้สูงสุด 4 แท็ก)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {AVAILABLE_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-[#425B9A] text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-[#76C0EC]/40 hover:bg-[#76C0EC]/20'
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#76C0EC]/30">
            <button
              type="button"
              onClick={handleResetAndClose}
              className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-black/5 rounded-xl transition-colors"
            >
              ยกเลิก
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !htmlContent}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg flex items-center gap-2 transition-all ${
                isSubmitting || !htmlContent
                  ? 'bg-slate-400 cursor-not-allowed opacity-60'
                  : 'bg-[#FF95A5] hover:bg-[#ff7d92] active:scale-95 shadow-[#FF95A5]/40 hover:shadow-xl hover:shadow-[#FF95A5]/60'
              }`}
            >
              <FileCode className="w-4 h-4 stroke-[2.5]" />
              <span>{isSubmitting ? 'กำลังบันทึก...' : 'เผยแพร่ผลงาน HTML'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
