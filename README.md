# Ringkasan Proyek — Point of Sales

## 1) Gambaran Umum
Project ini adalah aplikasi Point of Sales berbasis Next.js (App Router) dengan pendekatan struktur “feature-first” (folder `features/`). UI dibangun dengan Tailwind CSS dan pola komponen shadcn/ui (Radix UI).

Fokus implementasi saat ini:
- Login sederhana + guard token berbasis localStorage.
- Dashboard (Home) dengan metric cards, chart sales overview, best seller section, dan tabel transaksi.
- POS page untuk order queue, menu, serta order detail (item list, payment summary, payment method).

## 2) Teknologi & Dependensi Utama
Sumber: `package.json`
- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4 + tailwindcss-animate
- shadcn/ui-style components (Radix UI)
- Lucide icons
- ESLint 9

Script penting:
- `npm run dev` — dev server
- `npm run build` — build
- `npm run start` — start
- `npm run lint` — lint
- `npm run create:feature` — generator folder feature

## 3) Struktur Folder
### app/
Berisi routing & layout App Router.
- Route group:
  - `(auth)` — login
  - `(dashboard)` — area setelah login
- Guard:
  - `app/(auth)/login/_guard/AuthIsLoginGuard.tsx`
  - `app/(dashboard)/_guard/AuthGuard.tsx`
- Layout:
  - `app/(dashboard)/layout.tsx` membungkus dashboard dengan sidebar + header + footer dan guard.

### features/
Implementasi domain per fitur, umumnya memiliki:
- `components/` UI feature
- `hooks/` hook feature
- `services/` (data dummy & usecases)
- `types/` tipe domain
- `utils/` helper domain

Feature yang ada:
- `auth` — login, hook `useSignIn`, usecase sign-in, types.
- `sidebar` — sidebar icon-only + menu data + helper active route.
- `menu` — category tabs + product card + menu section.
- `order-detail` — item list detail, payment summary, payment method.
- `product-best-seller` — ranking best seller dengan dropdown period.

### shared/
Komponen reusable lintas fitur.
- `shared/components/ui/*` — shadcn/ui-style primitives (button, card, dropdown-menu, input, sidebar, table, dll).
- Komponen global:
  - `shared/components/metric-card.tsx`
  - `shared/components/sales-overview.tsx`
  - `shared/components/order-card.tsx`
  - `shared/components/data-table.tsx` (tabel reusable + pagination)

### lib/
Utility non-UI:
- `auth-storage.ts` — akses token/user localStorage
- `breadcrumbs.ts` — builder breadcrumbs
- `date-format.ts` — format tanggal header
- `name.ts` — getInitials
- `utils.ts` — cn (clsx + tailwind-merge) dan util lain
- `validation.ts` — validasi (mis. email)

### scripts/
- `scripts/create-feature.js` — generator folder `features/<nama>` (tidak membuat route di `app/`).

## 4) Routing & Halaman Penting
- `app/(auth)/login/page.tsx` — login page
- `app/(dashboard)/home/page.tsx` — dashboard home (metric + sales overview + transaction table + best seller section)
- `app/(dashboard)/pos/page.tsx` — POS (order queue, menu, order detail)

## 5) Pola Interaktivitas (Client vs Server Component)
Pada Next.js App Router:
- Komponen yang memakai state/handler harus `use client`.
- Event handler tidak boleh dipassing dari Server Component ke Client Component.

Karena itu, beberapa section dibuat sebagai Client Component untuk menghindari error “Event handlers cannot be passed…”.

## 6) Komponen Dashboard yang Menonjol
- Metric cards: `shared/components/metric-card.tsx`
- Sales overview: `shared/components/sales-overview.tsx`
- Best seller: `features/product-best-seller/components/ProductBestSellerSection.tsx`
- Transaction table: `shared/components/data-table.tsx` dipakai di `home/page.tsx`
  - Search & filtering dilakukan di parent, DataTable hanya menerima props.
  - Pagination opsional tersedia via prop `pagination`.

## 7) Catatan Teknis / Potensi Perbaikan
- Konsistensi penamaan: type item order sudah dirapikan ke `OrderItemType.ts` (nama lama masih ada jika diperlukan).
- Dokumentasi: README sudah ditambah catatan App Router terkait Client/Server Component.
- Kualitas: tersedia `npm run typecheck` untuk verifikasi TypeScript.
