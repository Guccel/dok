<template>
  <div id="app">
    <div class="notification" v-for="(item, i) in items" :key="item._id">
        <p> 
          <span class="tag is-primary">{{i + 1}}</span>
          {{item}}
        </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

// This one works
//const res = axios.get('http://localhost:3000/products').then(this.products = res.data);

export default {
  name: "products-s",

  data() {
    return{
      products: []
    };
  },

  created(){
    // This dosent fucking work
    axios
      .get('http://localhost:3000/products')
      .then(res => this.products = res.data)
      .catch(error => {console.error(error)})
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