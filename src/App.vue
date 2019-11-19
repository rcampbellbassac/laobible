<template>
<div id="app" class="container">
  <br>

  <div v-if="!complete" class="alert alert-info" role="alert">
    <p>{{message}}</p>
  </div>

  <div v-if="showErr" class="alert alert-warn" role="alert">
    <p>{{error}}</p>
  </div>

  <div v-if="installing" class="alert alert-info" role="alert">
    <p>Data installing... This may take a few minutes.</p>
  </div>

  <router-view class="view" />

  <nav class="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Lao Bible Web App</a>
    <!-- <a class="navbar-brand" href="#">Lao Bible Studies Web App</a> -->
    <!-- <a class="navbar-brand" href="#">Lao Health Books Web App</a> -->
    <!-- <a class="navbar-brand" href="#">Lao Ellen G White Books Web App</a> -->
    <!-- <a class="navbar-brand" href="#">Lao Songs Web App</a> -->
    <button class="navbar-toggler" type="button"
    data-toggle="collapse" data-target="#navbarCollapse"
    aria-controls="navbarCollapse" aria-expanded="false"
    aria-label="Toggle navigation">
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
      complete: false,
      error: '',
      showErr: false,
    };
  },
  computed: {
    installing() {
      return this.$store.state.installing;
    },
    loading() {
      return this.$store.state.loading;
    },
  },
  methods: {
    setMsg(msg) {
      this.message = msg;
    },
    setErr(msg) {
      this.error = msg;
      this.complete = true;
      this.showErr = true;
    },
  },
  mounted() {
    localforage.getItem('LaoBible').then((value) => {
      if (value === null) {
        this.setMsg('Initial loading... Please wait.');
      }
      this.setMsg('Welcome! Installing data...');
      this.$store.dispatch('initdata').then(() => {
        this.complete = true;
      });
    }).catch((err) => {
      const newmsg = (`Installation failed! ${err}`);
      this.setErr(newmsg);
    });
  },
};
</script>

<!--
- Primary Colors for Apps -
LB - Lao Bible - #ff9800
LBS - Lao Bible Studies - #4527a0
EGW - Lao Ellen G White Books - #5d4037
HB - Lao Health Books - #558b2f
LS - Lao Songs - #00695c
 -->

<style lang="scss">
$primary: #ff9800;
$secondary: #2962ff;
$body-bg: #eeeeee;
$body-color: #212121;
@import url('https://fonts.googleapis.com/css?family=Raleway');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>

<style>
.view {
  margin-bottom: 5rem;
}

.alert {
  margin-top: 2rem;
}

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
