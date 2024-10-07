<template>
  <div
    v-if="showModal"
    class="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
  >
    <div class="relative w-[50%] h-[90vh] bg-white rounded-lg shadow">
      <button
        type="button"
        class="absolute top-0 right-[-5rem] transform translate-x-3 -translate-y-3 text-white hover:bg-gray-200 hover:text-gray-900 text-sm w-8 h-8 inline-flex justify-center items-center shadow-lg"
        @click="closeModal"
      >
        <svg
          class="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span class="sr-only">Close modal</span>
      </button>

      <!-- Modal content -->
      <div class="h-[70vh]">
        <div class="h-full w-full">
          <div class="w-full h-full">
            <img
              :src="imageDetails.urls.regular"
              :alt="imageDetails.alt || 'Image'"
              class="w-full h-full rounded-t-lg object-cover"
            />
          </div>
          <div class="p-4 bg-white">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ imageDetails.user.first_name }} {{ imageDetails.user.last_name }}
            </h3>
            <p class="text-sm text-gray-500">
              {{ imageDetails.location ? imageDetails.location.name : 'Location not available' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  imageDetails: {
    type: Object,
    required: true,
    default: () => ({
      title: '',
      url: '',
      description: '',
      alt: '',
      user: ''
    })
  },
  showModal: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>
