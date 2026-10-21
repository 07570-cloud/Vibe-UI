'use client';

import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, KeyRound, X } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  isAdmin: boolean;
  onClose: () => void;
  onAuthenticate: (pass: string) => boolean;
  onLogout: () => void;
  showToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  isAdmin,
  onClose,
  onAuthenticate,
  onLogout,
  showToast,
}) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onAuthenticate(passcode);
    if (success) {
      setError(false);
      setPasscode('');
      showToast('เข้าสู่โหมด Admin สำเร็จ! คุณสามารถจัดการและลบไฟล์ได้แล้ว', 'success');
      onClose();
    } else {
      setError(true);
      showToast('รหัสผ่านไม่ถูกต้อง (รหัสผ่านเริ่มต้นคือ vibe-admin)', 'error');
    }
  };

  const handleLogout = () => {
    onLogout();
    showToast('ออกจากโหมดผู้ดูแลระบบแล้ว', 'info');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-md bg-[#FFF6DC] rounded-3xl shadow-2xl border-4 border-[#425B9A] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#425B9A] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#76C0EC]" />
            <h3 className="font-bold text-base">ระบบจัดการผู้ดูแลระบบ (Admin)</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/80 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {isAdmin ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-800">กำลังอยู่ในโหมดผู้ดูแลระบบ</h4>
                <p className="text-xs text-slate-600 mt-1">
                  คุณมีสิทธิ์ในการลบไฟล์ HTML และจัดการเนื้อหาบนเว็บไซต์ Vibe UI
                </p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-bold shadow-md transition-all"
              >
                ออกจากโหมด Admin
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#425B9A]/10 text-[#425B9A] flex items-center justify-center mx-auto mb-2">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-800 text-base">ยืนยันรหัสผ่าน Admin</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  กรุณากรอกรหัสผ่านเพื่อปลดล็อกฟังก์ชันจัดการและลบไฟล์ (ค่าเริ่มต้น: <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">vibe-admin</code>)
                </p>
              </div>

              <div>
                <input
                  type="password"
                  required
                  autoFocus
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setError(false);
                  }}
                  placeholder="กรอกรหัสผ่าน..."
                  className={`w-full px-4 py-2.5 bg-white text-slate-800 rounded-xl text-sm border-2 focus:outline-none transition-all shadow-xs ${
                    error ? 'border-rose-500 focus:ring-2 focus:ring-rose-200' : 'border-[#76C0EC] focus:border-[#425B9A]'
                  }`}
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 text-xs font-semibold text-slate-600 hover:bg-black/5 rounded-xl transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#425B9A] hover:bg-[#34487b] text-white rounded-xl text-xs font-bold shadow-md transition-all"
                >
                  เข้าสู่ระบบ Admin
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
