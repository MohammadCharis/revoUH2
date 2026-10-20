// ============================================================
//  FruitShop — script.js
//  Fitur: render produk, search, filter kategori, sort,
//         keranjang (qty control), local storage, checkout,
//         form kontak, toast, mobile menu
// ============================================================

// ===== HELPER: render ulang semua Lucide icon di DOM =====
function refreshIcons() {
    if (window.lucide) lucide.createIcons();
}

// ===== DATA PRODUK =====
// emoji: ditampilkan di card produk & keranjang
const products = [
    { id: 1,  name: "Mangga",       emoji: "🥭", price: 15000, desc: "Manis dan segar",               kategori: "lokal" },
    { id: 2,  name: "Jeruk",        emoji: "🍊", price: 12000, desc: "Kaya vitamin C",                kategori: "lokal" },
    { id: 3,  name: "Apel",         emoji: "🍎", price: 20000, desc: "Renyah dan lezat",              kategori: "impor" },
    { id: 4,  name: "Semangka",     emoji: "🍉", price: 25000, desc: "Segar dan dingin",              kategori: "lokal" },
    { id: 5,  name: "Pisang",       emoji: "🍌", price: 8000,  desc: "Sumber energi",                 kategori: "lokal" },
    { id: 6,  name: "Anggur",       emoji: "🍇", price: 35000, desc: "Manis dan berair",              kategori: "impor" },
    { id: 7,  name: "Nanas",        emoji: "🍍", price: 18000, desc: "Asam menyegarkan",              kategori: "lokal" },
    { id: 8,  name: "Stroberi",     emoji: "🍓", price: 30000, desc: "Cantik dan lezat",              kategori: "impor" },
    { id: 9,  name: "Durian",       emoji: "🫛", price: 45000, desc: "Raja buah Nusantara",           kategori: "lokal" },
    { id: 10, name: "Pepaya",       emoji: "🧡", price: 10000, desc: "Baik untuk pencernaan",         kategori: "lokal" },
    { id: 11, name: "Melon",        emoji: "🍈", price: 22000, desc: "Lembut dan harum",              kategori: "lokal" },
    { id: 12, name: "Kiwi",         emoji: "🥝", price: 28000, desc: "Asam segar kaya serat",         kategori: "impor" },
    { id: 13, name: "Ceri",         emoji: "🍒", price: 40000, desc: "Kecil manis menggoda",          kategori: "impor" },
    { id: 14, name: "Pir",          emoji: "🍐", price: 18000, desc: "Renyah dan menyegarkan",        kategori: "impor" },
    { id: 15, name: "Kelapa",       emoji: "🥥", price: 12000, desc: "Air alami yang menyegarkan",    kategori: "lokal" },
    { id: 16, name: "Blueberry",    emoji: "🫐", price: 50000, desc: "Antioksidan tinggi",            kategori: "impor" },
    { id: 17, name: "Lemon",        emoji: "🍋", price: 14000, desc: "Segar untuk minuman",           kategori: "impor" },
    { id: 18, name: "Peach",        emoji: "🍑", price: 32000, desc: "Lembut dan harum",              kategori: "impor" },
    { id: 19, name: "Jambu Biji",   emoji: "🍏", price: 9000,  desc: "Kaya vitamin C lokal",          kategori: "lokal" },
    { id: 20, name: "Rambutan",     emoji: "🍅", price: 11000, desc: "Manis berambut khas tropis",    kategori: "lokal" },
    { id: 21, name: "Alpukat",      emoji: "🥑", price: 22000, desc: "Creamy dan bergizi tinggi",     kategori: "lokal" },
    { id: 22, name: "Kurma",        emoji: "🫘", price: 55000, desc: "Manis alami penuh energi",      kategori: "impor" },
    { id: 23, name: "Salak",        emoji: "🌰", price: 13000, desc: "Renyah khas Indonesia",         kategori: "lokal" },
    { id: 24, name: "Markisa",      emoji: "🟣", price: 17000, desc: "Asam segar untuk jus",          kategori: "lokal" },
    { id: 25, name: "Manggis",      emoji: "🍇", price: 28000, desc: "Ratu buah tropis",              kategori: "lokal" },
    { id: 26, name: "Sirsak",       emoji: "🍏", price: 20000, desc: "Lembut dan harum",              kategori: "lokal" },
    { id: 27, name: "Belimbing",    emoji: "⭐", price: 9000,  desc: "Asam segar berbentuk bintang",  kategori: "lokal" },
    { id: 28, name: "Jambu Air",    emoji: "🍎", price: 8000,  desc: "Renyah dan menyegarkan",        kategori: "lokal" },
    { id: 29, name: "Sawo",         emoji: "🟤", price: 10000, desc: "Manis legit khas tropis",       kategori: "lokal" },
    { id: 30, name: "Duku",         emoji: "🫒", price: 16000, desc: "Manis asam khas Sumatera",      kategori: "lokal" },
    { id: 31, name: "Langsat",      emoji: "🍋", price: 14000, desc: "Segar dan sedikit asam",        kategori: "lokal" },
    { id: 32, name: "Pomelo",       emoji: "🍊", price: 30000, desc: "Jeruk besar menyegarkan",       kategori: "impor" },
    { id: 33, name: "Dragon Fruit", emoji: "🌸", price: 25000, desc: "Cantik dan kaya antioksidan",   kategori: "lokal" },
    { id: 34, name: "Lychee",       emoji: "🍒", price: 35000, desc: "Manis berair khas Asia",        kategori: "lokal" },
    { id: 35, name: "Tin",          emoji: "🟣", price: 60000, desc: "Buah surga kaya manfaat",       kategori: "impor" },
];

