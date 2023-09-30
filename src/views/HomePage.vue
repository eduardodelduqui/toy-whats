<script setup>
import Chat from '../components/Chat.vue';
import Card from '../components/Card.vue';
import { useMessageStore } from '../stores/messageStore';
import { ref } from 'vue';

const currentConversation = ref('')
const isNewConversation = ref(false)

const messageStore = useMessageStore()
const messages = messageStore.getAllMessages()

const selectConversation = (user) => {
  isNewConversation.value = false
  currentConversation.value = messageStore.getMessages(user)
}

const newConversation = () => {
  currentConversation.value = ''
  isNewConversation.value = true
}
</script>

<template>
  <main class="h-full bg-[#0c1317] overflow-hidden">
    <div class="w-full absolute top-5 max-h-[calc(100%-40px)] h-full">
      <div class="w-full h-full flex max-w-screen-2xl mx-auto bg-[#111b21]">
        <div class="w-full max-w-md border-r border-[#5f5f5f6b]">
          <div
            @click="newConversation()"
            class="flex items-center gap-4 p-4 text-white cursor-pointer bg-[#202c33]"
          >
            <div class="border w-8 h-8 rounded-full relative">
              <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">+</span>
            </div>
            <p class="flex-grow font-bold">Nova Conversa</p>
          </div>
          <div class="p-4">
            <Card
              v-for="message in messages"
              :key="message.user.phone"
              :message="message"
              @click="selectConversation(message.user)"
            />
          </div>
        </div>
        <div class="w-full">
          <Chat
            :is-new-conversation="isNewConversation"
            :current-conversation="currentConversation"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>