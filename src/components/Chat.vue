<script setup>
import { useSocketStore } from '../stores/socket';
import { useMessageStore } from '../stores/messageStore';
import { useUserStore } from '../stores/user';
import { ref, watchEffect } from 'vue';
import { encryptMessage } from '../utils/crypto'
import AppInput from './AppInput.vue';
import Message from './Message.vue';
import ChatHeader from './ChatHeader.vue';

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

  encryptMessage(message.content, message.sender)
    .then((encryptedMessage) => {
      socket.sendMessage({target: message.target, message: encryptedMessage})
      messageStore.addMessage(message)
    })
}

watchEffect(() => {
  user.value = props.currentConversation?.user
  messages.value = props.currentConversation?.messages
})
</script>

<template>
  <section class="w-full h-full flex flex-col">
    <ChatHeader
      v-if="user"
      :user="user"
      class="flex items-center gap-3 bg-[#202c33] py-3 px-4"
    />
    <div class="h-full w-full relative">
      <div class="messages absolute w-full h-full flex flex-col px-16 py-4 overflow-y-scroll scrollbar scroll-py-4">
        <div class="flex flex-col mt-auto">
          <Message
            v-for="(message, index) in messages"
            :key="index"
            class="bg-[#17574b] text-white w-max py-1 px-3 my-2 rounded-lg"
            :class="message.phone === myself.phone ? 'self-end' : 'self-start'"
            :message="message"
          >
          </Message>
        </div>
      </div>
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
