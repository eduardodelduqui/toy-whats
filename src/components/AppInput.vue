<script setup>
import { ref } from 'vue';
let message = ref('')

const emit = defineEmits(['submitInput'])

const emitSubmitInput = () => {
  if (!message.value) {
    return
  }
  emit('submitInput', message.value)
  clearInput()
}

const clearInput = () => {
  message.value = ''
}

const handleKeyUpEvent = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    emitSubmitInput()
  }
}
</script>


<template>
  <input v-model="message" placeholder="Mensagem" @keyup.prevent="handleKeyUpEvent" type="text" />
</template>