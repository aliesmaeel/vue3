<template>

  <section @click="close" class="z-20 w-screen h-screen opacity-50 bg-gray-500 fixed top-0">
  </section>
    <div class="absolute inset-0">
      <div class="flex h-full">
        <div class="z-30 m-auto bg-white rounded shadow w-1/3 p-2">
          <h1 class="text-xl text-center">Login</h1>
          <form class="p-2 my-2" @submit.prevent="submit">
            <div class="my-4">
              <label>Email or Username</label>
              <input v-model="email" class="rounded shadow p-2 w-full"/>
            </div>

            <div class="my-4">
              <label>Password</label>
              <input  v-model="password" class="rounded shadow p-2 w-full" type="password"/>
            </div>
            <div class="my-4">
              <button type="submit"
                      class="w-full rounded border shadow
                      bg-gradient-to-r from-red-800 to-pink-900 text-white p-2">
              <span v-if="!isLoading">Login</span>
              <span v-else>⌛</span>
              </button>
            </div>
          </form>
        <GoogleLogin @close-login-modal-from-google="close"/>
        </div>
      </div>
    </div>

</template>

<script>

import firebase from "../utulites/firebase";
import GoogleLogin from "./login/GoogleLogin";

export default {
  components:{GoogleLogin},
  data() {
    return {
      email: 'ali@ali.com',
      password: '123456',
      isLoading:false
    }
  },
  methods: {
    submit() {
      this.isLoading=true
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then((result) => {
            console.log(result)
            this.isLoading=false
            this.close()
          })
          .catch((error) => {
            console.log(error)
            this.isLoading=false
          });
    },
    close(){
      this.$emit('close-login-modal')
    },

  }
}
</script>

<style>

</style>