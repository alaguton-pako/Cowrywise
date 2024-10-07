<script setup>
import CardLoader from '@/components/CardLoader.vue'
import { ref, onMounted, watch } from 'vue'
import Request from '@/services/Request'
import QuoteComponent from '@/components/QuoteComponent.vue'
import ImageModal from '@/components/ImageModal.vue'

const loading = ref(false)
const payLoad = ref([])
const error = ref(null)
const searchQuery = ref('')
const searchSuccessful = ref(false)
let timeoutId = null

const modalVisible = ref(false)
const selectedImage = ref({})

const openModal = (image) => {
  selectedImage.value = image
  modalVisible.value = true
  console.log(selectedImage.value)
}

const searchPhotos = async (query = '') => {
  try {
    loading.value = true
    error.value = null
    const { status, data } = await Request(
      'get',
      `search/photos?client_id=_ofo5FiRrfT2-hXJ0OkI_qd_eVTfYTvBiq3kp3bClCk&query=${query}&per_page=8`
    )

    if (status === 200 && data.results.length > 0) {
      payLoad.value = data.results
      searchSuccessful.value = true
    } else {
      error.value = 'No results found for your query.'
      searchSuccessful.value = false
    }
  } catch (err) {
    error.value = 'An error occurred while fetching data.'
    console.log(err)
    searchSuccessful.value = false
  } finally {
    loading.value = false
  }
}

const submitSearch = () => {
  if (searchQuery.value) {
    searchPhotos(searchQuery.value)
  }
}

const fetchRandomPhotos = async () => {
  try {
    loading.value = true
    error.value = null
    const { status, data } = await Request(
      'get',
      `photos/random?client_id=_ofo5FiRrfT2-hXJ0OkI_qd_eVTfYTvBiq3kp3bClCk&count=8`
    )

    if (status === 200) {
      payLoad.value = data
    } else if (status === 403) {
      error.value = 'Rate limit exceeded. Please try again later.'
    }
  } catch (err) {
    console.error(err)
    error.value = 'An error occurred while fetching data.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchRandomPhotos()
})

watch(searchQuery, (newQuery) => {
  clearTimeout(timeoutId)
  if (!newQuery) {
    fetchRandomPhotos()
    return
  }
  timeoutId = setTimeout(() => {
    searchPhotos(newQuery)
  }, 2000)
})
</script>

<template>
  <main>
    <div class="h-[20rem] w-full bg-[#dde3ea] flex items-center justify-center">
      <div class="w-4/5">
        <div v-if="searchQuery">
          <QuoteComponent
            :word="searchQuery"
            :loading="loading"
            :searchSuccessful="searchSuccessful"
            v-if="loading || searchSuccessful"
          />
        </div>
        <form @submit.prevent="submitSearch" v-if="!searchSuccessful && !loading">
          <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only"
            >Search</label
          >
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              v-model="searchQuery"
              class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-gray-200 focus:border-gray-300 placeholder-semi-bold"
              placeholder="Search for photo"
              required
            />
          </div>
        </form>
      </div>
    </div>

    <div class="mt-[-5rem]">
      <div class="max-w-[70%] mx-auto">
        <div v-if="loading">
          <CardLoader />
        </div>
        <div v-else-if="error">
          {{ error }}
        </div>
        <div v-else>
          <div class="p-2 grid col-span-12 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-0">
            <div v-for="(image, index) in payLoad" :key="index">
              <div
                class="rounded-lg overflow-hidden mb-0 relative cursor-pointer"
                :class="{
                  'h-72': index % 3 === 0,
                  'h-96': index % 3 === 1,
                  'h-80': index % 3 === 2
                }"
                @click="openModal(image)"
              >
                <img
                  :src="image.urls.regular"
                  :alt="image.alt_description"
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
                <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 class="font-bold text-sm">
                    {{ image.user.first_name }} {{ image.user.last_name }}
                  </h3>
                  <p class="text-xs">
                    {{ image.location ? image.location.name : 'Location not available' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ImageModal
      v-if="modalVisible"
      :imageDetails="selectedImage"
      :showModal="modalVisible"
      @close="modalVisible = false"
    />
  </main>
</template>

<style scoped>
.placeholder-semi-bold::placeholder {
  font-weight: 500;
  color: black;
}
</style>
