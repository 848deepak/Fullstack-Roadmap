'use strict';

// Mini Project logic layer for a browser shopping cart.
// Beginner: pure functions return updated cart without mutating original.
// Advanced: immutable updates simplify UI state management and debugging.
function addItem(cart, product, quantity = 1) {
  if (!product || !product.id) throw new Error('Invalid product');
  if (!Number.isInteger(quantity) || quantity <= 0) throw new Error('Quantity must be positive integer');

  const existing = cart.find((item) => item.id === product.id);
  if (!existing) {
    return [...cart, { ...product, quantity }];
  }

  return cart.map((item) =>
    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
  );
}

function removeItem(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}

function calculateTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

const productA = { id: 'sku_1', name: 'Keyboard', price: 2500 };
const productB = { id: 'sku_2', name: 'Mouse', price: 1200 };

let cart = [];
cart = addItem(cart, productA, 1);
cart = addItem(cart, productB, 2);
cart = addItem(cart, productA, 1);
console.log('cart:', cart);
console.log('total:', calculateTotal(cart));
