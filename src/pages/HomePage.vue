<template>
  <div>
    <div>
      <h1>Brainrot Content Generator</h1>
      <p>You will lose your brain cells</p>
    </div>
    <v-card class="mt-5 pa-5">
      <v-card-content>
        <v-form @submit.prevent="generateContent" ref="generateContentForm">
          <v-textarea
            class="ma-1"
            v-model="wdyw"
            label="What do you want?"
            variant="outlined"
            :maxlength="150"
            :hint="wdyw.length + ' / 150'"
            :rules="wdywRules"
          ></v-textarea>
          <v-textarea
            class="ma-1"
            v-model="bgm"
            label="How about the background music?"
            variant="outlined"
            :maxlength="50"
            :hint="bgm.length + ' / 50'"
            :rules="bgmRules"
          ></v-textarea>
          <v-text-field
            class="ma-1"
            v-model="duration"
            label="How long?"
            variant="outlined"
            type="number"
            suffix="seconds"
            :rules="durationRules"
          >
          </v-text-field>
          <v-btn
            class="ma-1"
            type="submit"
            color="primary"
            :loading="isFetching"
            variant="outlined"
            >Generate</v-btn
          >
        </v-form></v-card-content
      >
    </v-card>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import axios_instance from '@/services/axiosApi'
  import { useValidationRules } from '@/composables/useValidationRules'

  //form data
  const wdyw = ref('')
  const bgm = ref('')
  const duration = ref(null)
  const { durationRules, wdywRules, bgmRules } = useValidationRules()
  const generateContentForm = ref(null)

  //api
  const apiData = ref('')
  const isFetching = ref(false)

  const generateContent = async () => {
    const valid = await generateContentForm.value.validate()

    if (valid.valid == true) {
      isFetching.value = true
      const response = await axios_instance.api.get(
        'https://dummyjson.com/test',
      )
      apiData.value = JSON.stringify(response.data)
      isFetching.value = false
    }
  }
</script>
