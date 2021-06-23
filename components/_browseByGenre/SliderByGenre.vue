<template>
  <swiper ref="mySwiper" :options="sliderOptions">

    <swiper-slide v-for="film in films" :key="film.id">
      <Poster :footer="false" :col="null" :film="film"/>
    </swiper-slide>


    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>
 
<script>

import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import poster from '~/components/_poster/poster';
import 'swiper/css/swiper.css'

  export default {
    name: 'slider',
    props: {
      options: {
        type: Object
      },
      films: Array,
      col: String
    },
    components: {
        Swiper,
        SwiperSlide,
        Poster: poster
    },
    directives: {
        swiper: directive
    },
    data() {
      return {
        swiperOptions: {
          pagination: {
            el: '.swiper-pagination',
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      },
      sliderOptions() {
        const options = {...this.swiperOptions, ...this.options};
        return options
      }
    },
    mounted() {
      this.swiper.slideTo(3, 1000, false)
    }
  }
</script> 