// ===== STATE =====
let cart = loadCartFromStorage();

// ============================================================
//  LOCAL STORAGE
// ============================================================
function saveCartToStorage() {
    localStorage.setItem("fruitshop_cart", JSON.stringify(cart));
}

function loadCartFromStorage() {
    try {
        return JSON.parse(localStorage.getItem("fruitshop_cart")) || [];
    } catch {
        return [];
    }
}

// ============================================================
//  FILTER + SORT + SEARCH
// ============================================================
function applyFilters() {
    const keyword  = document.getElementById("searchInput").value.toLowerCase().trim();
    const kategori = document.getElementById("categoryFilter").value;
    const sort     = document.getElementById("sortOrder").value;

    let list = [...products];

    if (kategori !== "semua") list = list.filter(p => p.kategori === kategori);
    if (keyword) list = list.filter(p => p.name.toLowerCase().includes(keyword));

    switch (sort) {
        case "nama-az":    list.sort((a, b) => a.name.localeCompare(b.name)); break;
        case "nama-za":    list.sort((a, b) => b.name.localeCompare(a.name)); break;
        case "harga-asc":  list.sort((a, b) => a.price - b.price);            break;
        case "harga-desc": list.sort((a, b) => b.price - a.price);            break;
    }

    renderProducts(list);
}

// ============================================================
//  RENDER PRODUK — clean modern card
// ============================================================
function renderProducts(list) {
    const grid     = document.getElementById("productGrid");
    const noResult = document.getElementById("noResult");
    grid.innerHTML = "";

    if (list.length === 0) {
        noResult.classList.remove("hidden");
        refreshIcons();
        return;
    }
    noResult.classList.add("hidden");

    list.forEach(p => {
        const inCart     = cart.find(c => c.id === p.id);
        const qty        = inCart ? inCart.qty : 0;
        const badgeLabel = p.kategori === "lokal" ? "Lokal" : "Impor";
        const badgeColor = p.kategori === "lokal"
            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
            : "bg-violet-50 text-violet-700 border-violet-200";

        const card = document.createElement("article");
        card.id        = `card-${p.id}`;
        card.className = "fruit-card bg-white rounded-2xl border border-slate-100 p-4 flex flex-col items-center text-center cursor-default";
        card.setAttribute("aria-label", p.name);
        card.innerHTML = `
            <div class="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-3 text-4xl">
                ${p.emoji}
            </div>
            <span class="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border mb-2 ${badgeColor}">
                ${badgeLabel}
            </span>
            <h3 class="text-sm font-bold text-slate-800 leading-tight">${p.name}</h3>
            <p class="text-[11px] text-slate-400 mt-0.5 mb-3 leading-snug">${p.desc}</p>
            <p class="text-emerald-600 font-bold text-sm mb-3">Rp ${p.price.toLocaleString("id-ID")}</p>
            ${buildQtyControl(p.id, qty)}
        `;
        grid.appendChild(card);
    });

    refreshIcons();
}

// ============================================================
//  HELPER: bangun HTML tombol qty / tambah keranjang
// ============================================================
function buildQtyControl(id, qty) {
    if (qty === 0) {
        return `
            <button onclick="addToCart(${id})"
                aria-label="Tambah ke keranjang"
                class="inline-flex items-center justify-center gap-1 bg-blue-500 text-white px-5 py-2 rounded-full text-sm hover:bg-blue-600 transition w-full">
                <i data-lucide="plus" class="w-4 h-4"></i> Keranjang
            </button>`;
    }
    return `
        <div class="flex items-center justify-between w-full gap-2">
            <button onclick="decreaseQty(${id})" aria-label="Kurangi"
                class="bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 w-9 h-9 rounded-full flex items-center justify-center transition">
                <i data-lucide="minus" class="w-4 h-4"></i>
            </button>
            <span class="font-bold text-blue-600 text-lg" id="qty-${id}">${qty}</span>
            <button onclick="increaseQty(${id})" aria-label="Tambah"
                class="bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 w-9 h-9 rounded-full flex items-center justify-center transition">
                <i data-lucide="plus" class="w-4 h-4"></i>
            </button>
        </div>`;
}

// ============================================================
//  KERANJANG — qty control
// ============================================================
function addToCart(id) {
    const product  = products.find(p => p.id === id);
    const existing = cart.find(c => c.id === id);
    existing ? existing.qty += 1 : cart.push({ ...product, qty: 1 });
    saveCartToStorage();
    updateCart();
    refreshCard(id);
    showToast(`${product.name} ditambahkan ke keranjang`, "shopping-cart");
}

