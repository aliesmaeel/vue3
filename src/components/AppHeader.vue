<template>
  <nav class="w-full bg-gradient-to-r from-blue-600 to-blue-900 text-white px-4 py-4">
    <router-link class="mx-3" v-for="hero in list" :key="hero.to" :to="hero.to">{{hero.title}}</router-link>
    <button v-if="!isLoggedIn" class="mx-3" @click="$emit('open-login-modal')">Login</button>
    <button v-if="isLoggedIn" class="mx-3" @click="logout">Logout</button>
  </nav>
</template>
<script>
import firebase from "../utulites/firebase";

export  default {
data(){
  return {

    list : [
      {title:'Home',to:'/'},
      {title:'Heroes',to:'/heroes'},
      {title:'Calendar',to:'/calendar'},
      {title:'MarkDown',to:'/markdown'},
      {title:'Slider',to:'/slider'},
      {title:'Calculator',to:'/calculator'},
      {title:'Modal',to:'/modal'},
      {title:'Crud',to:'/crud'},
      {title:'Chat',to:'/chat'},
      {title:'Object Detection',to:'/tencer'}
    ]
  }
},
  computed:{
    isLoggedIn(){
      return this.$store.state.isLoggedIn
    }
  },
  methods:{
  logout(){
    firebase.auth().signOut()
  }
  }
}
</script>
<style>

</style>