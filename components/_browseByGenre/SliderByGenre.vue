<template>
  <swiper :class="extraClasess"  ref="mySwiper" :options="sliderOptions">

    <swiper-slide v-for="film in films" :key="film.id">
      <Poster :footer="footer" :col="null" :film="film"/>
    </swiper-slide>

    <!-- <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div> -->

  </swiper>
</template>
 
<script>

import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import Poster from '~/components/_poster/Poster';
import 'swiper/css/swiper.css'


  export default {
    name: 'slider',
    props: {
      options: {
        type: Object
      },
      films: Array,
      col: String,
      footer: Boolean
    },
    components: {
        Swiper,
        SwiperSlide,
        Poster
    },
    directives: {
        swiper: directive
    },
    data() {
      return {
        swiperOptions: {
          pagination: true
          // pagination: {
          //   el: '.swiper-pagination',
          // },
          // navigation: {
          //   nextEl: ".swiper-button-next",
          //   prevEl: ".swiper-button-prev",
          //   disabledClass: 'swiper-button-disabled'
          // },
        }
      }
    },

    computed: {

      swiper() {
        return this.$refs.mySwiper.$swiper
      },

      extraClasess() {

        const options = this.swiperOptions
        let clasess = []

        if( options.pagination ) {
          clasess.push('swiper-has-pagination')
        }

        if( options.hasOwnProperty('navigation') ) {
          clasess.push('swiper-has-navigation')
        }

        return clasess
      },
      sliderOptions() {
        return { ...this.swiperOptions, ...this.options };
      },
      showControls() {
        const countSlides = this.films !== undefined ? Object.keys(this.films).length : '';
        const showSlides = this.options.slidesPerView ? this.options.slidesPerView : "";
        const result = countSlides > showSlides ? true : false
        this.show_navigation = result
      }
    },
    mounted() {
      this.swiper.slideTo(3, 1000, false)  
    }
  }
</script> 


