<template>
    <div class="browse-movies-section">

        <h2 v-if="show_title" >{{UpperCase(genre)}} movies</h2>

        <template v-if="type_show == 'layout'">
            <filmsBrowse :classes="classes"  :films="films.content" :col="`col`" />
        </template>

        <template v-else-if="type_show == 'slider'">
            <SliderByGenre :options="slider_options" :films="films.content" />
        </template>

    </div>
</template>

<script>


import filmsBrowse from '~/components/_poster/browse'
import SliderByGenre from '~/components/_browseByGenre/SliderByGenre'

export default {
    components: {
        filmsBrowse,
        SliderByGenre
    },
    props: {
        genre: {
            type: String,
            default: 'drama'
        },
        limit: {
            type: Number,
            default: 5
        },
        type_show: {
            type: String,
            default: 'layout'
        },
        show_title: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: `Some latest movies`
        },
        classes: {
            type: String,
            default: `row row-cols-5`
        },
        slider_options: {
            type: Object
        },
    },
    data() {
        return {
            films: []
        }
    },
    async mounted() {
        const params = {
            'limit': this.limit,
            'genre': this.genre
        }
        await this.$store.dispatch('filmsByGenre/getFilms', params )

        this.getFilmsByGenre()
    },
    methods: {
        getFilmsByGenre() {

            const genre = this.genre
            const films = this.$store.getters["filmsByGenre/getFilms"]

            films.forEach( item => {
                if( item.set_genre == genre ) {
                    this.films = item
                }
            } )
        },
        UpperCase(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    },
 
    
}
</script>
