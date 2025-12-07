# Bridge Komdigi

**Bridge Komdigi** adalah aplikasi manajemen kerja sama internasional yang dikembangkan untuk Kementerian Komunikasi dan Digital (Komdigi). Aplikasi ini memudahkan pengelolaan, pemantauan, dan pengarsipan dokumen perjanjian kerja sama (MoU/Perjanjian) antara Indonesia dan mitra global.

![Komdigi Logo](public/komdigi-logo.png)

![App Screenshot](public/app-screenshot.png)

## Fitur Utama

-   **Dashboard Publik**: Pencarian dan filter interaktif untuk melihat daftar kerja sama yang sedang berlangsung atau sudah disahkan.
-   **Manajemen Dokumen**: Upload dan unduh dokumen naskah perjanjian (PDF).
-   **Dashboard Admin**: Panel khusus untuk menambah, mengedit, dan menghapus data kerja sama.
-   **Autentikasi Aman**: Login admin terproteksi untuk menjaga integritas data.
-   **Visualisasi Data**: Statistik sederhana dan tampilan visual yang menarik menggunakan desain modern.

## Teknologi

Aplikasi ini dibangun menggunakan **T3 Stack** dan teknologi modern lainnya:

-   **Framework**: [Next.js](https://nextjs.org) (App Router)
-   **Bahasa**: [TypeScript](https://www.typescriptlang.org)
-   **Database ORM**: [Prisma](https://prisma.io)
-   **Database**: PostgreSQL
-   **Styling**: [Tailwind CSS](https://tailwindcss.com)
-   **Auth**: [NextAuth.js](https://next-auth.js.org) (v5 Beta)
-   **API**: [tRPC](https://trpc.io)

## Persyaratan Sistem

Sebelum memulai, pastikan Anda telah menginstal:

-   [Node.js](https://nodejs.org/) (Versi 18 atau lebih baru)
-   [PostgreSQL](https://www.postgresql.org/) (Database server)
-   [Git](https://git-scm.com/)

## Instalasi dan Pengaturan

Ikuti langkah-langkah berikut untuk menjalankan aplikasi di komputer lokal Anda:

### 1. Clone Repository

```bash
git clone <repository-url>
cd komdigi
```

### 2. Instal Dependencies

```bash
npm install
```

### 3. Konfigurasi Environment Variables

Buat file `.env` di root direktori proyek. Anda bisa menyalin dari contoh jika ada, atau buat baru dengan konfigurasi berikut:

```env
# Database connection string
# Ganti user, password, host, port, dan nama database sesuai konfigurasi PostgreSQL Anda local
DATABASE_URL="postgresql://postgres:password@localhost:5432/komdigi"

# Next Auth Configuration
# Anda bisa generate secret baru dengan command: openssl rand -base64 32
AUTH_SECRET="supersecretkey123"

# Base URL (Penting untuk NextAuth di production/local)
NEXTAUTH_URL="http://localhost:3000"

# Environment
NODE_ENV="development"
```

> **Catatan**: Jika Anda menggunakan Docker untuk database, pastikan port dan kredensial sesuai dengan container Anda.

### 4. Setup Database

Jalankan perintah berikut untuk membuat tabel di database dan mengisi data awal (seeding):

```bash
# Generate Prisma Client
npx prisma generate

# Push schema ke database (membuat tabel)
npx prisma db push

# (Opsional) Jika ingin menggunakan migrate untuk history
# npx prisma migrate dev --name init

# Isi database dengan data awal (Admin, Negara, Status, Mitra)
npx prisma db seed
```

### 5. Menjalankan Aplikasi

Jalankan server development:

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Penggunaan

### Login Admin

Untuk mengakses Dashboard Admin dan mengelola data:

1.  Klik tombol **Login** di pojok kanan atas atau akses `/login`.
2.  Gunakan kredensial default berikut (dari proses seeding):
    -   **Username**: `admin`
    -   **Password**: `admin123`
3.  Setelah login, Anda akan diarahkan ke Dashboard Admin.

### Mengelola Data

-   **Tambah Data**: Klik tombol "Tambah Baru" di Dashboard Admin. Isi formulir lengkap termasuk upload naskah (PDF).
-   **Edit Data**: Klik ikon pensil pada baris data yang ingin diubah.
-   **Hapus Data**: Klik ikon tempat sampah untuk menghapus.
-   **Lihat Detail**: Klik ikon panah atau judul untuk melihat halaman detail publik.

## Build untuk Production

Untuk men-deploy aplikasi ke lingkungan production:

```bash
# Build aplikasi
npm run build

# Jalankan server production
npm start
```

## Struktur Folder

-   `src/app`: Halaman-halaman aplikasi (Next.js App Router).
-   `src/server/api`: Backend logic menggunakan tRPC routers.
-   `src/server/db.ts`: Konfigurasi koneksi database Prisma.
-   `prisma/schema.prisma`: Definisi skema database.

---

Dibuat untuk **Magang Komdigi**.
