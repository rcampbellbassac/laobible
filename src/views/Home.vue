<template>
  <div class="home">
    <div>
      <h1 class="text-primary" v-html="name"></h1>
      <div class="text-secondary" v-html="description"></div>
    </div>
    <img class="logo" src="@/assets/bible.jpg"
    alt="Photo of the Bible by David Ball: www.davidball.net, CC BY 2.5, https://creativecommons.org/licenses/by/2.5/deed.en"/>
    <div class="action">
      <router-link class="btn btn-primary" to="/read">ເປີດ / Open</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /srcS

export default {
  name: 'home',
  computed: {
    name() {
      return this.$store.state.data.title;
    },
    description() {
      return this.$store.state.data.description;
    },
  },
};
</script>

<style>
  .logo {
    max-width: 80%;
  }
  .action {
    margin-top: 2rem;
  }
</style>
