export  default {
    data(){
       return {
           time:''
       }
    },
    methods:{
        wait(func,time=1000)
        {
            clearTimeout(this.time)
            this.time= setTimeout(func,time)
        }
    }
}