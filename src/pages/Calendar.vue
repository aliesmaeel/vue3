<template>
  <div class="m-auto">
    <h1 class="text-center">Vue Calendar</h1>
    <section class="flex justify-between my-2 font-bold">
      <h1>{{CurrentMonthName}}</h1>
      <h1>{{CurrentYear}}</h1>
    </section>


    <section class="flex my-2" >
     <p v-for="day in days" :key="day"  style="width: 14.28%" class="text-center">{{day}}</p>
    </section>
    <section class="flex flex-wrap h-40 " >
      <p v-for="num in startDay()" class="text-center" style="width: 14.28%" > </p>
      <p v-for="num in daysInMonth()"
         :class="currentDateClass(num)"
         class="text-center" style="width: 14.28%" >{{num}}</p>
    </section>

    <section class="flex justify-between my-2">
      <button class="border px-2 rounded" @click="prevMonth">Prev</button>
      <button class="border px-2 rounded" @click="nextMonth">Next</button>
    </section>

  </div>

</template>

<script>
export  default {
  data(){
    return {
      CurrentDate:new Date().getUTCDate(),
      CurrentMonth:new Date().getMonth(),
      CurrentYear:new Date().getFullYear(),
      days:['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    }
  },
  methods:{
    daysInMonth(){
      return new Date(this.CurrentYear,this.CurrentMonth+1,0).getDate()
    },
    startDay(){
      return new Date(this.CurrentYear,this.CurrentMonth,1).getDay()
    },
    nextMonth()
    {
      if(this.CurrentMonth===11)
      {
        this.CurrentMonth=0;
        this.CurrentYear++
      }else {
        this.CurrentMonth++
      }

    },
    prevMonth()
    {
      if(this.CurrentMonth===0)
      {
        this.CurrentMonth=12;
        this.CurrentYear--
      }else {
        this.CurrentMonth--

      }
    },
    currentDateClass(num)
    {
      const calenderDate=new Date(this.CurrentYear,this.CurrentMonth,num).toDateString();
      const currentFullDate=new Date().toDateString();

        return calenderDate===currentFullDate ? 'text-red-500' : ''
    }
  },
  computed:{
    CurrentMonthName(){
      return new Date(this.CurrentYear,this.CurrentMonth).toLocaleString('default',{month:'long'})
    }
  }
}
</script>

<style>

</style>