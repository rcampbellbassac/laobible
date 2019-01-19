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
  },
  mutations: {
    LOAD: (state, initdata) => {
      state.data = initdata;
    },
    ERROR: (state, error) => {
      state.errors.push(error);
    },
  },
  actions: {
    async initdata({ commit }) {
      localforage.getItem('LaoBible').then((localstoragedata) => {
        if (localstoragedata != null) {
          commit('LOAD', localstoragedata);
        } else {
          try {
            // Content URLs
            // https://sea-sda.org/data/LaoBible.json
            // https://sea-sda.org/data/LaoBibleStudies.json
            // https://sea-sda.org/data/LaoEGW.json
            // https://sea-sda.org/data/LaoHealthBooks.json
            // https://sea-sda.org/data/LaoSongs.json
            fetch('https://sea-sda.org/data/LaoBible.json')
              .then((response) => {
                localforage.setItem('LaoBible', response).then(commit('LOAD', response));
              });
            // const initdata = require('@/data/LaoBible.json');
            // eslint-disable-line global-require
            // localforage.setItem('LaoBible', initdata).then(commit('LOAD', initdata));
          } catch (e) {
            commit('ERROR', { title: 'Failed to load inital data.', error: e });
          }
        }
      });
    },
  },
});
