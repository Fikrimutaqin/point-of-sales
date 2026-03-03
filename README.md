This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Catatan Struktur Folder

- app/ — routing dan halaman (App Router Next.js).
- services/
  - http/ — klien HTTP berbasis fetch; satu pintu untuk GET/POST/PUT/DELETE.
  - usecases/ — logic bisnis per domain (misal: products) berisi operasi get/create/update/delete.
- components/
  - common/ — komponen global yang reusable lintas halaman (misal: Button).
  - local/ — komponen sekali pakai spesifik halaman/fitur (misal: SampleCard).
- hooks/ — React hooks reusable (misal: useDisclosure).
- utils/ — fungsi utilitas non-UI (misal: formatCurrency).
- types/ — definisi tipe global yang dipakai lintas modul (misal: Product).

### Prinsip Penempatan

- Logic bisnis tidak di dalam komponen; tempatkan di `services/usecases/<domain>`.
- Semua akses HTTP melalui `services/http` agar mudah diganti/mocking.
- Komponen reusable taruh di `components/common`; yang spesifik fitur taruh di `components/local`.
- Gunakan alias import `@/` sesuai `tsconfig.json` untuk path yang rapi.
