<template>

  <section class="w-full flex">
    <div class="m-auto"  >
      <h1 class="text-center text-3xl ">Calculator</h1>
      <div>By Click and keyboard</div>
      <p class="mt-6 text-3xl text-left mb-4 w-32 h-10 overflow-x-scroll  border">{{currentNum}}</p>
      <small class="h-5" v-if="selectedOperation">{{prevNum}} {{selectedOperation}} {{currentNum}}</small>
      <small class="h-5" v-else>0</small>
      <div class="grid grid-cols-4 gap-1 ">
        <button v-for="number in numbers" @click="press(number)" class="border rounded shadow p-2  w-10 h-10" >{{number}}</button>
      </div>
    </div>
  </section>

</template>

<script>
import {ref} from "vue";
import useWindowEvent from "../utulites/hooks/useWindowEvent";
export default {
  setup(){
    const numbers=['9','8','7','+','6','5','4','-','3','2','1','*','0','=','CLR','/']
    const currentNum=ref('')
    const prevNum=ref('')
    const operations=['+','-','/','*']
    const selectedOperation=ref('')
    function press(value)
    {
      if(value==='CLR') clearScreen()
      else if(value==='=') calculate()
      else if (operations.includes(value)) applyOperation(value);
      else appendNumber(value)
    }
    function  appendNumber(value){
      currentNum.value=currentNum.value+value
    }
    function applyOperation(value){
      calculate()
      prevNum.value=currentNum.value
      currentNum.value='';
      selectedOperation.value=value
    }
    function calculate()
    {
      currentNum.value= eval(prevNum.value+selectedOperation.value+currentNum.value)
        prevNum.value=''
      selectedOperation.value=''
    }
    function clearScreen()
    {
      currentNum.value=''
      prevNum.value=''
      selectedOperation.value=''
    }
     function handleKeyDown(e){
      if(e.key==='Enter') calculate()
      else if (e.key==='Delete') clearScreen()
      else if (numbers.includes(e.key)) press(e.key)
      else clearScreen()
    }
    useWindowEvent(handleKeyDown)
    return {currentNum,numbers,press,clearScreen,prevNum,selectedOperation,calculate}
  }
}
</script>


<!--<button class="border rounded shadow p-2  w-10 h-10">1</button>-->
<!--<button class="border rounded shadow p-2  w-10 h-10">2</button>-->
<!--<button class="border rounded shadow p-2  w-10 h-10">3</button>-->
<!--<button class="border rounded shadow p-2  w-10 h-10">4</button>-->
<!--<button class="border rounded shadow p-2  w-10 h-10">5</button>-->
<!--<button class="border rounded shadow p-2  w-10 h-10">6</button>-->
<!--<button class="border rounded shadow p-2  w-10 h-10">7</button>-->
<!--<button class="border rounded shadow p-2  w-10 h-10">8</button>-->
<!--<button class="border rounded shadow p-2  w-10 h-10">9</button>-->
<!--<button class="border rounded shadow p-2  col-span-2 h-10">0</button>-->