<template>
    
    <div class="similar-films">
        <nuxt-link v-for="film in films" :key="film.id" :to="`/films/${film.id}`">
            <img :src="film.thumbnail" :alt="film.title">
        </nuxt-link> 
    </div>

</template>

<script>
export default {
    props: {
        films: Array
    }
}


</script>
