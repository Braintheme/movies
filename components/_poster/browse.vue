<template>

    <div v-if="films" :class="classes">
        <Poster v-for="film in films" :film="film" :key="film.id" :col="col" />
    </div>

    <div class="col-12 mt-3" v-else >
        <div class="alert alert-warning" role="alert">
            Nothing found
        </div>
    </div>

</template>

<script>

import Poster from '~/components/_poster/Poster';

export default {
    components: {
        Poster
    },
    props: {
        films: Array,
        col: {
            type: String,
            default: 'col-2'
        },
        classes: {
            type: String,
            default: 'browse-movie-wrap'
        }
    }
}
</script>
