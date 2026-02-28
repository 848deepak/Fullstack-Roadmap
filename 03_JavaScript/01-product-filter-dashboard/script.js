// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 299,
        rating: 4.5,
        description: "Premium noise-cancelling headphones with 30-hour battery life",
        icon: "🎧"
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 399,
        rating: 4.8,
        description: "Fitness tracking, heart rate monitor, and notifications",
        icon: "⌚"
    },
    {
        id: 3,
        name: "Cotton T-Shirt",
        category: "clothing",
        price: 29,
        rating: 4.2,
        description: "100% organic cotton, comfortable fit, multiple colors",
        icon: "👕"
    },
    {
        id: 4,
        name: "Running Shoes",
        category: "sports",
        price: 129,
        rating: 4.6,
        description: "Lightweight, breathable, perfect for marathon training",
        icon: "👟"
    },
    {
        id: 5,
        name: "JavaScript Guide",
        category: "books",
        price: 45,
        rating: 4.9,
        description: "Comprehensive guide to modern JavaScript development",
        icon: "📚"
    },
    {
        id: 6,
        name: "Coffee Maker",
        category: "home",
        price: 89,
        rating: 4.4,
        description: "Programmable 12-cup coffee maker with thermal carafe",
        icon: "☕"
    },
    {
        id: 7,
        name: "Laptop Stand",
        category: "electronics",
        price: 49,
        rating: 4.3,
        description: "Ergonomic aluminum stand for laptops up to 17 inches",
        icon: "💻"
    },
    {
        id: 8,
        name: "Yoga Mat",
        category: "sports",
        price: 35,
        rating: 4.7,
        description: "Non-slip, eco-friendly, extra thick for comfort",
        icon: "🧘"
    },
    {
        id: 9,
        name: "Winter Jacket",
        category: "clothing",
        price: 179,
        rating: 4.5,
        description: "Waterproof, insulated, perfect for cold weather",
        icon: "🧥"
    },
    {
        id: 10,
        name: "Cooking Set",
        category: "home",
        price: 149,
        rating: 4.6,
        description: "10-piece non-stick cookware set with glass lids",
        icon: "🍳"
    },
    {
        id: 11,
        name: "Python Programming",
        category: "books",
        price: 52,
        rating: 4.8,
        description: "Learn Python from beginner to advanced level",
        icon: "📖"
    },
    {
        id: 12,
        name: "Bluetooth Speaker",
        category: "electronics",
        price: 79,
        rating: 4.4,
        description: "Portable, waterproof, 12-hour battery life",
        icon: "🔊"
    },
    {
        id: 13,
        name: "Denim Jeans",
        category: "clothing",
        price: 69,
        rating: 4.3,
        description: "Classic fit, premium denim, various sizes",
        icon: "👖"
    },
    {
        id: 14,
        name: "Tennis Racket",
        category: "sports",
        price: 159,
        rating: 4.7,
        description: "Professional-grade, lightweight carbon fiber",
        icon: "🎾"
    },
    {
        id: 15,
        name: "Blender",
        category: "home",
        price: 99,
        rating: 4.5,
        description: "High-powered blender for smoothies and soups",
        icon: "🥤"
    }
];

let filteredProducts = [...products];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const sortSelect = document.getElementById('sortBy');
const categorySelect = document.getElementById('categoryFilter');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const resetBtn = document.getElementById('resetBtn');
const productCount = document.getElementById('productCount');
const searchInput = document.getElementById('searchInput');
const viewBtns = document.querySelectorAll('.view-btn');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const totalAmount = document.getElementById('totalAmount');
const cartCount = document.querySelector('.cart-count');
const checkoutBtn = document.getElementById('checkoutBtn');
const clearCartBtn = document.getElementById('clearCartBtn');

let currentView = 'grid';
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize
function init() {
    renderProducts(products);
    attachEventListeners();
    updateProductCount();
    updateCartUI();
}

