<template>
    <section>
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-6">
                    <div v-if="$route.query.needLogin" class="alert alert-danger" role="alert">
                        You need login for watch this page
                    </div>
                    <form @submit.prevent="onSubmit">
                        <h1>Login Page {{hasToken}}</h1>
                        <div class="mb-3">
                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                            <NuxtLink to="/">Back to Home</NuxtLink>
                        </div>
                        
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
export default {
    layout: 'empty',
    methods: {
        onSubmit() {
            this.$store.dispatch('login')
            this.$router.push('/')
        }
    },
    computed: {
        hasToken() {
            return this.$store.getters.hasToken
        }
    }
}
</script>
