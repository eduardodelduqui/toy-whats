<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps(['message'])
const lastMessage = ref('')

const messages = props.message.messages

watchEffect(() => {
    lastMessage.value = messages[messages.length - 1];
  });
</script>

<template>
    <div class="flex items-center gap-4 cursor-pointer hover:bg-[#202c33]">
        <div class="w-12 h-12 bg-slate-300 rounded-full"></div>
        <div class="flex-grow border-t border-[#202c33] py-3">
            <p class="text-white">{{ message.user.phone }}</p>
            <p class="text-white">{{ lastMessage.content }}</p>
        </div>
    </div>
</template>