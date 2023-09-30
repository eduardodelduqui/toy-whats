<script setup>
  import { ref } from 'vue'
  import HomePage from './views/HomePage.vue';
  import AuthenticationPage from './views/AuthenticationPage.vue';
  import { useSocketStore } from './stores/socket'
  import { useMessageStore } from './stores/messageStore';
  import { decryptMessage } from './utils/crypto'
  import { useUserStore } from './stores/user'

  let authenticated = ref(false)
  const socket = useSocketStore()
  const messageStore = useMessageStore()
  const userStore = useUserStore()
  socket.connect()

  socket.socket.on('user-info', (userInfo) => {
    userStore.setUser(userInfo)
  })

  socket.socket.on('message', async (message) => {
    decryptMessage(message.content, message.sender)
      .then((decryptedMessage) => {
        message.content = decryptedMessage
        messageStore.addMessage(message)
      })
  });

  socket.socket.on('initial-messages', async (messages) => {
    messages.forEach(async (message) => {
      decryptMessage(message.content, message.sender)
        .then((decryptedMessage) => {
          message.content = decryptedMessage
          messageStore.addMessage(message)
        })
    })
  });
  
  socket.socket.on('connect', () => {
    authenticated.value = true;
  });
</script>

<template>
  <HomePage v-if="authenticated"/>
  <AuthenticationPage v-else/>
</template>

<style scoped>
</style>
