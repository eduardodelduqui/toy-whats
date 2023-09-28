<script setup>
import AppInput from './AppInput.vue';
import { useSocketStore } from '../stores/socket';
import { useMessageStore } from '../stores/messageStore';
import { useUserStore } from '../stores/user';
import { ref, watchEffect } from 'vue';
import { encryptMessage } from '../utils/crypto'
import Message from './Message.vue';

const props = defineProps(['currentConversation', 'isNewConversation'])

const socket = useSocketStore()
const messageStore = useMessageStore()
const userStore = useUserStore()

const newTarget = ref('')
const user = ref('')
const messages = ref('')
const myself = userStore.user


const sendMessage = async (content) => {
  const message = {
    sender: userStore.user,
    target: user.value?.phone || newTarget.value,
    timestamp: Date.now(),
    content
  }

  const encryptedMessage = await encryptMessage(message.content, message.sender);
  socket.sendMessage({target: message.target, message: encryptedMessage})
  messageStore.addMessage(message)
}

watchEffect(() => {
  user.value = props.currentConversation?.user
  messages.value = props.currentConversation?.messages
})
</script>

<template>
  <section class="w-full h-full flex flex-col">
    <header class="flex items-center gap-3 bg-[#202c33] py-3 px-4">
      <!-- Transformar em componente -->
      <div class="h-10 w-10 bg-slate-300 rounded-full"></div>
      <div class="text-white text-base">
        {{ user?.phone }}
      </div>
    </header>
    <div class="messages h-full w-full grow flex flex-col p-16">
      <Message
        v-for="(message, index) in messages"
        :key="index"
        class="bg-[#17574b] text-white w-max py-1 px-3 my-2 rounded-lg"
        :class="message.phone === myself.phone ? 'self-end' : 'self-start'"
        :message="message"
      >
      </Message>
    </div>
    <div class="py-3 px-16 bg-[#202c33]">
      <input
        v-if="isNewConversation"
        type="text"
        class="mb-2 text-gray-900"
        v-model="newTarget"
      >
      <div class="flex h-10 bg-white rounded-lg items-center py-2 px-4">
        <AppInput
          class="w-full h-full text-gray-900 focus:outline-none"
          @submit-input="sendMessage"
        />
        <img src="../assets/send-icon.svg" class="w-8 h-8" alt="">
      </div>
    </div>
  </section>
</template>