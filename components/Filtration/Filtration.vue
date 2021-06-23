<template>
  <div class="col-12">
    {{ params }}
    <a
      href="http://localhost:3000/browse-movies?limit=30&page=1&quality=720p&rating=0&genre=biography&sort_by=year&order_by=asc&query_term=love"
      >go</a
    >
    <input
      v-on:input="searchByString"
      v-model="params.query_term"
      type="text"
      class="form-control"
      id="firstName"
      placeholder=""
      value=""
    />

    <!-- Filtration by Quality -->
    <div class="row">
      <div class="form-group col">
        <label for="quality" class="form-label">Quality:</label>
        <select
          class="form-select"
          id="quality"
          v-on:change="searchByQuality"
          v-model="params.quality"
        >
          <option
            v-for="(quality, index) in filtrationParams.quality"
            :key="index"
            :value="quality"
          >
            {{ quality }}
          </option>
        </select>
      </div>

      <!-- Filtration by Genres -->
      <div class="form-group col">
        <label for="genre" class="form-label">Genre:</label>
        <select
          class="form-select"
          id="genre"
          v-on:change="searchByGenre"
          v-model="params.genre"
        >
          <option
            v-for="(genre, index) in filtrationParams.genres"
            :key="index"
            :value="genre"
          >{{toUpperCase(genre)}}</option>
        </select>
      </div>

      <!-- Filtration by Rating -->
      <div class="form-group col">
        <label for="rating" class="form-label">Rating:</label>
        <select
          class="form-select"
          id="rating"
          v-on:change="searchByRating"
          v-model="params.minimum_rating"
        >
          <option
            v-for="(rating, key, index) in filtrationParams.minimum_rating"
            :key="index"
            :value="rating"
          >
            {{ key }}
          </option>
        </select>
      </div>

      <!-- Filtration by Sort -->
      <div class="form-group col">
        <label for="sort" class="form-label">Sort By:</label>
        <select class="form-select" id="sort" v-on:change="searchByOrder">
          <option
            v-for="(order, index) in filtrationParams.sort_by"
            :key="index"
            :value="order"
          >
            {{toUpperCase(order)}}
          </option>
        </select>
      </div>

      <!-- Filtration by Order -->
      <div class="form-group col">
        <label for="order" class="form-label">Order By:</label>
        <select class="form-select" id="order" v-on:change="OrderBy">
          <option
            v-for="(order, key, index) in filtrationParams.order_by"
            :key="index"
            :value="order"
          >
            {{key}}
          </option>
        </select>
      </div>

      <div class="form-group col">
        <label for="state" class="form-label">Limit:</label>
        <select
          name="limit"
          v-on:change="setLimit"
          class="form-select"
          v-model="params.limit"
        >
          <option value="10">10</option>
          <option selected value="20">Default (20)</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>

import { isEmptyObject, filterNullObject, toLowerCase, toUpperCase } from "~/utils/helper";

export default {
  data() {
    return {
      params: {
        query_term: null,
        quality: "All",
        minimum_rating: "0",
        genre: "all",
        sort_by: "latest",
        order_by: "desc",
        limit: 20,
      },
    };
  },
  async mounted() {

    const routeParams = this.$route.query;

    if (isEmptyObject(routeParams) == false) {
      await this.$store.dispatch("films/setFilmsParams", routeParams);

      this.pushRouteByQuery( this.filmsParams );
      this.params = { ...this.params, ...filterNullObject(this.filmsParams) };
    }
  },
  methods: {

    async setLimit(event) {
      await this.$store.dispatch("films/setFilmsLimit", event.target.value);
      this.$router.push({ path: "", params: this.filmsParams });
    },

    async searchByString(event) {
      await this.$store.dispatch("films/setFilmsQueryTerm", event.target.value);
      this.pushRouteByQuery(this.filmsParams);
    },

    async searchByGenre(event) {
      await this.$store.dispatch("films/setFilmsGenre", event.target.value);
      this.pushRouteByQuery(this.filmsParams);
    },

    async searchByRating(event) {
      await this.$store.dispatch("films/setFilmsRating", event.target.value);
      this.pushRouteByQuery(this.filmsParams);
    },

    async searchByOrder(event) {
      await this.$store.dispatch("films/setFilmsOrder", event.target.value);
      this.pushRouteByQuery(this.filmsParams);
    },

    async searchByQuality(event) {
      await this.$store.dispatch("films/setFilmsQuality", event.target.value);
      this.pushRouteByQuery(this.filmsParams);
    },

    async OrderBy(event) {
      await this.$store.dispatch("films/setFilmsOrderBy", event.target.value);
      this.pushRouteByQuery(this.filmsParams);
    },

    pushRouteByQuery(query) {
      this.$router.push({ path: "", query: query });
    },

    //Imported methods
    toLowerCase, toUpperCase
  },
  computed: {
    filmsParams() {
      return this.$store.getters["films/getFilmsParams"];
    },
    filtrationParams() {
      return this.$store.getters["films/getFiltrationParams"];
    },
  },
};
</script>
