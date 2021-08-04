<template>
    <form class="widget-search" :class="classes">

        <input
            v-on:input="searchByString"
            type="search"
            class="form-control form-control-dark"
            placeholder="Search..."
            aria-label="Search"
        >

        <div class="widget-search-result">
    
            <nuxt-link :to="`films/${film.id}`" class="widget-search-item" v-for="(film, index) in films" :key="index">
            
                <div class="widget-search-item__poster">
                    <img v-lazy="film.small_cover_image" class="card-img" :alt="film.title_long">
                </div>
                <div class="widget-search-item__body">
                    <h4>{{film.title}}</h4>
                    <span>2005</span>
                </div>
            </nuxt-link>

        </div>
    </form>
</template>

<script>
import debounce from 'lodash/debounce';
export default {
    props: {
        classes: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            active: false,
            preloader: false
        }
    },
    methods: {
        //Search by string
        searchByString: debounce(function (event) {
            this.$store.dispatch("widgetSearch/getFilms", event.target.value);
        }, 500),
    },
    computed: {
        films() {
            return this.$store.getters['widgetSearch/getFilms']
        }
    }
    
}
</script>

<style lang="scss" src="./widgets.scss"></style>
