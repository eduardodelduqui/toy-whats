<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  message: {
    type: Object,
    required: true
  }
})

const message = ref(props.message);

const formattedTimestamp = computed(() => {
  const timestampDate = new Date(message.value.timestamp);
  const horas = timestampDate.getHours().toString().padStart(2, '0');
  const minutos = timestampDate.getMinutes().toString().padStart(2, '0');
  return `${horas}:${minutos}`;
});
</script>

<template>
  <div class="message-item flex gap-1 items-baseline text-[#E9EDEF]">
    <div class="message-content">
      {{ message.content }}
    </div>
    <div class="message-timestamp text-[10px] place-flex-end">
      {{ formattedTimestamp }}
    </div>
  </div>
</template>