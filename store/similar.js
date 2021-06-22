export const state = () => ({
    films: null
})

export const mutations = {
    setFilms(state, data) {
        state.films = data
    }
}

export const actions = {
    async getFilms({commit}, id) {
        const request = await fetch('https://yts.mx/api/v2/movie_suggestions.json?movie_id=' + id)
        const response = await request.json()
        commit('setFilms', response.data.movies)
    }
}

export const getters = {
    getFilms: state => state.films
}