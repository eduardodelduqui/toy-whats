<script setup>
import { ref } from "vue";
import Login from '../components/Login.vue'
import SignUp from '../components/SignUp.vue'

const isSignUp = ref(false)

const handleChangeToSignUp = () => {
  isSignUp.value = true
}

const handleChangeToSignIn = () => {
  isSignUp.value = false
}

</script>

<template>
  <div class="flex flex-col h-full justify-center items-center">
    <SignUp
      v-if="isSignUp"
      @change-to-sign-in="handleChangeToSignIn"
    />
    <Login
      v-else
      @change-to-sign-up="handleChangeToSignUp"
    />
  </div>
    <!-- <form
    v-if="isSignUp"
    type="submit"
    @submit.prevent="onClickToSignUp()"
    class="bg-white text-black flex flex-col justify-center
      items-center text-center absolute p-8 gap-5 rounded-md left
      left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
  >
    Crie sua conta
    <div
        v-if="signUpSuccess"
        class="bg-green-200 p-2 rounded-md"
      >
        <p class="text-xs text-green-600">Cadastro realizado com sucesso.</p>
        <p class="text-xs text-green-600">Prossiga com o login</p>
      </div>
    <div class="flex flex-col items-start gap-2">
      <label for="name">Nome</label>
      <input
        type="text"
        id="name"
        v-model="signUpForm.name"
        placeholder="Insira o seu nome"
        class="border h-8 py-2 px-3 rounded-sm focus:outline-none placeholder:text-xs"
      >
    </div>
    <div class="flex flex-col items-start gap-2">
      <label for="name">Telefone</label>
      <p class="text-xs text-red-400">Esse será o seu login</p>
      <input
        type="text"
        id="phone"
        v-model="signUpForm.phone"
        placeholder="Insira o seu telefone"
        class="border h-8 py-2 px-3 rounded-sm focus:outline-none placeholder:text-xs"
      >
    </div>
    <div class="flex flex-col items-start gap-2">
      <label for="password">Senha</label>
      <input
        type="password"
        id="password"
        v-model="signUpForm.password"
        placeholder="Insira sua senha"
        class="border h-8 py-2 px-3 rounded-sm focus:outline-none placeholder:text-xs"
      >
    </div>
    <p
      @click="changeToSignIn()"
      class="text-xs text-blue-500 cursor-pointer"
    >
      Já tem uma conta? Clique aqui
    </p>
    <button
      type="submit"
      class="bg-[#17574b] text-white py-1 px-2 rounded-sm border-none"
    >
      Criar
    </button>
  </form>
  <form
    v-else
    type="submit"
    @submit.prevent="onClickToLogin()"
    class="bg-white text-black flex flex-col justify-center
      items-center text-center absolute p-8 gap-5 rounded-md left
      left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
  >
    Faça o login
    <transition name="fade">
      <div
        v-if="signUpError"
        class="bg-red-200 p-2 rounded-md"
      >
        <p class="text-xs text-red-600">Erro ao criar a conta</p>
        <p class="text-xs text-red-600">Preencha os campos corretamente</p>
      </div>
    </transition> 
    <div class="flex flex-col items-start gap-2">
      <label for="login">Login</label>
      <input
        type="text"
        id="login"
        v-model="loginForm.phone"
        placeholder="Insira seu login"
        class="border h-8 py-2 px-3 rounded-sm focus:outline-none placeholder:text-xs"
      >
    </div>
    <div class="flex flex-col items-start gap-2">
      <label for="password">Senha</label>
      <input
        type="password"
        id="password"
        v-model="loginForm.password"
        placeholder="Insira sua senha"
        class="border h-8 py-2 px-3 rounded-sm focus:outline-none placeholder:text-xs"
      >
    </div>
    <p
      @click="changeToSignUp()"
      class="text-xs text-blue-500 cursor-pointer"
    >
      Ainda não tem uma conta? Clique aqui
    </p>
    <button
      type="submit"
      class="bg-[#17574b] text-white py-1 px-2 rounded-sm border-none"
    >
      Entrar
    </button>
  </form> -->
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>