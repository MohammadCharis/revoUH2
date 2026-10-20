# 🍉 FruitShop — Dokumentasi Proyek

> Dokumen ini dibuat **sebelum coding** sebagai bagian dari perencanaan proyek.
> Ini yang biasa dilakukan software engineer sebelum menulis satu baris kode pun.

---

## 1. 📋 Requirement Gathering (Apa yang mau dibangun?)

### Tujuan
Membangun website toko buah sederhana yang bisa diakses di browser tanpa backend.

### User Stories
- Sebagai pengunjung, saya ingin **melihat daftar produk buah** beserta harga dan deskripsinya.
- Sebagai pengunjung, saya ingin **mencari buah** berdasarkan nama.
- Sebagai pengunjung, saya ingin **menambahkan buah ke keranjang** dan melihat total harga.
- Sebagai pengunjung, saya ingin **menghapus item dari keranjang**.
- Sebagai pengunjung, saya ingin **melakukan checkout**.
- Sebagai pengunjung, saya ingin **mengirim pesan kontak** ke toko.
- Sebagai pengunjung mobile, saya ingin **navigasi yang nyaman** di layar kecil.

### Fitur yang Dibutuhkan
| Fitur             | Prioritas | Keterangan                        |
|-------------------|-----------|-----------------------------------|
| Daftar produk     | Tinggi    | Grid card dengan emoji, nama, harga |
| Search produk     | Tinggi    | Filter real-time saat mengetik    |
| Keranjang belanja | Tinggi    | Tambah, hapus, hitung total       |
| Checkout          | Sedang    | Reset keranjang + notifikasi      |
| Form kontak       | Sedang    | Validasi input + pesan sukses     |
| Responsive mobile | Tinggi    | Hamburger menu + grid fleksibel   |
| Kalkulator        | Rendah    | Halaman terpisah, fitur lengkap   |

---

## 2. 🏗️ Arsitektur & Teknologi

### Tech Stack
| Layer      | Teknologi            | Alasan                                      |
|------------|----------------------|---------------------------------------------|
| Markup     | HTML5 (semantik)     | Struktur yang benar, aksesibel, SEO-friendly |
| Styling    | Tailwind CSS v4 CDN  | Utility-first, cepat, tidak perlu build step |
| Logic      | Vanilla JavaScript   | Cukup untuk skala proyek ini, no dependency  |
| Data       | Array statis di JS   | Tidak butuh database untuk proyek ini        |

### Keputusan Arsitektur
- **Tidak pakai framework** (React/Vue) — skala proyek kecil, vanilla JS cukup
- **Tidak pakai backend** — data produk disimpan sebagai array di `script.js`
- **CDN Tailwind** — tidak perlu build tooling (webpack/vite)
- **JS terpisah dari HTML** — separation of concerns, lebih mudah di-maintain

---

## 3. 📁 Struktur Folder

```
revoUH2/
│
├── index.html        # Halaman utama (FruitShop)
├── script.js         # Semua logika JavaScript untuk index.html
├── calculator.html   # Halaman kalkulator (fitur terpisah)
├── table.html        # Contoh tabel HTML
├── form.html         # Contoh form HTML
├── style.css         # CSS custom (jika diperlukan di luar Tailwind)
└── README.md         # Dokumentasi proyek ini
```

---

## 4. 🎨 Desain Sistem (Wireframe Teks)

```
┌─────────────────────────────────────────────────┐
│  HEADER / NAV                                   │
│  🍉 FruitShop   [Beranda] [Produk] [Keranjang]  │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  HERO SECTION                                   │
│  "Buah Segar Setiap Hari 🍊"                    │
│  [Lihat Produk]                                 │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  PRODUK SECTION                                 │
│  [ 🔍 Cari buah... ]                            │
│                                                 │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐           │
│  │ 🥭   │ │ 🍊   │ │ 🍎   │ │ 🍉   │           │
│  │Mangga│ │Jeruk │ │ Apel │ │Semwk │           │
│  │15rb  │ │12rb  │ │20rb  │ │25rb  │           │
│  │[+ 🛒]│ │[+ 🛒]│ │[+ 🛒]│ │[+ 🛒]│           │
│  └──────┘ └──────┘ └──────┘ └──────┘           │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  KERANJANG SECTION                              │
│  🛒 Keranjang Belanja                           │
│  ┌──────────────────────────────────────────┐  │
│  │ 🥭 Mangga   Rp 15.000 × 2   Rp 30.000 ✕ │  │
│  │ 🍊 Jeruk    Rp 12.000 × 1   Rp 12.000 ✕ │  │
│  └──────────────────────────────────────────┘  │
│                          Total: Rp 42.000       │
│                          [Checkout]             │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  KONTAK SECTION                                 │
│  Nama:  [ _________________ ]                   │
│  Email: [ _________________ ]                   │
│  Pesan: [ _________________ ]                   │
│         [    Kirim Pesan    ]                   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  FOOTER                                         │
│  © 2026 FruitShop                               │
└─────────────────────────────────────────────────┘
```

---

## 5. 🔄 Alur Data (Data Flow)

```
products[] (array di script.js)
     │
     ▼
renderProducts(list)  ←──── filterProducts() ← input#searchInput
     │
     ▼
productGrid (DOM) → [artikel card] → tombol "+ Keranjang"
                                            │
                                            ▼
                                      addToCart(id)
                                            │
                                            ▼
                                       cart[] array
                                            │
                                            ▼
                                      updateCart()
                                            │
                                  ┌─────────┴─────────┐
                                  ▼                   ▼
                             cartList (DOM)     totalPrice (DOM)
                                            │
                                            ▼
                                       checkout()
                                            │
                                            ▼
                                    cart = [] → updateCart()
```

---

## 6. ✅ Definition of Done (Kapan dibilang selesai?)

- [ ] Semua user stories terpenuhi
- [ ] Tampilan responsive di mobile (min. 375px) dan desktop
- [ ] Tidak ada error di browser console
- [ ] Kode HTML menggunakan tag semantik yang tepat
- [ ] JS dipisahkan dari HTML
- [ ] Search berjalan real-time
- [ ] Keranjang bisa tambah, hapus, dan checkout
- [ ] Form kontak menampilkan pesan sukses setelah submit

---

## 7. 🚀 Cara Menjalankan

Tidak perlu install apapun. Cukup:

1. Buka folder `revoUH2/`
2. Double-click `index.html` — langsung terbuka di browser
3. Untuk kalkulator: buka `calculator.html`

> **Catatan:** Tailwind CSS dimuat via CDN, jadi butuh koneksi internet saat pertama kali membuka.

---

## 8. 🔮 Pengembangan ke Depan (Future Improvements)

| Ide                        | Keterangan                                      |
|----------------------------|-------------------------------------------------|
| ✅ Local Storage           | Keranjang tersimpan saat refresh                |
| ✅ Filter kategori         | Filter buah lokal 🇮🇩 vs impor ✈️              |
| ✅ Sort produk             | Urutkan A–Z, Z–A, harga naik/turun             |
| ✅ Quantity control di card| Tombol −/+ langsung di card & keranjang         |
| ✅ Badge keranjang navbar  | Counter jumlah item di navbar                   |
| Migrasi ke React/Vue       | Jika fitur makin kompleks                       |
| Backend + database         | Jika data produk perlu dikelola dinamis         |
| PWA (Progressive Web App)  | Bisa diinstall di HP seperti aplikasi native    |
