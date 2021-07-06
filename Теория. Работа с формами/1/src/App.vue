<template>
  <div id="app">
    <div class="conatiner">
      <product-list />
    </div>
  </div>
</template>

<script>
import ProductList from './components/ProductList'

export default {
  name: 'App',
  components: {
    ProductList
  }
}
</script>
