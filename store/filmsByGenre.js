import { getQueryUrlFromObject } from "~/utils/helper";

export const state = () => ({
    films: []
})

export const mutations = {
    setFilms(state, data) {
        state.films.push(data) 
        // console.log('mutation:', data); 
    }
}

export const actions = {
    async getFilms({commit}, params) {
        //params
        const key = params.genre  

        //request
        const request = await fetch('https://yts.mx/api/v2/list_movies.json' + getQueryUrlFromObject(params))
        const response = await request.json()

        function Genre(set_genre, data) {
            this.set_genre = set_genre,
            this.content = data
        }

        const genre = new Genre(key, response.data.movies)

        commit('setFilms', genre)
    }
}

export const getters = {
    getFilms: state => state.films
}