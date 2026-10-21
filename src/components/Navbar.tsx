'use client';

import React from 'react';
import { Search, Plus, Shield, ShieldAlert, Code2, Sparkles, X } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenUpload: () => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  onOpenUpload,
  isAdmin,
  onToggleAdmin,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#425B9A] shadow-md border-b border-[#36497c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer select-none" onClick={() => onSearchChange('')}>
          <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white shadow-inner">
            <Code2 className="w-6 h-6 text-[#76C0EC]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-bold tracking-tight text-white">Vibe UI</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FF95A5] text-white tracking-wider uppercase">
                SHOW
              </span>
            </div>
            <p className="text-[11px] text-[#76C0EC] font-light hidden sm:block">
              HTML Showcase & Live Playground
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-2 relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#76C0EC] absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ค้นหาชื่อผลงาน, ผู้เขียน, แท็ก..."
              className="w-full pl-10 pr-9 py-2.5 bg-white/95 text-[#1E293B] placeholder-slate-400 rounded-xl text-sm border-2 border-[#76C0EC] focus:border-[#FF95A5] focus:outline-none focus:ring-2 focus:ring-[#FF95A5]/30 transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 p-0.5 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Admin Mode Toggle */}
          <button
            onClick={onToggleAdmin}
            title={isAdmin ? "โหมดผู้ดูแลระบบ: เปิดใช้งาน (คลิกเพื่อปิด)" : "เข้าสู่โหมดผู้ดูแลระบบ (Admin Mode)"}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              isAdmin
                ? "bg-rose-500 text-white shadow-md hover:bg-rose-600 ring-2 ring-white/40"
                : "bg-white/10 text-white/90 hover:bg-white/20 border border-white/15"
            }`}
          >
            {isAdmin ? (
              <>
                <ShieldAlert className="w-4 h-4 text-white animate-pulse" />
                <span className="hidden sm:inline">Admin Mode</span>
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 text-[#76C0EC]" />
                <span className="hidden sm:inline">Admin</span>
              </>
            )}
          </button>

          {/* Upload Button */}
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#FF95A5] hover:bg-[#ff7d92] active:scale-95 text-white font-semibold text-sm rounded-xl shadow-lg shadow-[#FF95A5]/35 hover:shadow-xl hover:shadow-[#FF95A5]/50 transition-all cursor-pointer"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span className="hidden sm:inline">+ อัปโหลดไฟล์ HTML</span>
            <span className="sm:hidden">อัปโหลด</span>
          </button>
        </div>

      </div>
    </header>
  );
};
