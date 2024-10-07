<template>
  <div class="p-2 grid col-span-12 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-0">
    <div v-for="index in 6" :key="index">
      <div
        class="rounded-lg bg-gray-400 shadow-md overflow-hidden mb-0 relative animate-pulse"
        :class="{
          'h-72': index % 3 === 0,
          'h-96': index % 3 === 1,
          'h-80': index % 3 === 2
        }"
      >
        <div class="absolute bottom-0 left-0 right-0 p-4 text-white animate-puls">
          <h3 class="font-bold text-md text-gray-300 bg-gray-300 mb-1 h-3 w-2/5"></h3>
          <p class="text-sm text-gray-300 bg-gray-300 h-3 w-2/5"></p>
        </div>
      </div>
    </div>
  </div>
</template>
