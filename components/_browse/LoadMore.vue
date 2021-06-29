<template>
  <div class="load-more">
    <a
      href="#"
      @click.prevent="loadFilms"
      class="btn btn-secondary btn-lg"
      >Load More</a>

  </div>
</template>

<script>
import debounce from "lodash/debounce";
import { isInViewport } from "~/utils/helper";

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
    // if(this.is_active) {
    //   this.$store.dispatch('films/cleanFilmsState')
    //   this.is_active = false
    //   console.log('destroy');
    // }
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
  },
};
</script>

<style lang="scss" scoped>

.load-more {
  padding: 50px 0;
  text-align: center;
  &_active {
    opacity: 0;
    padding: 0;
  }
}


</style>
