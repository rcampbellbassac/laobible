<template>
  <div class="content">
    <router-link class="btn btn-primary backbtn"
    :to="{name: 'chapters', params: {bk: String(bk)}}">
      <i class="material-icons">
        arrow_back
      </i>
      Back
    </router-link>
    <div class="card">
      <a v-if="chapter.audiourl != ''" class="btn btn-primary" :href="chapter.audiourl" target="_blank">
        <i class="material-icons">
          queue_music
        </i>
        ຟັງ / Listen
      </a>
      <div class="card-body" v-html="chapter.content"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Content',
  props: {
    bk: {
      type: String,
      required: true,
    },
    ch: {
      type: String,
      required: true,
    },
  },
  computed: {
    book() {
      // Get book information
      const result = this.$store.state.data.unit.filter(book => book.id === Number(this.bk));
      return result[0];
    },
    chapter() {
      // Get book information
      const mybk = Number(this.bk);
      const mych = Number(this.ch);
      const fbook = this.$store.state.data.unit.filter(book => book.id === mybk);
      if (fbook.length > 0) {
        const result = fbook[0].contents.filter(chapter => chapter.id === mych);
        return result[0];
      }
      return {};
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
