<template>
<section class="bg-light">
  <div class="container">
    <div class="row">
      <div class=" me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
        <div class="my-3 p-3">
          <h1 class="display-5 fw-bold">Download YTS YIFY movies: HD smallest size</h1>
          <p class="">Here you can browse and download YIFY movies in excellent 720p, 1080p, 2160p 4K and 3D quality, all at the smallest file size.</p>
        </div>
      </div>
    </div> 
  </div>

  <div class="container">

    <!-- //Show comedy -->
    <BrowseByGenre 
      :limit="50" 
      :type_show="`slider`"
      :show_title="false"
      :genre="`crime`"
      :slider_options = "sliderOptions.crime_slider.swiperOptions"
    />

    <BrowseByGenre 
      :limit="15" 
      :type_show="`slider`"
      :show_title="true"
      :genre="`fantasy`"
      :slider_options = "sliderOptions.action_slider.swiperOptions"
    />

    <!-- //Show comedy -->
    <BrowseByGenre
      :limit="5"
      :type_show="`slider`"
      :genre="`comedy`"
      :footer="true"
      :slider_options = "sliderOptions.default.swiperOptions"
    />
   
    <!-- //Show actions -->
    <BrowseByGenre :limit="5" :genre="`crime`"/>

    <!-- //Show actions -->
    <BrowseByGenre :limit="5" :genre="`action`"/>
    
    <!-- //Show drama -->
    <BrowseByGenre :limit="5" :genre="`drama`"/>

    <div class="p-5 text-center">
      <nuxt-link exact no-prefetch active-class="text-secondary" class="btn btn-secondary btn-lg" to="/browse-movies">
          Browse Movies
      </nuxt-link>
    </div>

  </div>
  
</section>
 
</template>


<script>

import BrowseByGenre from '~/components/_browseByGenre/BrowseByGenre';

export default {
  components: {
    BrowseByGenre
  },
  data() {
    return  {
      sliderOptions: {
        crime_slider: {
          swiperOptions: {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            zslidesPerGroup: 3,
            slidesPerView: 5,
             autoplay: {
              delay: 3000,
            },
            // loop: true,
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            },
          }
        },
        action_slider: {
          swiperOptions: {
            slidesPerView: 5,
            spaceBetween: 30,
            centeredSlides: true,
            autoplay: {
              delay: 2000,
            },
            // loop: true
          }
        },
        default: {
          swiperOptions: {
            slidesPerView: 1,
            spaceBetween: 30,
            breakpoints: {
              1200: {
                slidesPerView: 5,
                spaceBetween: 20
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20
              },
              320: {
                slidesPerView: 2,
                spaceBetween: 10
              }
            }
          }
        }
      }
    }
  }
}
</script>