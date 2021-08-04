<template>
    <div class="main-layout">
        <div class="container">
            <pre>
                {{films_name}}
            </pre>
            <div class="row">
                <filmsBrowse :classes="`row browse-movie-wrap`"  :films="films" :col="`col-2`" />
            </div>
        </div>
    </div>
</template>
<script>

import filmsBrowse from '~/components/_poster/browse'

export default { 
    components: {
        filmsBrowse
    },
    async asyncData({store}) {
        await store.dispatch('films/getFilms')
        const films = await store.getters["films/getFilms"]
        return {
            films
        }
    },
    
}
</script>
