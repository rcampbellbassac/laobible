<template>
<div id="app" class="container">

  <div class="alert alert-info" role="alert" style="margin-top: 1em;">
    <p>{{message}}</p>
  </div>

  <router-view />

  <nav class="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
    <a class="navbar-brand" href="#">LaoBible Web App</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
      </ul>
      <span class="navbar-text">Copyright &copy; 2019 sea-sda.org</span>
    </div>
  </nav>
</div>
</template>

<script>
/* eslint no-console: "error" */
import localforage from 'localforage';

export default {
  name: 'app',
  data() {
    return {
      message: 'Loading...',
      uploadPercentage: 0,
    };
  },
  methods: {
    setMsg(msg) {
      this.message = msg;
    },
  },
  mounted() {
    localforage.getItem('data').then((value) => {
      if (value) {
        this.setMsg('Welcome back! Loading data...');

      } else {
        this.setMsg('Welcome! Installing data...');
      }
      this.$store.dispatch('initdata');
    }).catch((err) => {
      const newmsg = `Installation failed! ${err}`;
      this.setMsg(newmsg);
    });
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Raleway');
@import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
