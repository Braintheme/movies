<template>
  <div class="load-more">
    <a
      href="#"
      @click.prevent="loadFilms"
      class="btn btn-secondary btn-lg"
      >Load More</a>

    <div class="alert alert-secondary" role="alert" v-if="scrollEnd">
      You’ve reached the end of the list
    </div>

  </div>
</template>

<script>
import debounce from "lodash/debounce";
import { isInViewport, sizeOfObject } from "~/utils/helper";

export default {
  props: {
    loadByScroll: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      is_active: false
    }
  },

  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
    if(this.is_active) {
      this.$store.dispatch('films/cleanFilmsState')
      this.is_active = false
    }
  },

  methods: {
    //Load items by scroll
    onScroll: debounce(function () {

      const box = document.querySelector('.load-more');

      if( isInViewport(box) && this.is_active ) {
        box.classList.add('load-more_active')
        this.loadFilms()
      }
    }, 100),

    // Load more items
    loadFilms: debounce(function () {

      //set load more by scroll is active
      this.is_active = true

      let page = this.filmsParams.page + 1;

      const params = { ...this.filmsParams, ...{ page: page } };

      console.log(params);
      console.log(page);

      this.$store.dispatch("films/loadMoreFilms", params);
    }, 100),
  },
  
  computed: {
    filtrationParams() {
      return this.$store.getters["films/getFiltrationParams"];
    },
    filmsParams() {
      return this.$store.getters["films/getFilmsParams"];
    },
    scrollEnd() {
      let filmsOnLoad = sizeOfObject(this.$store.getters["films/getFilms"])
      let allFims = this.$store.getters["films/getFilmsCount"]

      

      if( filmsOnLoad == allFims ) {
        return true
      }

      return false
      
    }
  },
};
</script>

<style lang="scss" scoped>

.load-more {
  padding: 50px 90px;
  text-align: center;
  &_active {
    a {
      opacity: 0;
    }
    padding: 0;
  }
}


</style>
