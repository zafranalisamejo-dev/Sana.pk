// ===== PRODUCT DATA =====
let products = [
    {
        id: 1,
        name: "Wireless Bluetooth Earbuds",
        price: 2999,
        originalPrice: 5999,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400",
        description: "Premium wireless earbuds with noise cancellation and long battery life.",
        badge: "Hot"
    },
    {
        id: 2,
        name: "Smart Watch Pro",
        price: 4999,
        originalPrice: 8999,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1546868871-af0de0ae72e6?w=400",
        description: "Advanced smartwatch with health tracking, GPS, and notifications.",
        badge: "New"
    },
    {
        id: 3,
        name: "LED Desk Lamp",
        price: 1999,
        originalPrice: 3499,
        category: "home",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400",
        description: "Adjustable LED desk lamp with multiple brightness levels and USB charging.",
        badge: ""
    },
    {
        id: 4,
        name: "Premium Cotton T-Shirt",
        price: 1299,
        originalPrice: 2499,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
        description: "Soft, breathable cotton t-shirt available in multiple colors.",
        badge: "Sale"
    },
    {
        id: 5,
        name: "Portable Power Bank 20000mAh",
        price: 3499,
        originalPrice: 5499,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400",
        description: "High-capacity power bank with fast charging for all your devices.",
        badge: ""
    },
    {
        id: 6,
        name: "Leather Style Backpack",
        price: 3999,
        originalPrice: 6999,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
        description: "Stylish and durable backpack with laptop compartment and multiple pockets.",
        badge: "Popular"
    },
    {
        id: 7,
        name: "Aromatherapy Essential Oil Diffuser",
        price: 2499,
        originalPrice: 4499,
        category: "home",
        image: "https://images.unsplash.com/photo-1602928298849-325cec8771c0?w=400",
        description: "Ultrasonic diffuser with LED lights for a relaxing atmosphere.",
        badge: ""
    },
    {
        id: 8,
        name: "Stainless Steel Water Bottle",
        price: 1499,
        originalPrice: 2999,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
        description: "Double-wall insulated water bottle keeps drinks cold for 24 hours.",
        badge: "Eco"
    },
    {
        id: 9,
        name: "Bluetooth Speaker",
        price: 2499,
        originalPrice: 4499,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
        description: "Portable waterproof speaker with deep bass and 12-hour battery.",
        badge: ""
    },
    {
        id: 10,
        name: "Men's Casual Sneakers",
        price: 4499,
        originalPrice: 7999,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400",
        description: "Comfortable and stylish sneakers for everyday wear.",
        badge: "Trending"
    },
    {
        id: 11,
        name: "Scented Candle Set",
        price: 999,
        originalPrice: 1999,
        category: "home",
        image: "https://images.unsplash.com/photo-1603006905393-c2793b9c67f5?w=400",
        description: "Set of 3 natural soy wax candles with calming fragrances.",
        badge: ""
    },
    {
        id: 12,
        name: "Digital Watch",
        price: 1999,
        originalPrice: 3999,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400",
        description: "Classic digital watch with LED display, stopwatch, and alarm.",
        badge: ""
    }
];

// ===== CART STATE =====
let cart = JSON.parse(localStorage.getItem('sanaCart')) || [];
let currentFilter = 'all';
let currentSearch = '';

