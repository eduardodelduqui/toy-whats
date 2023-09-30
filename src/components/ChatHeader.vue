<script setup>

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

</script>

<template>
    <header >
      <div class="h-10 w-10 bg-slate-300 rounded-full"></div>
      <div class="text-white text-base">
        {{ user?.phone }}
      </div>
    </header>
</template>