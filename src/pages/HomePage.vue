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
              label="What story do you want to write about?"
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
            <v-btn class="ma-1" type="submit" color="primary" variant="outlined"
              >Generate</v-btn
            >
            <v-btn
              color="primary"
              prepend-icon="mdi-volume-high"
              @click="generateTTS"
              >Generate TTS</v-btn
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
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="generatedData.title.data"
                variant="outlined"
                :label="
                  generatedData.title.data == null &&
                  generatedData.title.fetching == true
                    ? 'Generating ' + generatedData.title.label + '...'
                    : generatedData.title.label
                "
                :loading="generatedData.title.fetching == true"
                :disabled="generatedData.title.data == null"
                readonly
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="generatedData.caption.data"
                variant="outlined"
                :label="
                  generatedData.title.data == null &&
                  generatedData.caption.fetching == true
                    ? 'Generating ' + generatedData.caption.label + '...'
                    : generatedData.caption.label
                "
                :loading="generatedData.caption.fetching == true"
                :disabled="generatedData.caption.data == null"
                readonly
              >
              </v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="generatedData.script.data"
                variant="outlined"
                :label="
                  generatedData.title.data == null &&
                  generatedData.title.fetching == true
                    ? 'Generating ' + generatedData.script.label + '...'
                    : generatedData.script.label
                "
                :loading="generatedData.script.fetching == true"
                :disabled="generatedData.script.data == null"
                readonly
              >
              </v-textarea>
              <v-list
                class="align-left d-flex"
                v-for="script in JSON.parse(generatedData.script.data)"
                :key="script.timestamp"
              >
                <span>{{ script.timestamp }} - {{ script.narator }} </span>
              </v-list>
            </v-col>
          </v-row>
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
  import { GoogleGenerativeAI } from '@google/generative-ai'
  import configs from '@/configs/configs'
  import playHt from '@/services/playHt'
  import voicesEn from '@/assets/voices/voicesEn'

  //gen AI
  const genAI = new GoogleGenerativeAI(configs.GEMINI_API_KEY)
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  //form data
  const wdyw = ref('')
  const bgm = ref('')
  const duration = ref('')
  const { durationRules, wdywRules, bgmRules } = useValidationRules()
  const generateContentForm = ref(null)

  //api
  const generatedData = ref({
    title: {
      label: 'Title',
      data: null,
      fetching: false,
    },
    script: {
      label: 'Script',
      data: null,
      fetching: false,
    },
    caption: {
      label: 'Caption',
      data: null,
      fetching: false,
    },
  })

  //states
  const showGenerateForm = ref(true)
  const showGeneratedContent = ref(false)

  const generateContent = async () => {
    const valid = await generateContentForm.value.validate()

    if (valid.valid == true) {
      generatedData.value.title.fetching = true
      showGenerateForm.value = false
      const prompt = `In JSON data not wrapped with anything output generate me a content about  ${wdyw.value}, and fill these parameters title, script with only timestamp (minutes:seconds) and narator for ${duration.value} seconds, and caption`

      const result = await model.generateContent(prompt)
      //remove markdown code block from gemini response
      const formattedResponse = result.response
        .text()
        .replace('```json', '')
        .replace('```', '')
      //convert to JSON
      const generated = JSON.parse(formattedResponse)

      setTimeout(() => {
        generatedData.value.title.data = generated.title
        generatedData.value.title.fetching = false
        generatedData.value.caption.fetching = true
      }, 1000)

      setTimeout(() => {
        generatedData.value.caption.data = generated.caption
        generatedData.value.caption.fetching = false
        generatedData.value.script.fetching = true
      }, 2000)

      setTimeout(() => {
        generatedData.value.script.data = JSON.stringify(generated.script)
        generatedData.value.script.fetching = false
      }, 3000)
    }
  }

  const generateTTS = async () => {
    const voiceUrl = voicesEn['dylan'].url
    const generate = await playHt.generateTTS(
      'Hello my name is Albert',
      voiceUrl,
    )
  }

  const resetForm = () => {
    wdyw.value = ''
    bgm.value = ''
    duration.value = null
    generatedData.value.title.data = null
    generatedData.value.script.data = null
    generatedData.value.caption.data = null
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
