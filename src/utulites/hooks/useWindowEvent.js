import {onMounted, onUnmounted} from "vue";

export default function useWindowEvent(handleKeyDown){
    onMounted(()=>{window.addEventListener('keydown',handleKeyDown)})
    onUnmounted(()=>{ window.removeEventListener('keydown',handleKeyDown)})
}