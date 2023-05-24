<template>
  <AppHeader @open-login-modal="isopenlogin=true"/>
  <div class="w-full flex" >
    <router-view></router-view>
  </div>
 <LoginModal v-if="isopenlogin" @close-login-modal="isopenlogin=false"/>
</template>

<script>

import AppHeader from "./components/AppHeader";
import LoginModal from "./components/LoginModal";
import firebase from "./utulites/firebase";

export default {
  components: {LoginModal, AppHeader},
  data(){
    return{
      isopenlogin:false,
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user){
        this.$store.commit('setIsLoggedIn',true)
        this.$store.commit('setAuthUser',user)
      }else{
        this.$store.commit('setIsLoggedIn',false)
        this.$store.commit('setAuthUser',{})
      }
    })
  }
}
</script>