<template>

<section  @click="close" class="z-20 h-screen w-screen bg-gray-500 fixed top-0 left-0 opacity-95">
  <div class="absolute inset-0">
    <div class="flex h-full">
      <div class="z-40 m-auto bg-white rounded shadow w-1/3 p-2">
        <h1 class="text-xl text-center"></h1>
        <form class="p-2 my-2" @submit.prevent="submit">
          <slot name="title"></slot>
          <slot name="body">
            <h3>this is modal body</h3>
          </slot>
        </form>
      </div>
    </div>
  </div>
</section>

</template>
<script>
export default {
setup(_,{emit}){
 function close(){
    emit('close-login-modal-reusable')
  }
  return {close}
}}
</script>