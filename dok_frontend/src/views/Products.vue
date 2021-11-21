<template>
  <div id="app">
    <div class="notification" v-for="(product, i) in products" :key="product._id">
      <p>
        <span class="tag is-primary">{{i + 1}}</span>
        {{product.name}} {{"$" + product.price}}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "product-s",
  data(){
    return{
      products:[],
    }
  },

  async mounted(){
    const res = await axios.get('http://localhost:3000/products')
    console.log(res.data.products)
    this.products = res.data.products;
  }
}
</script>

<style scoped>
#app{
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}
</style>