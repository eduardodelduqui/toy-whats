<script setup>
import { ref } from "vue"

const signUpError = ref(false)
const qrCodeUrl = ref ('')
const user = ref({
  name: '',
  phone: '',
  password: ''
})

const emit = defineEmits(['changeToSignIn'])

const onClickToSignUp = () => {
  fetch('http://localhost:4000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user.value)
  })
    .then((res) => {
      if (!res.ok) {
        showSignUpError()
        throw new Error('Sign Up Failed')
      }

      return res.json()
    })
    .then((data) => {
      qrCodeUrl.value = data.dataUrl
      showSignUpSuccess()
    })
}

const changeToSignIn = () => {
  emit('changeToSignIn')
}

</script>

<template>
  <div
    v-if="qrCodeUrl"
    class="bg-white p-8 rounded-xl flex flex-col items-center max-w-sm"
  >
    <h2 class="text-[#2d333a] font-bold uppercase text-center">
      Autenticação em 2 fatores
    </h2>
    <p class="text-[#2d333a] text-center">O uso de autenticação em 2 fatores é obrigatório</p>
    <img class="w-60" :src="qrCodeUrl" alt="">
    <p class="text-[#2d333a] text-center">Aponte a sua câmera para o QR Code acima e escolha o seu aplicativo</p>
    <p @click="changeToSignIn()" class="text-xs mt-3 text-blue-500 cursor-pointer">
      Já registrou no seu aplicativo? Faça o login
    </p>
  </div>
  <form v-else type="submit" @submit.prevent="onClickToSignUp()" class="bg-white text-black flex flex-col justify-center
          items-center text-center absolute p-8 gap-5 rounded-md left">
    <transition name="fade">
      <div v-if="signUpError" class="bg-red-200 p-2 rounded-md">
        <p class="text-xs text-red-600">Erro ao criar a conta</p>
        <p class="text-xs text-red-600">Preencha os campos corretamente</p>
      </div>
    </transition>
    Create a new account
    <div class="flex flex-col items-start gap-2">
      <label for="name">Name</label>
      <input type="text" id="name" v-model="user.name" placeholder="Insert your name"
        class="border h-8 py-2 px-3 rounded-sm focus:outline-none placeholder:text-xs">
    </div>
    <div class="flex flex-col items-start gap-2">
      <label for="name">Phone</label>
      <p class="text-xs text-red-400">This will be your login</p>
      <input type="text" id="phone" v-model="user.phone" placeholder="Insert your phone"
        class="border h-8 py-2 px-3 rounded-sm focus:outline-none placeholder:text-xs">
    </div>
    <div class="flex flex-col items-start gap-2">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="user.password" placeholder="Insert your password"
        class="border h-8 py-2 px-3 rounded-sm focus:outline-none placeholder:text-xs">
    </div>
    <p @click="changeToSignIn()" class="text-xs text-blue-500 cursor-pointer">
      Already have an account? Click here
    </p>
    <button type="submit" class="bg-[#17574b] text-white py-1 px-2 rounded-sm border-none">
      Sign up
    </button>
  </form>
</template>