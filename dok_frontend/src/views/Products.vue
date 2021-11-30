<template>
  <section id="products">
    <div v-for="product in products" :key="product._id">
      <Product :name="product.name" :price="product.price" :rating="product.rating" />
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import Product from '../components/ProductItem';

export default {
  name: 'product-s',
  components: {
    Product,
  },
  data() {
    return {
      products: [],
    };
  },

  async mounted() {
    const res = await axios.get('http://localhost:3000/products');
    console.log(res.data.products);
    this.products = res.data.products;
  },
};
</script>

<style scoped>
#products {
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: 1rem;
}
product {
  flex-grow: 1;
}
</style>
