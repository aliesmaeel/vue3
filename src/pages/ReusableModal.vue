<template>
<section class="flex flex-wrap w-full">
  <div class="m-auto ">
<h1 class="text-2xl my-5">Reusable modal </h1>
    <Modal v-if="isModalBlueOpen" @closeLoginModalReusable="isModalBlueOpen=false">
     <template v-slot:title> <h1 class="text-red-500">red modal</h1></template>
     <template v-slot:body></template>
    </Modal>
    <button @click="isModalBlueOpen=true">Open Modal</button>

    <Modal v-if="isModalRedOpen" @closeLoginModalReusable="isModalRedOpen=false"></Modal>
    <button @click="isModalRedOpen=true">Open Modal</button>
  </div>

</section>
</template>

<script>
import Modal from "../components/Modal";
import {ref} from "vue";

export default {
  components:{Modal},
  setup(){
    const isModalBlueOpen=ref(false)
    const isModalRedOpen=ref(false)

    return {isModalBlueOpen,isModalRedOpen}
  }
}
</script>