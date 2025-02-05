<template>
  <div>
    <h1>Home Page</h1>
    <p>Welcome to the Home Page</p>
  </div>
  <router-link to="/about"><v-btn>to about page</v-btn></router-link>
  <v-card class="mt-5">
    <v-card-title> Api Testing </v-card-title>
    <v-card-text>
      <v-row>
        <v-textarea v-model="apiData" label="Api Data" outlined></v-textarea>
      </v-row>
      <v-row
        ><div>
          <v-btn
            @click="getApiData"
            :loading="isFetching"
            :disabled="isFetching"
            >Get Data</v-btn
          >
        </div></v-row
      >
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'
  import axios_instance from '@/services/axiosApi'

  const apiData = ref('')
  const isFetching = ref(false)

  const getApiData = async () => {
    isFetching.value = true
    const response = await axios_instance.api.get('https://dummyjson.com/test')
    apiData.value = JSON.stringify(response.data)
    isFetching.value = false
  }
</script>