// ===== RENDER PRODUCTS =====
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    let filtered = products;

    // Apply filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(p => p.category === currentFilter);
    }

    // Apply search
    if (currentSearch.trim()) {
        const searchTerm = currentSearch.toLowerCase().trim();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
        );
    }

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="no-products" style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #999;">
                <i class="fas fa-search" style="font-size: 48px; margin-bottom: 15px; display: block;"></i>
                <h3 style="font-size: 20px; color: #555; margin-bottom: 8px;">No products found</h3>
                <p>Try adjusting your search or filter</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(product => `
        <div class="product-card" data-category="${product.category}">
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x300?text=${encodeURIComponent(product.name)}'">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-title">${product.name}</div>
                <div class="product-price">
                    PKR ${product.price.toLocaleString()}
                    <span class="original-price">PKR ${product.originalPrice.toLocaleString()}</span>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// ===== FILTER PRODUCTS =====
function filterProducts(category) {
    currentFilter = category;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase() === category || 
            (category === 'all' && btn.textContent === 'All'));
    });
    renderProducts();
}

// ===== SEARCH PRODUCTS =====
function searchProducts() {
    const input1 = document.getElementById('searchInput');
    const input2 = document.getElementById('mobileSearchInput');
    currentSearch = input1.value || input2.value || '';

    // Sync both search inputs
    if (input1.value !== currentSearch) input1.value = currentSearch;
    if (input2.value !== currentSearch) input2.value = currentSearch;

    renderProducts();
}

// ===== CART FUNCTIONS =====
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartUI();
    showToast(`${product.name} added to cart!`, 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    showToast('Item removed from cart', 'info');
}

function updateQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    saveCart();
    updateCartUI();
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getCartCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function saveCart() {
    localStorage.setItem('sanaCart', JSON.stringify(cart));
}

function updateCartUI() {
    // Update badge
    const badge = document.getElementById('cartBadge');
    badge.textContent = getCartCount();

    // Render cart items
    const cartItems = document.getElementById('cartItems');
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-bag"></i>
                <p>Your cart is empty</p>
                <p style="font-size: 13px; color: #bbb;">Add some products to get started!</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://via.placeholder.com/80?text=${encodeURIComponent(item.name)}'">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">PKR ${(item.price * item.quantity).toLocaleString()}</div>
                    <div class="cart-item-actions">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <span class="remove-item" onclick="removeFromCart(${item.id})">Remove</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Update total
    document.getElementById('cartTotal').textContent = `PKR ${getCartTotal().toLocaleString()}`;
}

// ===== CART UI =====
function openCart() {
    document.getElementById('cartOverlay').classList.add('open');
    document.getElementById('cartSidebar').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    document.getElementById('cartOverlay').classList.remove('open');
    document.getElementById('cartSidebar').classList.remove('open');
    document.body.style.overflow = '';
}

// ===== CHECKOUT =====
function openCheckout() {
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }
    closeCart();
    document.getElementById('checkoutOverlay').classList.add('open');
    document.getElementById('checkoutModal').classList.add('open');
    document.body.style.overflow = 'hidden';

    // Render order summary
    const summary = document.getElementById('checkoutSummary');
    summary.innerHTML = `
        <h4>Order Summary</h4>
        ${cart.map(item => `
            <div class="order-summary-item">
                <span>${item.name} × ${item.quantity}</span>
                <span>PKR ${(item.price * item.quantity).toLocaleString()}</span>
            </div>
        `).join('')}
        <div class="order-summary-total">
            <span>Total</span>
            <span>PKR ${getCartTotal().toLocaleString()}</span>
        </div>
    `;
}

function closeCheckout() {
    document.getElementById('checkoutOverlay').classList.remove('open');
    document.getElementById('checkoutModal').classList.remove('open');
    document.body.style.overflow = '';
}

function handleCheckout(e) {
    e.preventDefault();

    const orderData = {
        name: document.getElementById('checkoutName').value,
        phone: document.getElementById('checkoutPhone').value,
        email: document.getElementById('checkoutEmail').value,
        address: document.getElementById('checkoutAddress').value,
        city: document.getElementById('checkoutCity').value,
        payment: document.getElementById('checkoutPayment').value,
        items: [...cart],
        total: getCartTotal(),
        date: new Date().toISOString(),
        orderId: 'ORD-' + Date.now().toString(36).toUpperCase()
    };

    // Save order history
    const orders = JSON.parse(localStorage.getItem('sanaOrders')) || [];
    orders.push(orderData);
    localStorage.setItem('sanaOrders', JSON.stringify(orders));

    // Clear cart
    cart = [];
    saveCart();
    updateCartUI();
    closeCheckout();

    showToast(`Order Placed Successfully! Order ID: ${orderData.orderId}`, 'success');

    // Reset form
    document.getElementById('checkoutForm').reset();

    // Send order via WhatsApp (optional)
    const message = `🛍️ *New Order - Sana.pk*\n\nOrder ID: ${orderData.orderId}\nName: ${orderData.name}\nPhone: ${orderData.phone}\nAddress: ${orderData.address}, ${orderData.city}\nPayment: ${orderData.payment.toUpperCase()}\n\nItems:\n${cart.map(i => `- ${i.name} × ${i.quantity} = PKR ${(i.price * i.quantity).toLocaleString()}`).join('\n')}\n\nTotal: PKR ${orderData.total.toLocaleString()}`;
    window.open(`https://wa.me/923449254538?text=${encodeURIComponent(message)}`, '_blank');
}

