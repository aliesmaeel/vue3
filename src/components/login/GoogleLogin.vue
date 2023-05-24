<template>
  GoogleLogin
  <div>
    <p class="text-center border
   bg-gradient-to-r from-red-700 to bg-red-500 p-2">
      <button @click="loginWithGoogle">Login with google</button></p>
  </div>
</template>

<script>
import firebase from "../../utulites/firebase";

export default {
  methods:{
    loginWithGoogle(){
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth()
          .signInWithPopup(provider)
          .then((result) => {
            console.log('success')
            this.$emit('close-login-modal-from-google')

          }).catch((error) => {
        console.log(error)
      });

    }
  }
}
</script>