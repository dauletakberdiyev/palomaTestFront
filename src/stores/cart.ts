import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<Map<number, any>>(new Map());

  const getItem = (id: number) => {
    const item = cart.value.get(id);
    return item;
  };

  const getCart = () => {
    return cart;
  };

  const cartItems = computed(() => {
    return Array.from(cart.value, ([id, item]) => ({
      id,
      product: item.product,
      quantity: item.quantity
    }));
  });

  const getItemQuantity = (id: number) => {
    const item = cart.value.get(id);
    if (item) {
      return item.quantity;
    }else {
      return 0;
    }
  }

  function addToCart(product: any) {
    const item = cart.value.get(product.id);
    if (item){
      item.quantity++;
    }
    else {
      cart.value.set(product.id, {
        product: product,
        quantity: 1,
      });
    }
    console.log(cart.value)
  }

  function removeFromCart(product: any) {
    const item = cart.value.get(product.id);
    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cart.value.delete(product.id);
      }
    }
  }

  function resetCart() {
    cart.value = new Map(); // Reset the cart to an empty map
  }

  return { cart, resetCart, addToCart, getItem, getItemQuantity, removeFromCart, getCart, cartItems }
})
