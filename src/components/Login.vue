<script setup>
import { ref } from "vue";

const qrCodeScreen = ref(false)
const user = ref({
  phone: '',
  password: '',
  token2fa: ''
})

const emit = defineEmits(['changeToSignUp'])

const onClickToLogin = () => {
  fetch('http://localhost:4000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user.value)
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error('Login Failed')
    }

    return res.json()
  })
  .then((data) => {
    localStorage.setItem('token', data.token);
    window.location.reload();
  })
  .catch((error) => {
    console.error('Error:', error);
  })
}

const changeToSignUp = () => {
  emit('changeToSignUp')
}

const changeToQrCodeScreen = () => {
  qrCodeScreen.value = true
}
</script>

<template>
  <form
    v-if="!qrCodeScreen"
    type="submit"
    @submit.prevent="changeToQrCodeScreen()"
    class="bg-white text-black flex flex-col justify-center items-center text-center p-8 gap-5 rounded-md left
  ">
    Sign in to ToyWhats
    <div class="flex flex-col items-start gap-2">
      <label for="login">Login</label>
      <input type="text" id="login" v-model="user.phone" placeholder="Insert your login"
        class="border h-8 py-2 px-3 rounded-sm focus:outline-none placeholder:text-xs">
    </div>
    <div class="flex flex-col items-start gap-2">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="user.password" placeholder="Insert your password"
        class="border h-8 py-2 px-3 rounded-sm focus:outline-none placeholder:text-xs">
    </div>
    <p @click="changeToSignUp()" class="text-xs text-blue-500 cursor-pointer">
      New to ToyWhats? Create an account
    </p>
    <button type="submit" class="bg-[#17574b] text-white py-1 px-2 rounded-sm border-none">
      Next
    </button>
  </form>
  <form
    v-else
    @submit.prevent="onClickToLogin()"
    class="bg-white text-black flex flex-col justify-center items-center text-center p-8 gap-5 rounded-md left"
  >
    <p>2 Factor Authentication</p>
    <p>Open your authentication app and enter the code</p>
    <input type="text" id="token2fa" v-model="user.token2fa"
        class="border h-8 py-2 px-3 rounded-sm focus:outline-none placeholder:text-xs">
    <button type="submit" class="bg-[#17574b] text-white py-1 px-2 rounded-sm border-none">
      Login
    </button>
  </form>
</template>