<template>
<section class="w-full flex">
  <div class="m-auto">
    <h1 class="text-center text-2xl">Real time chat</h1>
    <div class="border rounded-lg bg-white">
      <div  class="h-64 p-2">
        <div v-for="chat of state.chats"
        :class="userId===chat.id ? 'text-right' : 'text-left'">
          <span class="px-4  rounded-lg bg-blue-400">{{chat.message}}</span>
        </div>
      </div>

      <div class="h-8 p-2">
        <input class="p-1 border rounded shadow"
               style="background: rgb(224, 224, 232)"
               placeholder="Start Typing ..."
               @keydown.enter="addMessage"
               v-model="state.message"/>
      </div>
    </div>
  </div>
</section>
</template>
<script>

import {computed, onMounted, onUnmounted} from "vue";
import { getDatabase,get,
  push,onChildAdded,set,onValue,child,ref as dbref } from "firebase/database";
import {ref} from "vue";
import {reactive} from "vue";
import { getAuth } from "firebase/auth";
import {useStore} from 'vuex'



export default {
  setup() {
    const state=reactive({
      chats:[],
      message:"",
    })

    const store=useStore()

    const userId=computed(()=>{
     return  store.state.authUser.uid
    })

    onMounted(async ()=>{
      const auth=getAuth()
      const db=getDatabase()
        const comments=dbref(db,'/chats')
      onChildAdded(comments, (snapshot) => {
        state.chats.push({key:snapshot.key,...snapshot.val()
        })
      });
    })

   function addMessage(e)
    {
      const db=getDatabase()
      const auth=getAuth()

      const collection = dbref(db, '/chats');
      const newPostRef = push(collection);

      set(newPostRef, {
        id:auth.currentUser.uid,
        message:e.target.value
      });
      state.message=''

    }
    return {state,addMessage,userId}
  }



}

</script>
