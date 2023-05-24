<template>
<section class="w-full p-2">
  <div class="grid grid-cols-3 gap-4 my-5">
    <div class="bg-white rounded-lg">
      <div class="w-full text-center">
        <button v-if="!isStreaming" @click="openCamera" class="border rounded bg-pink-500 my-2 p-2">
          <span >Open Camera 📷</span>
        </button>

        <button v-if="isStreaming" @click="closeCamera" class="border rounded bg-red-500 my-2 p-2">
          <span >Stop Camera 📷</span>
        </button>

        <button v-if="isStreaming" @click="takeSnapShot" class="border rounded bg-blue-500 my-2 p-2">
          <span >Take Photo 📷</span>
        </button>

        <video class="m-auto" ref="videoRef" autoplay="true" width="200"></video>
      </div>
    </div>

    <div class="bg-white rounded-lg">
      <div class="w-full text-center ">
        <div class="w-full text-center mt-2">
        <img  ref="imgRef"
              crossorigin="anonymous"
              src=""
              style="width: 300px !important; height: 250px !important;margin: auto"/>
        </div>
        <div class="w-full text-center">
          <button @click="detect" class="border rounded bg-red-500 my-2 p-2">
            <span v-if="isLoading">Loading ... ⏳</span>
            <span v-if="!isLoading">Detect Object</span>
          </button>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-lg">
      <div v-if="result.length >0" class="w-full my-3">
        <p class="text-center text-3xl">It's a
          <span class="">{{result[0].class}}</span> </p>
      </div>
    </div>
  </div>
</section>
</template>


<script>
import {onMounted, ref} from 'vue'
import * as tf from '@tensorflow/tfjs';
import *as coco from '@tensorflow-models/coco-ssd'

export default {
  setup(){
    const result =ref('')
    const isLoading=ref('')
    const cocoSsd =coco
    const imgRef=ref("")
    const videoRef=ref("")
    const isStreaming=ref(false)

    async function detect(){
      const  img=imgRef.value
      isLoading.value=true
      const model = await cocoSsd.load();
      const predictions = await model.detect(img);
      result.value=predictions
      isLoading.value=false
    }
    function takeSnapShot(){
      const canvas=document.createElement('canvas')
      const content=canvas.getContext('2d')
      content.drawImage(videoRef.value,0,0,200,100);
      let data=canvas.toDataURL('image/png')
      imgRef.value.setAttribute('src',data)
    }
   async function openCamera(){
      if(navigator.mediaDevices.getUserMedia){
        const devices=await navigator.mediaDevices.enumerateDevices()
        const cams= devices.filter((device)=>device.kind==='videoinput')
        let camId= cams[0].deviceId
        if (!camId){
          camId=cams[0].groupId
          navigator.mediaDevices.getUserMedia({video: {groupId:{exact:camId}}}).then(stream=>{
            videoRef.value.srcObject=stream
            isStreaming.value=true
          })
        }else {

          navigator.mediaDevices.getUserMedia({video: {deviceId:{exact:camId}}}).then(stream=>{
            videoRef.value.srcObject=stream
            isStreaming.value=true
          })

        }

      }
    }

    function closeCamera(){
      const stream=videoRef.value.srcObject
      const tracks=stream.getTracks()
      tracks.map(track=>track.stop())
      isStreaming.value=false

    }
    return {imgRef,result,detect,isLoading,videoRef,openCamera,isStreaming,takeSnapShot,closeCamera}
  }
}
</script>