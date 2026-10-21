# Vibe UI show 🎨✨

**Vibe UI show** คือเว็บแอปพลิเคชันสำหรับโชว์ผลงาน ค้นหาแรงบันดาลใจ และแบ่งปันโค้ด HTML ออนไลน์ พร้อมระบบ **Live Preview Webview** แบบอินเตอร์แอคทีฟ พัฒนาด้วย Next.js (App Router), Tailwind CSS, Supabase และพร้อมดีพลอยบน Vercel ทันที

---

## 🎨 โทนสีและสไตล์การออกแบบ (Design Theme & Palette)
- **Primary Color:** `#425B9A` (Header, Navbar, สัญลักษณ์, ปุ่มหลัก, Active State)
- **Secondary Color:** `#76C0EC` (ขอบการ์ด, กรอบค้นหา, ไอคอนไฮไลต์, บาร์ฟิลเตอร์)
- **Background Color:** `#FFF6DC` (พื้นหลังหลัก สไตล์อบอุ่น สบายตา)
- **Accent Color:** `#FF95A5` (ปุ่ม "+ อัปโหลดไฟล์ HTML", ปุ่มถูกใจ, Badges)

---

## 🚀 ฟีเจอร์หลัก (Key Features)

### สำหรับผู้ใช้ทั่วไป (User):
1. **อัปโหลดไฟล์ HTML (.html, .htm):**
   - รองรับ Drag & Drop ลากไฟล์มาวาง
   - มีระบบอ่านไฟล์อัตโนมัติ คำนวณขนาดไฟล์ และพรีวิวสดก่อนกดบันทึก
   - สามารถระบุชื่อผลงาน, ผู้เขียน, คำอธิบาย และเลือกแท็กได้
2. **Community Gallery & Feed:**
   - แสดงรายการผลงานเป็นการ์ดดีไซน์นุ่มนวล
   - มี Thumbnail Live Iframe ย่อส่วนให้เห็นผลลัพธ์จริงทันที
   - ตัวกรองผลงาน: เรียงตามล่าสุด, ยอดนิยม (Likes), หรือยอดเข้าชม (Views)
   - ค้นหาแบบเรียลไทม์ตามชื่อผลงาน, ผู้แต่ง, หรือแท็ก
3. **ระบบ Live Preview & Code Inspector เต็มจอ:**
   - ดูผลลัพธ์ผ่าน Sandboxed Iframe ที่ปลอดภัย
   - สลับมุมมอง Responsive: หน้าจอคอม (Desktop), แท็บเล็ต (Tablet), มือถือ (Mobile)
   - แท็บ "ดูซอร์สโค้ด HTML" พร้อมเลขบรรทัด และปุ่มคัดลอกโค้ดคลิกเดียว
4. **เครื่องมือแชร์และดาวน์โหลด:**
   - ปุ่ม **Download .html** บันทึกไฟล์กลับสู่เครื่องคอมพิวเตอร์
   - ปุ่ม **Copy Link** สร้างลิงก์ตรงสำหรับเปิดดูชิ้นงานนั้นๆ โดยเฉพาะ (เช่น `?vibe=<id>`)
   - ปุ่มกด **ถูกใจ (Like)** พร้อมเคาน์เตอร์นับจำนวน

### สำหรับผู้ดูแลระบบ (Admin):
- **Admin Mode Toggle:** ปลดล็อกด้วยรหัสผ่านผู้ดูแลระบบ (ค่าเริ่มต้น: `vibe-admin`)
- ปุ่มลบไฟล์ HTML ที่ไม่เหมาะสมหรือต้องการจัดการออกจากเว็บไซต์

---

## 📦 โครงสร้างโปรเจกต์ (Project Structure)

```
Vibe UI/
├── src/
│   ├── app/
│   │   ├── globals.css          # Tailwind CSS theme & custom palette variables
│   │   ├── layout.tsx           # Kanit Thai font & root metadata
│   │   └── page.tsx             # Main Gallery page & controller
│   ├── components/
│   │   ├── Navbar.tsx           # Brand header, search bar, admin toggle, upload button
│   │   ├── HeroBanner.tsx       # Tagline, stats counter, sorting controls
│   │   ├── VibeCard.tsx         # Preview thumbnail, file metadata, actions
│   │   ├── UploadModal.tsx      # Drag & drop upload, file parser, live preview
│   │   ├── FullscreenPreviewModal.tsx # Responsive simulator & HTML inspector
│   │   ├── AdminModal.tsx       # Passcode unlock for administrative actions
│   │   └── Toast.tsx            # Floating feedback notifications
│   ├── lib/
│   │   ├── supabase.ts          # Supabase client + local storage fallback
│   │   └── initialData.ts       # 6 High-quality initial HTML demo snippets
│   └── types/
│       └── vibe.ts              # TypeScript interfaces
├── supabase/
│   └── schema.sql               # Ready-to-run PostgreSQL schema for Supabase
├── .env.example                 # Environment variable templates
├── .env.local                   # Local configuration
└── package.json
```

---

## 🛠️ วิธีการติดตั้งและรันโปรเจกต์ (Local Development)

### 1. ติดตั้ง Dependencies (หากยังไม่ได้ติดตั้ง):
```bash
npm install
```

### 2. รันโหมด Development:
```bash
npm run dev
```
เปิดบราวเซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

> **💡 หมายเหตุ:** โปรเจกต์นี้มาพร้อม **Local Fallback Mode** หากยังไม่ได้เชื่อมต่อ Supabase ระบบจะทำงานผ่าน LocalStorage พร้อมตัวอย่าง HTML สุดอลังการ 6 ชิ้นงาน ให้คุณทดสอบใช้งาน อัปโหลด และเล่นฟีเจอร์ได้ทันที 100% โดยไม่มี Error!

---

## 🗄️ การตั้งค่าเชื่อมต่อกับ Supabase

1. สมัครใช้งานหรือเข้าสู่ระบบที่ [Supabase](https://supabase.com/)
2. สร้าง New Project ใหม่
3. ไปที่เมนู **SQL Editor** ใน Supabase Dashboard แล้วคัดลอกโค้ดจากไฟล์ `supabase/schema.sql` ไปวางแล้วกด **Run**
4. ไปที่ **Project Settings** -> **API** คัดลอกค่า:
   - `Project URL`
   - `anon public key`
5. เปิดไฟล์ `.env.local` ในโปรเจกต์ แล้วกรอกค่า:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_ADMIN_PASSCODE=vibe-admin
```
6. รีสตาร์ทเซิร์ฟเวอร์ `npm run dev` สถานะในหน้าเว็บจะเปลี่ยนเป็น **"Supabase Connected 🟢"** ทันที

---

## 🚀 การ Deploy ขึ้น Vercel

1. Push โค้ดนี้ขึ้น GitHub, GitLab หรือ Bitbucket
2. ล็อกอินเข้าสู่ [Vercel](https://vercel.com/)
3. คลิก **"Add New..."** -> **"Project"** แล้ว Import repository ของโปรเจกต์นี้
4. ในส่วน **Environment Variables** เพิ่มค่า:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_ADMIN_PASSCODE`
5. คลิก **"Deploy"** รอเพียง 1 นาที เว็บไซต์จะออนไลน์พร้อมใช้งานทันที!
#   V i b e - U I  
 