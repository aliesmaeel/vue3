<template>
<div class="flex flex-wrap  w-full relative">
  <div v-for="(color,index) in colors" class="absolute w-full">
    <transition name="fade">
  <div v-if="index===currentSlide"
       :key="color"
       :class="color"
       class="w-full"
       style="height: 350px">
  </div>
    </transition>
  </div>

  <div class="w-full" style="height: 340px">
    <div class="absolute bottom-0 w-full flex justify-center">
      <div v-for="(item,index) in colors"
           :key="item"
           @click="makeActive(index)"
           :class="index===currentSlide ? 'bg-gray-500' :'bg-gray-300' "
           class="w-4 h-4 mx-2 rounded-full cursor-pointer"
      ></div>
    </div>
  </div>


<!--  <div class="w-full flex my-10">-->
<!--    <div class="m-auto">-->
<!--      <transition name="fade">-->
<!--        <h1 v-if="isTitleShowing">Slider Carousel</h1>-->
<!--      </transition>-->
<!--      <button @click="isTitleShowing = !isTitleShowing" class="px-2 rounded border">-->
<!--        Toogle text-->
<!--      </button>-->
<!--    </div>-->
<!--  </div>-->
</div>

</template>

<script>
export  default {
data(){
  return {
    currentSlide:1,
    currentTimer:'',
    isTitleShowing:true,
    colors:['bg-green-400','bg-blue-400','bg-red-400']
  }
},
  methods:{
  makeActive(index){
    this.currentSlide=index
  }
  },
  mounted() {
  this.currentTimer=setInterval(()=>{
    (this.currentSlide===2) ? this.currentSlide=0 : this.currentSlide++
  },3000)
  },
  unmounted() {
  clearInterval(this.currentTimer)
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}

.fade-enter-from {

  transform: translate(-100%);
}
.fade-leave-to {
  transform: translate(100%);
}
</style>