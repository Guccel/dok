<template>
  <div class="product-item">
    <img src="../../public/no-image.svg" alt="" />
    <h3 class="name">{{ name }}</h3>
    <p class="price">${{ price }}</p>
    <p class="rating">{{ rating }}</p>
  </div>
</template>

<script>
export default {
  name: 'ProductItems',
  components: {},
  props: {
    name: String,
    price: Number,
    rating: Number,
  },
};
</script>

<style lang="scss" scoped="true">
.product-item {
  display: grid;
  width: 100%;

  grid-template-areas: 'image image' 'name rating' 'price meta';
  grid-template-rows: auto;

  background-color: pink;
  border-radius: 0.25rem;
  img {
    grid-area: image;
    background-color: white;
    margin: 1rem;
    margin-bottom: 0rem;
    width: calc(100% - 2rem);
  }
  .name {
    padding-left: 1rem;
    grid-area: name;
    text-align: left;
  }
  .price {
    padding-left: 1rem;
    position: relative;
    grid-area: price;
    text-align: left;
  }
  .rating {
    grid-area: rating;
    text-align: right;
  }
}
</style>
