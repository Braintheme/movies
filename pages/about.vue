<template>
    <div class="main-layout">
       <div class="container">
           <div class="row">
               <div class="col-lg-12">
                   <h1>About Page</h1>
                   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ullam tenetur sint illo neque accusamus blanditiis exercitationem expedita facere ex.</p>
               </div>
           </div>
       </div>
   </div>
</template>

<script>
export default {
    layout: 'default',
    middleware: 'authenticated'
}
</script>
<style scoped>
    .main-layout {
        padding: 100px 0;
    }
</style>
