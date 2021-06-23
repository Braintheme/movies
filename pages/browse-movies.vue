<template>
  <section class="bg-light default-layout">
    <div class="container">
      <div class="row">
        <div
          class="me-md-3 text-center overflow-hidden"
        >
         
            <h1 class="display-5 fw-bold">Browse Movies</h1>
            <p class="">
              Here you can browse and download YIFY movies in excellent 720p,
              1080p, 2160p 4K and 3D quality, all at the smallest file size.
            </p>
      
        </div>
      </div>
     
        <Filtration/>
        
        <div class="col-12 p-4" v-show="films">
          <Pagination/>
        </div>

        <filmsBrowse :classes="`row row-cols-5 browse-movie-wrap`"  :films="films" :col="col" />
        
        <div class="col-12" v-show="films" >
          <Pagination/>
        </div>
  
    </div>

  </section>
</template>

<script>

import filmsBrowse from '~/components/_poster/browse'

export default { 
    components: {
        filmsBrowse
    },
    // async asyncData({store}) {
    //     await store.dispatch('films/setFilmsPageNumber')
    //     console.log(store.getters.getFilmsParams);
    //     const films = await store.getters["films/getFilms"]
    //     return {
    //         films
    //     }
    // },
    async mounted() {
        if(this.$route.query.limit) {
            await this.$store.dispatch('films/setFilmsLimit', this.$route.query.limit)
        }else {
            // await this.$store.dispatch('films/getFilms', `?page=1`)
        }
    },
    // Если мы находимся на странице больше чем максимальное доступное количество страниц на данный момент, 
    // мы редиректимся на страницу 1
    watch: {
      countPages: async function (page) {
        if(page < this.page) {
          await this.$store.dispatch('films/setFilmsPageNumber', 1 )
          this.$router.push({ path: '' ,query: this.filmsParams })
        }
      },
    },
    computed: {
        films() {
          return this.$store.getters["films/getFilms"]
        },
        filmsParams() {
            return this.$store.getters["films/getFilmsParams"]
        },
        page() {
          return this.$store.getters["films/getFilmsPerPage"]
        },
        countPages() {
          return Math.round(this.films_count / this.limit)
        },
        films_count() {
            return this.$store.getters["films/getFilmsCount"]
        },
        limit() {
            return this.$store.getters["films/getFilmsLimit"]
        },
        col() {
          return 'col'
        }
    }
}

</script>