// ===== CONTACT FORM =====
function handleContact(e) {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const message = e.target[2].value;

    const text = `📬 *Contact Message - Sana.pk*\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
    window.open(`https://wa.me/923449254538?text=${encodeURIComponent(text)}`, '_blank');
    showToast('Message sent! We\'ll get back to you soon.', 'success');
    e.target.reset();
}

// ===== ADMIN PANEL =====
const ADMIN_PASSWORD = 'sana55.pk.sana';

function openAdmin() {
    const password = prompt('Enter admin password to access the panel:');
    if (password !== ADMIN_PASSWORD) {
        showToast('Incorrect password! Access denied.', 'error');
        return;
    }
    document.getElementById('adminOverlay').classList.add('open');
    document.getElementById('adminModal').classList.add('open');
    document.body.style.overflow = 'hidden';
    renderAdminProducts();
}

function closeAdmin() {
    document.getElementById('adminOverlay').classList.remove('open');
    document.getElementById('adminModal').classList.remove('open');
    document.body.style.overflow = '';
}

function addAdminProduct() {
    const name = document.getElementById('adminName').value.trim();
    const price = parseInt(document.getElementById('adminPrice').value);
    const category = document.getElementById('adminCategory').value;
    const image = document.getElementById('adminImage').value.trim();
    const desc = document.getElementById('adminDesc').value.trim();

    if (!name || !price || !image) {
        showToast('Please fill in name, price, and image URL', 'error');
        return;
    }

    const newProduct = {
        id: Date.now(),
        name,
        price,
        originalPrice: Math.round(price * 1.8),
        category,
        image,
        description: desc || 'Great quality product from Sana.pk',
        badge: 'New'
    };

    products.push(newProduct);
    renderProducts();
    renderAdminProducts();
    showToast('Product added successfully!', 'success');

    // Clear form
    document.getElementById('adminName').value = '';
    document.getElementById('adminPrice').value = '';
    document.getElementById('adminImage').value = '';
    document.getElementById('adminDesc').value = '';
}

function deleteProduct(productId) {
    if (!confirm('Delete this product?')) return;
    products = products.filter(p => p.id !== productId);
    renderProducts();
    renderAdminProducts();
    showToast('Product deleted', 'info');
}

function renderAdminProducts() {
    const list = document.getElementById('adminProductList');
    if (products.length === 0) {
        list.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">No products yet. Add your first product above!</p>';
        return;
    }
    list.innerHTML = products.map(p => `
        <div class="admin-product-item" onclick="deleteProduct(${p.id})" title="Click to delete">
            <span>${p.name} <span style="color: #e74c3c; font-weight: 600;">PKR ${p.price.toLocaleString()}</span></span>
            <i class="fas fa-trash-alt" style="color: #e74c3c;"></i>
        </div>
    `).join('');
}

// ===== MOBILE MENU =====
function toggleMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
}

// ===== TOAST =====
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast ' + type;
    
    // Force reflow
    void toast.offsetWidth;
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== CLOSE MODALS ON ESC =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCart();
        closeCheckout();
        closeAdmin();
    }
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
});

