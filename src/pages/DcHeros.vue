<template>
  <div class="m-auto">
    <h1 class="text-center font-bold m-3 ">
      List Of Contacts
      {{superheros.length}}
    </h1>
    <ul>
      <li class="flex justify-between" v-for="(hero,index) in superheros" >{{hero.name}}
        <button v-on:click="removehero(index)" class="bordered rounded p-2 bg-red-500 m-2">Delete</button>
      </li>
    </ul>

    <input class="mt-10 border rounded p-2" ref="inputHeroRef" v-model="newname">
    <button class="border rounded bg-gradient-to-r from-red-700 to-pink-700 mx-2 p-2" @click="addhero()">Add Hero</button>
  </div>
</template>
<script>
import {onMounted, ref,computed} from "vue";

export  default {
  setup(){
    const newname=ref("test")
    const inputHeroRef=ref('')
    const superheros=ref([{'name': "Superman"}, {'name': "Batman"}, {'name': "Spiderman"}]);

   function removehero(id){
      superheros.value.splice(id,1)
    }

  function  addhero(){
       superheros.value.push({name:newname.value});
       newname.value=''
    }
   onMounted(()=>{
     inputHeroRef.value.focus()
   })

   const herosCount=computed({
     get: ()=> superheros.value.length
   })
  return {superheros,removehero,addhero,newname,inputHeroRef,herosCount}
  },

  data(){
    return {
      isdisabled:false,
    }
  },

}
</script>
