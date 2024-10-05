<template>
  <div class="flex items-center gap-3">
    <p v-if="loading" class="font-semibold text-3xl text-[#253b59]">Searching for</p>
    <p v-else class="font-semibold text-3xl text-[#253b59]">Search Results for </p>
    <div class="flex items-start">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        class="w-6 h-6 mr-2 fill-gray-400"
      >
        <path
          d="M0 216C0 149.7 53.7 96 120 96l8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-8 0c-30.9 0-56 25.1-56 56l0 8 64 0c35.3 0 64 28.7 64 64l0 64c0 35.3-28.7 64-64 64l-64 0c-35.3 0-64-28.7-64-64l0-32 0-32 0-72zm256 0c0-66.3 53.7-120 120-120l8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-8 0c-30.9 0-56 25.1-56 56l0 8 64 0c35.3 0 64 28.7 64 64l0 64c0 35.3-28.7 64-64 64l-64 0c-35.3 0-64-28.7-64-64l0-32 0-32 0-72z"
        />
      </svg>
      <p class="font-bold text-3xl mx-2 text-gray-400 capitalize">{{ word }}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        class="w-6 h-6 ml-2 fill-gray-400"
      >
        <path
          d="M448 296c0 66.3-53.7 120-120 120l-8 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l8 0c30.9 0 56-25.1 56-56l0-8-64 0c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l64 0c35.3 0 64 28.7 64 64l0 32 0 32 0 72zm-256 0c0 66.3-53.7 120-120 120l-8 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l8 0c30.9 0 56-25.1 56-56l0-8-64 0c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l64 0c35.3 0 64 28.7 64 64l0 32 0 32 0 72z"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  word: {
    type: String,
    required: true
  },
  loading: {
    type: Boolean,
    required: true
  }
})
</script>

<style scoped>
.capitalize {
  text-transform: capitalize;
}
.fill-gray-400 {
  fill: #9ca3af; /* Tailwind gray-400 */
}
</style>
