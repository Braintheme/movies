import { buildHttpRequest } from "~/utils/helper";

export const state = () => ({
    films: []
})

export const mutations = {
    setFilms(state, data) {
        // data.forEach(film => {
        //     state.films.push(film)
        // }) 
        state.films = data
    }
}

export const actions = {
    async getFilms({commit}, params) {

        let params_request = {
            query_term: params,
            limit: 5
        }

        //request
        const request = await fetch('https://yts.mx/api/v2/list_movies.json' + buildHttpRequest(params_request))
        const response = await request.json()

        //query_term

        console.log(buildHttpRequest(params_request));


        commit('setFilms', response.data.movies)
    }
}

export const getters = {
    getFilms: state => state.films
}