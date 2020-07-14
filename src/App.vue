<template>
  <div class="mt-5 mb-5">
    <b-container class="mb-4 login" v-if="!logined">
      <b-form @submit="onSubmit" class="row">
        <div class="col-sm-12 col-md-6 col-lg-4 d-flex mb-2">
          <b-input
            required
            id="inline-form-input-name"
            placeholder="Username"
            v-model="form.username"
          ></b-input>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-4 d-flex mb-2">
          <b-input
            required
            id="inline-form-input-username"
            v-model="form.password"
            placeholder="Password"
          ></b-input>
        </div>

        <div class="col-sm-12 col-md-12 col-lg-4 d-flex mb-2">
          <b-button class="w-100" type="submit" variant="primary">Log in</b-button>
        </div>
      </b-form>
    </b-container>

    <div v-if="movies && logined">
      <b-container class="mb-4">
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-4" v-for="item in inputs" :key="item.name">
            <b-form-input
              @input="changeSort({$event, name : item.name})"
              :type="item.type"
              :name="item.name"
              :placeholder="item.placeholder"
              class="mb-2"
            ></b-form-input>
          </div>

          <b-form-radio-group
            id="radio-group-2"
            class="col-sm-12 col-md-6 col-lg-4 d-flex mb-2"
            v-model="selected"
            name="radio-sub-component"
          >
            <b-form-radio @change="changeSort({$event, name: 'rating'})" value="1">Rating ∇</b-form-radio>
            <b-form-radio @change="changeSort({$event, name: 'rating'})" value="0">Rating ∆</b-form-radio>
          </b-form-radio-group>
        </div>
      </b-container>

      <b-container v-if="movies">
        <div class="d-flex flex-wrap row">
          <div
            class="col-sm-12 col-md-6 col-lg-3"
            v-for="item in movies"
            style="margin-bottom:30px "
            :key="item.body"
          >
            <b-card
              class="h-100"
              :title="item.title"
              img-alt="Image"
              :img-src="item.image.url"
              img-top
              tag="article"
            >
              <b-card-text>{{`Type: ${item.type}` }}</b-card-text>
              <b-card-text>{{`Year: ${item.year}` }}</b-card-text>
              <b-card-text>{{`Votes: ${item.num_votes}` }}</b-card-text>
              <b-card-text>{{`Rating: ${item.rating}` }}</b-card-text>
            </b-card>
          </div>
        </div>
      </b-container>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import { LayoutPlugin } from "bootstrap-vue";

Vue.use(LayoutPlugin);

export default {
  name: "app",
  computed: mapState({
    movies: state => {
      let movies = state.movies ? state.movies.list.slice() : null;
      if (!+state.sort.rating && movies) {
        movies.sort((a, b) => {
          return a.rating - b.rating;
        });
      }
      if (state.sort.name && movies) {
        movies = movies.filter(movie => movie.title.includes(state.sort.name));
      }
      if (state.sort.year && movies) {
        movies = movies.filter(movie => movie.year.includes(state.sort.year));
      }
      return movies;
    }
  }),
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      logined: localStorage.logined ? true : false,
      login: {
        username: "dowell",
        password: "dowell"
      },
      selected: "1",
      inputs: [
        {
          name: "name",
          type: "text",
          placeholder: "Name movie"
        },
        {
          name: "year",
          type: "number",
          placeholder: "Year of release"
        }
      ]
    };
  },
  methods: {
    changeSort: function(value) {
      this.$store.commit("changeSort", {
        value
      });
    },
    onSubmit: function(e) {
      e.preventDefault();
      if (
        this.form.username === this.login.username &&
        this.form.password === this.login.password
      ) {
        this.logined = "logined";
        localStorage.logined = "logined";
      } else {
        alert("Login or password not correct");
      }
    }
  }
};
</script>