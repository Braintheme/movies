<template>
      
    <div class="col-12">
      <input
        v-on:input="searchByString"
        type="text"
        class="form-control"
        id="firstName"
        placeholder=""
        value=""
      />
      <div class="row">
        <div class="form-group col">
          <label for="quality" class="form-label">Quality:</label>
          <select class="form-select" id="quality" v-on:change="searchByQuality">
            <option v-for="(quality, index) in filtrationParams.quality" :key="index" :value="quality">{{quality}}</option>
          </select>
        </div>

        <!-- Filtration by Genres -->
        <div class="form-group col">
          <label for="genre" class="form-label">Genre:</label>
          <select class="form-select" id="genre" v-on:change="searchByGenre">
            <option v-for="(genre, index) in filtrationParams.genres" :key="index"  :value="toLowerCase(genre)">{{genre}}</option>
          </select>
        </div>

        <!-- Filtration by Rating -->
        <div class="form-group col">
          <label for="rating" class="form-label">Rating:</label>
          <select class="form-select" id="rating" v-on:change="searchByRating">
            <option  v-for="(rating, key, index) in filtrationParams.rating" :key="index" :value="rating" >{{key}}</option>
          </select>
        </div>

        <!-- Filtration by Sort -->
        <div class="form-group col">
          <label for="sort" class="form-label">Sort By:</label>
          <select class="form-select" id="sort" v-on:change="searchByOrder">
             <option  v-for="(order, index) in filtrationParams.sort_by" :key="index" :value="toLowerCase(order)" >{{order}}</option>
          </select>
        </div>
        
        <!-- Filtration by Order -->
        <div class="form-group col">
          <label for="order" class="form-label">Order By:</label>
          <select class="form-select" id="order" v-on:change="searchReverse">
             <option  v-for="(order, key, index) in filtrationParams.order_by" :key="index" :value="toLowerCase(order)" >{{key}}</option>
          </select>
        </div>

        <div class="form-group col">
          <label for="state" class="form-label">Limit:</label>
          <select name="limit" v-on:change="setLimit" class="form-select" v-model="filmsParams.limit">
            <option value="10">10</option>
            <option selected value="20">Default (20)</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            limit: '',
            preoperties: '123'
        }
    },
    
    methods: {
        async setLimit(event) {
           await this.$store.dispatch('films/setFilmsLimit', event.target.value )
           this.$router.push({ path: '', query: this.filmsParams })
        },

        async searchByString(event) {
           await this.$store.dispatch('films/setFilmsQueryTerm', event.target.value )
           this.$router.push({ path: '', query: this.filmsParams })
        },

        async searchByGenre(event) {
           await this.$store.dispatch('films/setFilmsGenre', event.target.value )
           this.$router.push({ path: '', query: this.filmsParams })
        },

        async searchByRating(event) {
           await this.$store.dispatch('films/setFilmsRating', event.target.value )
           this.$router.push({ path: '', query: this.filmsParams })
        },
        
        async searchByOrder(event) {
           await this.$store.dispatch('films/setFilmsOrder', event.target.value )
           this.$router.push({ path: '', query: this.filmsParams })
        },
        
        async searchByQuality(event) {
           await this.$store.dispatch('films/setFilmsQuality', event.target.value )
           this.$router.push({ path: '', query: this.filmsParams })
        },
        async searchReverse(event) {
           await this.$store.dispatch('films/setFilmsReverseResults', event.target.value )
           this.$router.push({ path: '', query: this.filmsParams })
        },

        toLowerCase(string) {
          return string.toLowerCase();
        }
    },
    computed() {
        this.limit = this.$store.getters["films/getFilmsLimit"]
    },
    computed: {
        filmsParams() {
            return this.$store.getters["films/getFilmsParams"]
        },
        filtrationParams() {
            return this.$store.getters["films/getFiltrationParams"]
        }
    }
 
}
</script>
