export const state = () => ({
    film: null
})

export const mutations = {
    setFilm(state, data) {
        state.film = data
    }
}

export const actions = {
    async getFilm({commit}, id) {
        const request = await fetch("https://yts.mx/api/v2/movie_details.json?movie_id=" + id)
        const response = await request.json()
        const film = response.data.movie

        commit('setFilm', film)

    }
}

export const getters = {
    getFilm: state => state.film
}