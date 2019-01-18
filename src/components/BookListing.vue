<template>
  <div class="booklisting">
    <h1>Listing</h1>
    <router-link class="btn btn-primary backbtn" to="/">
      <i class="material-icons">
        arrow_back
      </i>
      Back
    </router-link>
    <div class="list-group">
      <router-link v-for="book in books"
      :to="{ name: 'chapters', params: { bk: book.id }}"
      class="list-group-item list-group-item-action">
        <span v-html="book.name"></span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookListing',
  computed: {
    books() {
      return this.$store.state.data.unit;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.material-icons {
  font-size: 1rem;
}

.backbtn {
  margin-bottom: 1rem;
}
</style>
