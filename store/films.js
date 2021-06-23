import { filterNullObject, getQueryUrlFromObject } from "~/utils/helper";

export const state = () => ({
    films: null,
    page: null,
    films_count: null,
    params: {
        limit: 20,
        page: 1,

        query_term: null,
        quality: null,
        minimum_rating: null,
        genre: null,
        sort_by: null,
        order_by: null,
    },
    filtration_params: {
        genres: [
            'all',
            'action',
            'adventure',
            'animation',
            'biography',
            'comedy',
            'crime',
            'documentary',
            'drama',
            'family',
            'fantasy',
            'film-Noir',
            'game-Show',
            'history',
            'horror',
            'music',
            'musical',
            'mystery',
            'news',
            'reality-TV',
            'romance',
            'sci-Fi',
            'sport',
            'talk-Show',
            'thriller',
            'war',
            'western',
        ], 
        quality: [
            'All',
            '720p',
            '1080p',
            '2160p',
            '3D',
        ],
        minimum_rating: {
            'All':'0',
            '9+':'9',
            '8+':'8',
            '7+':'7',
            '6+':'6',
            '5+':'5',
            '4+':'4',
            '3+':'3',
            '2+':'2',
            '1+':'1',
        }, 
        sort_by: [
            'latest',
            'year',
            'rating',
        ],
        order_by: {
            'Default' : 'desc',
            'Reverse' : 'asc',
        }
    }

})

export const mutations = {
    setFilms(state, data) {
        state.films = data
    },
    setFilmsCount(state, data) {
        state.films_count = data
    },
    setFilmsPage(state, data) {
        state.page = data
    },
    setFilmsParams(state, data) {
        state.params = data
    },
    setFilmsLimit(state, data) {
        state.params.limit = data
    },
    setFilmsGenre(state, data) {
        state.params.genre = data
    },
    setFilmsRating(state, data) {
        state.params.minimum_rating = data
    },
    setFilmsOrder(state, data) {
        state.params.sort_by = data
    },
    setFilmsQuality(state, data) {
        state.params.quality = data
    },
    setFilmsPageNumber(state, data) {
        state.params.page = data
    },
    setFilmsOrderBy(state, data) {
        state.params.order_by = data
    },
    setQueryTerm(state, data) {
        state.params.query_term = data
    }
}

export const actions = {
    async getFilms({commit}, params) {
        
        const request = await fetch('https://yts.mx/api/v2/list_movies.json' + getQueryUrlFromObject(params))
        const response = await request.json()

        commit('setFilms', response.data.movies)

        commit('setFilmsCount', response.data.movie_count )
        commit('setFilmsPage', response.data.page )
    },

    async setFilmsParams({commit, dispatch, getters}, data) {
        commit('setFilmsParams', data )
        await dispatch('getFilms', getters.getFilmsParams)
    },
    
    async setFilmsLimit({commit, dispatch, getters}, data) {
        commit('setFilmsLimit', data )
        await dispatch('getFilms', getters.getFilmsParams)
    },

    async setFilmsGenre({commit, dispatch, getters}, data) {
        commit('setFilmsGenre', data )
        await dispatch('getFilms', getters.getFilmsParams)
    },
    
    async setFilmsRating({commit, dispatch, getters}, data) {
        commit('setFilmsRating', data )
        await dispatch('getFilms', getters.getFilmsParams)
    },
    
    async setFilmsOrder({commit, dispatch, getters}, data) {
        commit('setFilmsOrder', data )
        await dispatch('getFilms', getters.getFilmsParams)
    },
    
    async setFilmsQuality({commit, dispatch, getters}, data) {
        commit('setFilmsQuality', data )
        await dispatch('getFilms', getters.getFilmsParams)
    },

    async setFilmsPageNumber({commit, dispatch, getters}, data) {
        commit('setFilmsPageNumber', data )
        await dispatch('getFilms', getters.getFilmsParams )
    },
    
    async setFilmsOrderBy({commit, dispatch, getters}, data) {
        commit('setFilmsOrderBy', data )
        await dispatch('getFilms', getters.getFilmsParams )
    },

    async setFilmsQueryTerm({commit, dispatch, getters}, data) {
        commit('setQueryTerm', data )
        await dispatch('getFilms', getters.getFilmsParams )
    }
}

export const getters = {
    getFilms: state => state.films,
    getFilmsCount: state => state.films_count,
    getFilmsPerPage: state => state.params.page,
    getFilmsLimit: state => state.params.limit,
    getFilmsParams: state => filterNullObject(state.params),
    getFiltrationParams: state => state.filtration_params
}