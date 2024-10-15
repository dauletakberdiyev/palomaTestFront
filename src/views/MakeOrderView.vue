<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import {useCartStore} from "@/stores/cart";

const data = ref([]);
const error = ref();

const cartStore = useCartStore();

const route = useRoute();
const place_id = route.params.place_id;

const router = useRouter();
const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/category');
    data.value = response.data.data;
  }
  catch (err) {
    error.value = err;
    console.error('Error fetching data:', err);
  }
};

const saveOder = async () => {
  try {
    let products = [];

    cartStore.cartItems.forEach((item: any) => {
      products.push({
        product_id: item.id,
        quantity: item.quantity,
      });
    })

    const order = {
      place_id: parseInt(place_id),
      products: products
    }

    cartStore.resetCart();

    const response = await axios.post('http://localhost:8000/api/order', order);
    if (response.status === 200) {
      router.push({name: 'places'});
    }
  }
  catch (err) {
    error.value = err;
    console.error('Error saving data:', err);
  }
}

onMounted(() => {
  fetchData();
})
</script>

<template>
  <div class="make-order row">
    <router-link :to="{name: 'places'}">Назад</router-link>
    <div class="col-12 mb-4" v-for="category in data">
      <span class="text-uppercase fw-bold">{{category.title}}</span>
      <hr>
      <ul class="list-group">
        <li class="list-group-item border-0 d-flex justify-content-between" v-for="product in category.products" :data-product-id="product.id">
          {{product.title}}
          <div>
            <button class="border-0 bg-body" @click="cartStore.removeFromCart(product)">-</button>
            <span>{{cartStore.getItemQuantity(product.id)}}</span>
            <button class="border-0 bg-body" @click="cartStore.addToCart(product)">+</button>
          </div>
        </li>
      </ul>
    </div>
    <button type="button" class="btn btn-primary" @click="saveOder">Сделать заказ</button>
  </div>
</template>

<style>
@media (min-width: 900px) {

}
</style>
