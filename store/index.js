export const state = () => ({
    token: null
})

export const mutations = {
    setToken(state, token) {
        state.token = token
    },
    clearToken(state, ) {
        state.token = null
    }
}

export const actions = {
    login({ commit }) {
        commit('setToken', 'hasToken')
    },
    logout({commit}) {
        commit('clearToken')
    }
}

export const getters = {
    hasToken: state => {
        return state.token
    }
}