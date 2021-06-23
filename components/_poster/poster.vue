<template>
    <div :class="col">
        <nuxt-link class="browse-movie-link" :to="`films/${film.id}`">
            <figure>
                <img v-lazy="film.medium_cover_image" class="card-img" :alt="film.title_long">
                <figcaption>
                    <h4 v-if="film.rating" class="rating">{{film.rating}} / 10</h4>
                    <div class="genrs">
                        <div class="genr" v-for="genr in film.genres" :key="genr">{{genr}}</div>
                    </div>
                    <nuxt-link :to="`films/${film.id}`" class="btn btn-primary btn-sm">
                        View Details
                    </nuxt-link>
                </figcaption>
            </figure>
        </nuxt-link>
        
        <div v-if="footer"  class="browse-movie-bottom">
            
            <nuxt-link :to="`films/${film.id}`" class="browse-movie-title">
                {{ film.title }}
            </nuxt-link>

            <div class="browse-movie-year">{{ film.year }}</div>
            <div class="browse-movie-quality">
                <a :href="torrent.url" v-for="(torrent, index) in film.torrents" :key="index" class="badge bg-dark">{{torrent.quality}}</a>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        film: Object,
        footer: {
            type: Boolean,
            default: true
        },
        col: {
            type: String,
            default: 'col-2'
        }
    },
    
}

</script>
