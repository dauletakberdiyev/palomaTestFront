<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const data = ref([]);
const error = ref();

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/order');
    data.value = response.data.data;
  }
  catch (err) {
    error.value = err;
    console.error('Error fetching data:', err);
  }
};

onMounted(() => {
  fetchData();
})
</script>

<template>
  <div class="orders row">
    <router-link :to="{name: 'places'}">Назад</router-link>
    <h2>Заказы</h2>
    <div v-for="order in data" class="border mb-2">
      <div class="d-flex justify-content-between">
        <div># {{order.id}} Стол: {{order.place.title}}</div>
        <div>Сумма: {{order.total_cost}}</div>
      </div>
      <ul class="list-group">
        <li class="list-group-item border-0" v-for="products in order.order_details">
          {{products.product.title}}
          x
          {{products.quantity}}
          =
          {{products.sum}}
        </li>
      </ul>
      <span>Статус:
        <span v-if="order.status === 0" class="text-danger">Не оплачено</span>
        <span v-else class="text-success">Оплачено</span>
      </span>
    </div>
  </div>
</template>

<style>
@media (min-width: 900px) {

}
</style>
