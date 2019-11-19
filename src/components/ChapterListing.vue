<template>
  <div class="chapterlisting">
    <h1 class="text-primary">{{ book.name }}</h1>
    <router-link class="btn btn-primary backbtn" to="/read">
      <i class="material-icons">
        arrow_back
      </i>
      Back
    </router-link>
    <div class="list-group">
      <div v-for="chapter in book.contents" :key="chapter.id">
        <router-link class="list-group-item list-group-item-action"
        :to="{name: 'content', params: {bk: String(book.id), ch: String(chapter.id)}}">
          <span v-html="chapter.name"></span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChapterListing',
  props: {
    bk: {
      type: String,
      required: true,
    },
  },
  computed: {
    book() {
      // Get book information
      const mybk = Number(this.bk);
      const result = this.$store.state.data.unit.filter((book) => (book.id === mybk));
      return result[0];
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
