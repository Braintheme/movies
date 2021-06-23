<template>
     <nav aria-label="Pagination">
         <!-- <p>paginator: {{filmsParams}}</p>
         <p>page: {{page}}</p>
         <p>films: {{films_count}}</p>
         <p>pages: {{countPages}}</p>
         <p>limit: {{limit}}</p> -->
        <ul class="pagination">

            <!-- First page -->
            <li v-if="page > 3" class="page-item">
                <a @click.prevent="firstPage" class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo; First</span>
                </a>
            </li>

            <!-- Previous page -->
            <li v-if="page > 1 && page !== 1" class="page-item">
                <a @click.prevent="prevPage" class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo; Prev</span>
                </a>
            </li>

            <!--Go to first and second page-->
            <template v-if="page > paginator_length - 1">
                
                <!-- Go to first page -->
                <li class="page-item">
                    <a @click.prevent="goToPage( 1 )" class="page-link" href="#" aria-label="First page">
                        <span aria-hidden="true">{{ 1 }}</span>
                    </a>
                </li>

                <!-- Go to second page -->
                <li class="page-item">
                    <a @click.prevent="goToPage( 2 )" class="page-link" href="#" aria-label="Secont page">
                        <span aria-hidden="true">{{ 2 }}</span>
                    </a>
                </li>

                <!-- Separator -->
                <li class="page-item">
                    <span class="page-link" >
                        ...
                    </span>
                </li>

            </template>

            <!-- Go to page by index -->
            <li v-for="(item, index) in paginator" :key="index" class="page-item" :class="{ active: item == page }">
                <a @click.prevent="goToPage(item)" class="page-link" href="#" aria-label="Next">
                    {{item}}
                </a>
            </li> 

            <!--Go to last and pre last page (show buttons) -->
            <template v-if="(page !== countPages && page !== countPages) && (page < countPages - 4)">
         
                <!-- Separator -->
                <li class="page-item">
                    <span class="page-link" >
                        ...
                    </span>
                </li>
                
                <!-- Go to prelast page -->
                <li class="page-item">
                    <a @click.prevent="goToPage(countPages - 1)" class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">{{ countPages - 1}}</span>
                    </a>
                </li>

                <!-- Go to last page -->
                <li class="page-item">
                    <a @click.prevent="goToPage(countPages)" class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">{{ countPages }}</span>
                    </a>
                </li>
   
            </template>

            <!-- Go to next page -->
            <li v-if="countPages != page" class="page-item">
                <a @click.prevent="nextPage" class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">Next &raquo;</span>
                </a>
            </li>

            <!-- Go to last page -->
            <li v-if="(page !== countPages && page !== countPages) && (page < countPages - 3)" class="page-item">
                <a @click.prevent="lastPage" class="page-link" href="#" aria-label="Last">
                    <span aria-hidden="true">Last &raquo;</span>
                </a>
            </li>
            
        </ul>

    </nav>
</template>

<script>
export default {

    data() {
        return {
            paginator_length: 8
        }
    },

    methods: {
        async goToPage(index) {
            await this.$store.dispatch('films/setFilmsPageNumber', index )
            this.pushRouteByQuery(this.filmsParams)
        },

        async nextPage() {
            await this.$store.dispatch('films/setFilmsPageNumber', this.page + 1 )
            this.pushRouteByQuery(this.filmsParams)
        },

        async prevPage() {
            await this.$store.dispatch('films/setFilmsPageNumber', this.page - 1 )
            this.pushRouteByQuery(this.filmsParams)
        },

        async firstPage() {
            await this.$store.dispatch('films/setFilmsPageNumber', 1 )
            this.pushRouteByQuery(this.filmsParams)
        },

        async lastPage() {
            await this.$store.dispatch('films/setFilmsPageNumber', this.countPages )
            this.pushRouteByQuery(this.filmsParams)
        },

        pushRouteByQuery(query) {
            this.$router.push({ path: '', query: query })
        }
    },
    async mounted() {
        if(this.$route.query.page) {

            await this.$store.dispatch('films/setFilmsPageNumber', this.$route.query.page )
            this.pushRouteByQuery(this.filmsParams)

        }else {
            await this.$store.dispatch('films/getFilms', this.filmsParams)
        }

    },
    computed: { 
        paginator() {

            const paginator_length = this.paginator_length
            const page = this.page

            const pages = Array(this.countPages).fill(null).map((_, i) => i + 1);

            let from = null
            let to = null

            if( page < paginator_length ) {

                from =  Math.floor(page / paginator_length)
                to =  Math.ceil(from + paginator_length )

            }else {
                from =  Math.round(page - paginator_length / 2)
                to =  Math.round(from + paginator_length - 1 )
            }

            return pages.slice(from, to)
        },
        countPages() {
            let pages = Math.round(this.films_count / this.limit)

            if(pages > 1) {
                return pages
            }else {
                return 1
            }
        },
        filmsParams() {
            return this.$store.getters["films/getFilmsParams"]
        },
        page() {
            return this.$store.getters["films/getFilmsPerPage"]
        },
        films_count() {
            return this.$store.getters["films/getFilmsCount"]
        },
        limit() {
            return this.$store.getters["films/getFilmsLimit"]
        },
    },
}
</script>

<style lang="scss" src="./style.scss"></style>
