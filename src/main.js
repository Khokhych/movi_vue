import Vue from 'vue'
import Vuex from 'vuex'
import {
    BootstrapVue,
    IconsPlugin
} from 'bootstrap-vue';
import App from "./App.vue";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


const store = new Vuex.Store({
    state: {
        movies: null,
        sort: {
            name: null,
            year: null,
            rating: 1,
        }
    },

    mutations: {
        addData(state, payload) {
            state.movies = payload.data
        },
        changeSort(state, payload) {
            state.sort[payload.value.name] = payload.value.$event
        }
    }
})

try {
    fetch('https://raw.githubusercontent.com/Omertron/api-imdb/master/JSON/chart-top.json')
        .then(response => response.json())
        .then(json => {
            store.commit('addData', {
                data: json.data.list
            })
        })
} catch (e) {
    console.log(e);
}

new Vue({
    el: '#app',
    store: store,
    render: h => h(App)
})