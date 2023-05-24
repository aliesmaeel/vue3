<template>
 <div class="w-full" >
  <h1 class="w-full text-center text-3xl m-4">Mark Down</h1>

   <div class="grid grid-cols-3 gap-4 p-2">
     <div>
       <div class="text-center rounded-lg my-2">Your Text</div>
       <textarea ref="markdownTextarea"  class="rounded-lg h-full w-full bg-blue-200" :value="text" @keydown="updateText"></textarea>
     </div>

     <div>
       <div class="text-center rounded-lg my-2">HTML Code</div>
       <div class=" rounded-lg border bg-blue-200" >{{markedText}}</div>
     </div>

     <div>
       <div class="text-center rounded-lg my-2">Marked Text </div>
       <div class=" rounded-lg border border bg-blue-200" v-html="markedText" ></div>
     </div>

   </div>
 </div>
</template>
<script>
import {marked} from 'marked';
import wait from "../utulites/mixins/wait";


export default{
  mixins:[wait],
  data(){
  return {
    text:'**blod**',
  }
},
  computed:{
    markedText(){
      return marked(this.text);
    }
  },
  methods:{
    updateText(e){
      const tast = ()=> (this.text=e.target.value)
      this.wait(tast,500)
    },
  },
  mounted() {
    this.$refs.markdownTextarea.focus()
  }

}
</script>

