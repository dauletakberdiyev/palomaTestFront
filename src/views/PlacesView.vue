<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const data = ref([]);
const error = ref();

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/place');
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
  <div class="places row">
    <div class="col-6" v-for="place in data">
      <router-link class="d-flex place py-4 px-2 mb-2 border pointer text-dark" :to="{ name: 'make-order', params: { place_id: place.id }}">{{ place.title }}</router-link>
    </div>

    <router-link :to="{name:'orders'}">Заказы</router-link>
  </div>
</template>

<style>
@media (min-width: 900px) {

}
</style>
