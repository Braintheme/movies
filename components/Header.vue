<template>
<header class="p-3 bg-dark text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
    
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li class="nav-item">
                <nuxt-link exact no-prefetch active-class="text-secondary" class="nav-link px-2 text-white" to="/">
                    Home
                </nuxt-link>
            </li>
            <li class="nav-item">
                <nuxt-link exact no-prefetch active-class="text-secondary" class="nav-link px-2 text-white" to="/browse-movies">
                    Browse Movies
                </nuxt-link>
            </li>
            <li class="nav-item">
                <nuxt-link exact no-prefetch active-class="text-secondary" class="nav-link px-2 text-white" to="/about">
                    About
                </nuxt-link>
            </li>
        
        </ul>
        
        <Search :classes="`col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3`"/>

        <div class="text-end">

            <nuxt-link v-if="!getToken" exact no-prefetch active-class="active" class="btn btn-warning" to="/login">
                Login
            </nuxt-link>
            <a v-else class="btn btn-outline-light me-2" @click.prevent="logout" href="#"> Logout </a>

        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Search from '~/components/_widgets/Search';
export default {
    components: {
        Search
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')
            this.$router.push('/login')
        }
    },
    computed: {
        getToken() {
           return this.$store.getters.hasToken
        },
    },
}
</script>


<style scoped>
.navbar {
    padding: .5rem 1rem;
}
</style>