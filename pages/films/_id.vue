<template>
    <section class="bg-light">
        <div class="container">
            <div class="default-layout">
                <div class="row">
                    <div class="col-lg-3 film-poster">
                        <img v-lazy="film.medium_cover_image" class="card-img" :alt="film.title">
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary" type="button">Download</button>
                        </div>
                    </div>
                    <div class="col-lg-6">

                        <h1>{{film.title}}</h1>
                        <hr>
                        <h5>{{film.year}}</h5>
                        <h5 v-if="film.genres" >
                            <span v-for="genr in film.genres" :key="genr">{{genr}}/</span>
                        </h5>

                    </div>
                    <div class="col-lg-2">
                        <h5>Similar Movies</h5>
                        <SimilarFilms
                            :films="similarFilms"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import SimilarFilms from '~/components/_poster/similars'

export default {

    components: {
        SimilarFilms
    },

    data(){
        return {
            similar_r: null
        }
    },
    
    validate({params}) {
        return /^\d+$/.test(params.id)
    },
  
    async asyncData({store, params}) {
        await store.dispatch('film/getFilm', params.id)
        const film = await store.getters["film/getFilm"]

        await store.dispatch('similar/getFilms', params.id)
        const similar = await store.getters["similar/getFilms"]
     
        return {
            film,
            similar
        }
    },
    mounted() {
        // console.log(this.similar);
    },
    computed: {
        similarFilms() {
            const arr = this.similar
            let similar = []

            arr.forEach(film => {
                similar.push({
                    id: film.id,
                    title: film.title,
                    thumbnail: film.medium_cover_image,
                })
              
            });
            return similar
        }
    },
    methods: {
        shortTitle(title) {
            return title.slice(0, 5);
        },
    },
}
</script>