// Attach event listeners
function attachEventListeners() {
    sortSelect.addEventListener('change', applyFilters);
    categorySelect.addEventListener('change', applyFilters);
    priceRange.addEventListener('input', (e) => {
        priceValue.textContent = `$${e.target.value}`;
        applyFilters();
    });
    resetBtn.addEventListener('click', resetFilters);
    
    // Search with debounce
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            applyFilters();
        }, 300);
    });
    
    // View toggle
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentView = btn.dataset.view;
            productGrid.className = currentView === 'grid' ? 'product-grid' : 'product-grid list-view';
        });
    });
    
    // Add to cart delegation
    productGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-to-cart-btn');
        if (btn) {
            const productId = parseInt(btn.dataset.id);
            addToCart(productId);
        }
    });
    
    // Cart toggle
    cartBtn.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);
    
    // Checkout
    checkoutBtn.addEventListener('click', handleCheckout);
    
    // Clear cart
    clearCartBtn.addEventListener('click', handleClearCart);
}

// Apply all filters and sorting
function applyFilters() {
    // Start with all products
    filteredProducts = [...products];
    
    // Apply search filter
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }

    // Apply category filter
    const selectedCategory = categorySelect.value;
    if (selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === selectedCategory
        );
    }

    // Apply price filter
    const maxPrice = parseInt(priceRange.value);
    filteredProducts = filteredProducts.filter(product => 
        product.price <= maxPrice
    );

    // Apply sorting
    const sortBy = sortSelect.value;
    switch(sortBy) {
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating-asc':
            filteredProducts.sort((a, b) => a.rating - b.rating);
            break;
        case 'rating-desc':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            // Default order (by id)
            filteredProducts.sort((a, b) => a.id - b.id);
    }

    renderProducts(filteredProducts);
    updateProductCount();
}

// Render products to the grid
function renderProducts(productsToRender) {
    productGrid.innerHTML = '';

    if (productsToRender.length === 0) {
        productGrid.innerHTML = '<div class="no-products">No products found matching your criteria</div>';
        return;
    }

    productsToRender.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Create a product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-image">${product.icon}</div>
        <div class="product-info">
            <span class="product-category">${product.category}</span>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-details">
                <span class="product-price">$${product.price}</span>
                <span class="product-rating">
                    ⭐ ${product.rating}
                </span>
            </div>
            <button class="add-to-cart-btn" data-id="${product.id}">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span>Add to Cart</span>
            </button>
        </div>
    `;
    
    return card;
}

// Update product count display
function updateProductCount() {
    const count = filteredProducts.length;
    const total = products.length;
    
    if (count === total) {
        productCount.textContent = `Showing all ${total} products`;
    } else {
        productCount.textContent = `Showing ${count} of ${total} products`;
    }
}

// Reset all filters
function resetFilters() {
    sortSelect.value = 'default';
    categorySelect.value = 'all';
    priceRange.value = '1000';
    priceValue.textContent = '$1000';
    searchInput.value = '';
    
    filteredProducts = [...products];
    renderProducts(filteredProducts);
    updateProductCount();
}

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    updateCartUI();
    showNotification(`${product.name} added to cart!`);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        updateCartUI();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        totalAmount.textContent = '$0';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-icon">${item.icon}</div>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="cart-item-price">$${item.price}</p>
            </div>
            <div class="cart-item-controls">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
                <span class="qty-display">${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </button>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            </button>
        </div>
    `).join('');
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalAmount.textContent = `$${total}`;
}

// Open cart
function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close cart
function closeCartSidebar() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Handle checkout
function handleCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    showNotification(`Checkout successful! Total: $${total} for ${itemCount} items`);
    
    // Clear cart after checkout
    cart = [];
    saveCart();
    updateCartUI();
    
    setTimeout(() => {
        closeCartSidebar();
    }, 1500);
}

// Clear cart
function handleClearCart() {
    if (cart.length === 0) return;
    
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        saveCart();
        updateCartUI();
        showNotification('Cart cleared!');
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
