import {createRouter,createWebHistory} from 'vue-router'

import DcHeros from "./pages/DcHeros";
import Calendar from "./pages/Calendar";
import Home from "./pages/Home";
import markdown from "./pages/Markdown";
import Slider from "./pages/Slider";
import Calculator from "./pages/Calculator";
import ReusableModal from "./pages/ReusableModal";
import Chat from "./pages/Chat";
import store from "./store/index";
import UserCrud from "./pages/UserCrud";
import Tencer from "./pages/Tencer";

const routes=[
    {path:'/heroes',component:DcHeros},
    {path:'/calendar',component:Calendar},
    {path:'/',component:Home},
    {path:'/markdown',component:markdown},
    {path:'/slider',component:Slider},
    {path:'/calculator',component:Calculator},
    {path:'/modal',component:ReusableModal},
    {path:'/tencer',component:Tencer},
    {path:'/crud',component:UserCrud},
    {path:'/chat',component:Chat,beforeEnter:(to,from,next)=>{
        if(!store.state.isLoggedIn) next('/')
           next()
        }}
]
const router= createRouter({
    history: createWebHistory(),
    routes
})
export default router