function increaseQty(id) {
    const item = cart.find(c => c.id === id);
    if (item) { item.qty += 1; saveCartToStorage(); updateCart(); refreshCard(id); }
}

function decreaseQty(id) {
    const item = cart.find(c => c.id === id);
    if (!item) return;
    item.qty -= 1;
    if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
    saveCartToStorage();
    updateCart();
    refreshCard(id);
}

function removeFromCart(id) {
    cart = cart.filter(c => c.id !== id);
    saveCartToStorage();
    updateCart();
    refreshCard(id);
}

// Re-render hanya bagian tombol pada satu card
function refreshCard(id) {
    const card = document.getElementById(`card-${id}`);
    if (!card) return;
    const inCart = cart.find(c => c.id === id);
    const qty    = inCart ? inCart.qty : 0;

    // Cari elemen tombol / qty wrapper di dalam card (selalu elemen terakhir)
    const last = card.lastElementChild;
    if (last) last.outerHTML = buildQtyControl(id, qty);
    refreshIcons();
}

// ============================================================
//  RENDER KERANJANG SECTION
// ============================================================
function updateCart() {
    const cartList   = document.getElementById("cartList");
    const cartEmpty  = document.getElementById("cartEmpty");
    const cartTotal  = document.getElementById("cartTotal");
    const totalPrice = document.getElementById("totalPrice");
    const cartBadge  = document.getElementById("cartBadge");

    cartList.innerHTML = "";

    const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
    if (cartBadge) {
        cartBadge.textContent = totalItems;
        cartBadge.classList.toggle("hidden", totalItems === 0);
    }

    if (cart.length === 0) {
        cartList.classList.add("hidden");
        cartEmpty.classList.remove("hidden");
        cartTotal.classList.add("hidden");
        refreshIcons();
        return;
    }

    cartEmpty.classList.add("hidden");
    cartList.classList.remove("hidden");
    cartTotal.classList.remove("hidden");

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        const li = document.createElement("li");
        li.className = "bg-white rounded-xl shadow px-5 py-4 flex justify-between items-center";
        li.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="text-3xl flex-shrink-0" role="img" aria-label="${item.name}">${item.emoji}</span>
                <div>
                    <p class="font-semibold text-gray-800">${item.name}</p>
                    <p class="text-sm text-gray-500">Rp ${item.price.toLocaleString("id-ID")} / pcs</p>
                    <div class="flex items-center gap-2 mt-1">
                        <button onclick="decreaseQty(${item.id})" aria-label="Kurangi"
                            class="bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 w-7 h-7 rounded-full flex items-center justify-center transition">
                            <i data-lucide="minus" class="w-3 h-3"></i>
                        </button>
                        <span class="font-semibold text-gray-700 min-w-4 text-center">${item.qty}</span>
                        <button onclick="increaseQty(${item.id})" aria-label="Tambah"
                            class="bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 w-7 h-7 rounded-full flex items-center justify-center transition">
                            <i data-lucide="plus" class="w-3 h-3"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex flex-col items-end gap-2">
                <p class="font-bold text-blue-600">Rp ${(item.price * item.qty).toLocaleString("id-ID")}</p>
                <button onclick="removeFromCart(${item.id})" aria-label="Hapus ${item.name}"
                    class="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition">
                    <i data-lucide="trash-2" class="w-3 h-3"></i> Hapus
                </button>
            </div>
        `;
        cartList.appendChild(li);
    });

    totalPrice.textContent = `Rp ${total.toLocaleString("id-ID")}`;
    refreshIcons();
}

function checkout() {
    if (cart.length === 0) return;
    cart = [];
    saveCartToStorage();
    updateCart();
    applyFilters();
    showToast("Checkout berhasil! Terima kasih.", "check-circle");
}

// ============================================================
//  FORM KONTAK
// ============================================================
function submitForm(e) {
    e.preventDefault();
    const msg = document.getElementById("formMsg");
    msg.classList.remove("hidden");
    document.getElementById("contactForm").reset();
    refreshIcons();
    setTimeout(() => msg.classList.add("hidden"), 3000);
}

// ============================================================
//  TOAST — dengan icon Lucide
// ============================================================
function showToast(message, iconName = "info") {
    const toast = document.getElementById("toast");
    toast.innerHTML = `<i data-lucide="${iconName}" class="w-4 h-4 flex-shrink-0"></i> ${message}`;
    toast.classList.remove("hidden");
    refreshIcons();
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.add("hidden"), 2500);
}

// ============================================================
//  MOBILE MENU
// ============================================================
document.getElementById("menuBtn").addEventListener("click", () => {
    const menu   = document.getElementById("mobileMenu");
    const btn    = document.getElementById("menuBtn");
    const isOpen = !menu.classList.contains("hidden");
    menu.classList.toggle("hidden");
    btn.setAttribute("aria-expanded", String(!isOpen));
});

// ============================================================
//  INIT
// ============================================================
applyFilters();
updateCart();
