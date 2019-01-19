/* eslint no-param-reassign: ["error", { "props": false }] */
import Vue from 'vue';
import Vuex from 'vuex';
import localforage from 'localforage';

localforage.config({
  name: 'LaoBible',
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: {},
    errors: [],
    loading: true,
    installing: false,
  },
  mutations: {
    LOAD: (state, initdata) => {
      state.data = initdata;
    },
    ERROR: (state, error) => {
      state.errors.push(error);
    },
    INSTALLED: (state) => {
      state.installing = false;
      state.loading = false;
    },
  },
  actions: {
    async initdata({ commit }) {
      localforage.getItem('LaoBible').then((localstoragedata) => {
        if (localstoragedata != null) {
          const load = async () => 'done';
          load()
            .then(commit('LOAD', localstoragedata))
            .then(commit('INSTALLED'));
        } else {
          try {
            this.state.installing = true;
            // Content URLs
            // https://sea-sda.org/data/LaoBible.json
            // https://sea-sda.org/data/LaoBibleStudies.json
            // https://sea-sda.org/data/LaoEGW.json
            // https://sea-sda.org/data/LaoHealthBooks.json
            // https://sea-sda.org/data/LaoSongs.json
            fetch('https://sea-sda.org/data/LaoBible.json')
              .then(response => response.json())
              .then(async (responseJSON) => {
                await localforage.setItem('LaoBible', responseJSON)
                  .then(commit('LOAD', responseJSON))
                  .then(commit('INSTALLED'));
              });
          } catch (e) {
            commit('ERROR', { title: 'Failed to load inital data.', error: e });
          }
        }
      });
    },
  },
});
