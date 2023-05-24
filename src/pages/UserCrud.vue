<template>

  <section class="flex w-full">
  <div class="m-auto">
    <button class="rounded border px-2 py-2 mb-4" @click="isModalOpen=true">Add User</button>
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>avatar</th>
        <th>first name</th>
        <th>email</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in state.users" :key="user.id">
        <td class="border px-4">{{user._id}}</td>
        <td class="border px-4"><img class="rounded-full" style="max-width: 50%"  :src="user.avatar"/></td>
        <td class="border px-4">{{user.name}}</td>
        <td class="border px-4">{{user.email}}</td>
        <td class="border px-4">
          <button class="p-2 rounded bg-red-500" @click="destroy(user._id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
<div class="flex justify-between my-5">
  <button class="border px-2 py-2   hover:bg-gray-500" @click="prev">Prev</button>
  <button class="border px-2 py-2   hover:bg-gray-500" @click="next">Next</button>
</div>
  </div>
  </section>

  <section v-if="isModalOpen" class=" z-20 h-screen w-screen bg-gray-500 fixed top-0 left-0 opacity-95">
    <button @click="close" class="z-40 w-full fixed">Close Modal</button>
    <div class="absolute inset-0">
      <div class="flex h-full">
        <div class="z-40 m-auto bg-white rounded shadow w-1/3 p-2">
          <h1 class="text-xl text-center"></h1>
          <form class="p-2 my-2" @submit.prevent="submit">
            <h1 class="text-3xl">Add New User</h1>
            <div class="p-2">
            <label>user name</label>
            <input class="w-full p-2 rounded border"
                 v-model="state.form.name"  type="text" placeholder=" user name "/>
            </div>
            <div class="p-2">
              <label>email</label>
              <input class="w-full p-2 rounded border"
                     v-model="state.form.email"
                     type="text" placeholder="email "/>
            </div>

            <div class="p-2">
              <label>avatar</label>
              <input class="w-full p-2 rounded border"
                     v-model="state.form.avatar"
                     type="text" placeholder="avatar "/>
            </div>

            <div class="p-2">
              <label>submit</label>
              <input class="w-full p-2 rounded border hover:bg-red-500" type="submit" value="create"/>
            </div>

          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {onMounted, reactive} from "vue";
import axios from 'axios'
import {ref} from "vue";
import Modal from "../components/Modal";

export default {
  components: {Modal},
  setup(){
  const isModalOpen=ref(false)
  const state=reactive({
    users:[],
    form:{
      name:'',
      email:'',
      avatar:''
    }
  })
  onMounted(async ()=>{
    const {data} =await axios.get("https://crudcrud.com/api/3bad26852b6f47cebae091c8e1fe9068/users")
    state.users=data
  })

    async function submit(){
    const {data} = await axios.post(' https://crudcrud.com/api/3bad26852b6f47cebae091c8e1fe9068/users',state.form)
      console.log(data)
      state.users.push(data)
      state.form={}
      isModalOpen.value=false
    }
    async function destroy(id)
    {
      state.users=state.users.filter(user=>user._id !==id)
      await axios.delete(`https://crudcrud.com/api/3bad26852b6f47cebae091c8e1fe9068/users/${id}`)
    }
  async function next() {
    const {data} = await axios.get("https://reqres.in/api/users?page=2")
    state.users = data
  }

  async function prev() {
    const {data} = await axios.get('https://reqres.in/api/users?page=1')
    state.users = data
  }
  function close(){
    isModalOpen.value=false
  }

  return {state,next,prev,isModalOpen,close,submit,destroy}
}
}
</script>