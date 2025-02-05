<template>
  <div>
    <div>
      <h1>Brainrot Content Generator</h1>
      <p>You will lose your brain cells</p>
    </div>

    <transition name="fade-left-to-right" @after-leave="afterFormLeave">
      <v-card class="generate-form mt-5 pa-5" v-if="showGenerateForm">
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
    </transition>

    <transition
      name="fade-right-to-left"
      @after-leave="afterGeneratedContentLeave"
    >
      <v-card class="generated-form mt-5 pa-5" v-if="showGeneratedContent">
        <v-card-content>
          <v-textarea v-model="apiData" variant="outlined"> </v-textarea>
        </v-card-content>
        <v-btn color="primary" variant="outlined" @click="resetForm"
          >Generate another one</v-btn
        >
      </v-card>
    </transition>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import axios_instance from '@/services/axiosApi'
  import { useValidationRules } from '@/composables/useValidationRules'

  //form data
  const wdyw = ref('123123')
  const bgm = ref('123123')
  const duration = ref(12)
  const { durationRules, wdywRules, bgmRules } = useValidationRules()
  const generateContentForm = ref(null)

  //api
  const apiData = ref('')
  const isFetching = ref(false)
  const showGenerateForm = ref(true)
  const showGeneratedContent = ref(false)

  const generateContent = async () => {
    const valid = await generateContentForm.value.validate()

    if (valid.valid == true) {
      isFetching.value = true
      const response = await axios_instance.api.get(
        'https://dummyjson.com/test',
      )
      apiData.value = JSON.stringify(response.data)
      isFetching.value = false
      showGenerateForm.value = false
    }
  }

  const resetForm = () => {
    // wdyw.value = ''
    // bgm.value = ''
    // duration.value = null
    apiData.value = ''
    showGeneratedContent.value = false
  }

  const afterFormLeave = () => {
    showGeneratedContent.value = true
  }

  const afterGeneratedContentLeave = () => {
    showGenerateForm.value = true
  }
</script>

<style scoped>
  .fade-right-to-left-enter-active,
  .fade-right-to-left-leave-active {
    transition:
      opacity 0.2s ease-in-out,
      transform 0.2s ease-in-out;
  }

  .fade-right-to-left-enter,
  .fade-right-to-left-leave-to {
    opacity: 0;
    transform: translateX(50px);
  }

  .fade-left-to-right-enter-active,
  .fade-left-to-right-leave-active {
    transition:
      opacity 0.2s ease-in-out,
      transform 0.2s ease-in-out;
  }

  .fade-left-to-right-enter,
  .fade-left-to-right-leave-to {
    opacity: 0;
    transform: translateX(-50px);
  }
</style>
