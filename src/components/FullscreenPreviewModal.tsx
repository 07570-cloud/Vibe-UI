'use client';

import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Code2, 
  Play, 
  User, 
  Calendar, 
  HardDrive, 
  ExternalLink 
} from 'lucide-react';
import { HtmlVibe, ViewportMode } from '@/types/vibe';

interface FullscreenPreviewModalProps {
  vibe: HtmlVibe | null;
  initialTab?: 'preview' | 'code';
  onClose: () => void;
  onCopyLink: (vibe: HtmlVibe) => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const FullscreenPreviewModal: React.FC<FullscreenPreviewModalProps> = ({
  vibe,
  initialTab = 'preview',
  onClose,
  onCopyLink,
  showToast,
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>(initialTab);
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!vibe) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(vibe.html_code);
    setCopiedCode(true);
    showToast('คัดลอกโค้ด HTML ทั้งหมดแล้ว!', 'success');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    onCopyLink(vibe);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownload = () => {
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
    showToast('ดาวน์โหลดไฟล์เรียบร้อย!', 'success');
  };

  const handleOpenInNewWindow = () => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(vibe.html_code);
      newWindow.document.close();
    }
  };

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
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return 'เมื่อเร็วๆ นี้';
    }
  };

  const viewportWidthClass = {
    desktop: 'w-full h-full max-w-full',
    tablet: 'w-[768px] h-full max-h-[85vh] border-8 border-slate-700 rounded-3xl shadow-2xl',
    mobile: 'w-[375px] h-full max-h-[750px] border-8 border-slate-700 rounded-3xl shadow-2xl',
  }[viewport];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
      
      {/* Top Navigation Bar */}
      <div className="bg-[#425B9A] px-4 sm:px-6 py-3 text-white flex flex-wrap items-center justify-between gap-3 border-b border-[#36497c] shrink-0">
        
        {/* Left: Metadata */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#76C0EC]">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold leading-tight flex items-center gap-2">
              <span>{vibe.title}</span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-[#76C0EC]/20 text-[#76C0EC] font-normal hidden sm:inline">
                {vibe.file_name}
              </span>
            </h2>
            <div className="flex items-center gap-3 text-xs text-white/80 mt-0.5">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#FF95A5]" />
                {vibe.author_name}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#76C0EC]" />
                {formatDate(vibe.created_at)}
              </span>
              <span className="flex items-center gap-1">
                <HardDrive className="w-3.5 h-3.5 text-slate-300" />
                {formatFileSize(vibe.file_size)}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Tabs & Viewport Switcher */}
        <div className="flex items-center gap-2 bg-[#334677] p-1 rounded-xl">
          {/* Tab: Live Preview */}
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'preview'
                ? 'bg-[#FF95A5] text-white shadow-xs'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Live Preview</span>
          </button>

          {/* Tab: HTML Code */}
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'code'
                ? 'bg-[#76C0EC] text-slate-900 shadow-xs'
                : 'text-white/80 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>ดูซอร์สโค้ด HTML</span>
          </button>

          {/* Viewport switchers (only visible when in preview mode) */}
          {activeTab === 'preview' && (
            <div className="hidden md:flex items-center pl-2 ml-2 border-l border-white/20 gap-1">
              <button
                onClick={() => setViewport('desktop')}
                title="Desktop View"
                className={`p-1.5 rounded-md transition-colors ${
                  viewport === 'desktop' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewport('tablet')}
                title="Tablet View (768px)"
                className={`p-1.5 rounded-md transition-colors ${
                  viewport === 'tablet' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewport('mobile')}
                title="Mobile View (375px)"
                className={`p-1.5 rounded-md transition-colors ${
                  viewport === 'mobile' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Right: Actions & Close */}
        <div className="flex items-center gap-2">
          {/* Open in new tab */}
          <button
            onClick={handleOpenInNewWindow}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors hidden sm:flex items-center"
            title="เปิดในแท็บใหม่เต็มจอ"
          >
            <ExternalLink className="w-4 h-4" />
          </button>

          {/* Copy Share Link */}
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-medium transition-colors"
            title="คัดลอกลิงก์แชร์"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{copiedLink ? 'คัดลอกแล้ว' : 'แชร์ลิงก์'}</span>
          </button>

          {/* Download HTML */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FF95A5] hover:bg-[#ff7d92] text-white rounded-xl text-xs font-bold shadow-md transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>ดาวน์โหลด HTML</span>
          </button>

          {/* Close Modal */}
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors ml-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto bg-[#1a1d29] flex items-center justify-center p-4 relative">
        
        {activeTab === 'preview' ? (
          /* Live Iframe Sandbox */
          <div className={`transition-all duration-300 flex items-center justify-center ${viewportWidthClass}`}>
            <iframe
              srcDoc={vibe.html_code}
              sandbox="allow-scripts allow-modals allow-forms allow-same-origin"
              title={vibe.title}
              className="w-full h-full bg-white border-0 shadow-2xl rounded-xl"
            />
          </div>
        ) : (
          /* Source Code Inspection Tab */
          <div className="w-full max-w-5xl h-full flex flex-col bg-[#0f172a] rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
            <div className="bg-[#1e293b] px-4 py-2.5 flex items-center justify-between border-b border-slate-700 text-xs text-slate-300">
              <span className="font-mono text-[#76C0EC]">{vibe.file_name}</span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#425B9A] hover:bg-[#34487b] text-white rounded-lg text-xs font-semibold transition-colors"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'คัดลอกสำเร็จ!' : 'คัดลอกโค้ดทั้งหมด'}</span>
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 font-mono text-xs text-emerald-400 bg-[#0b0f19] selection:bg-[#FF95A5] selection:text-white">
              <pre className="whitespace-pre-wrap leading-relaxed">{vibe.html_code}</pre>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
