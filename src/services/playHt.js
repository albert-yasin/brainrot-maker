import axios_instance from './axiosApi'
import config from '@/configs/configs'

async function generateWebSocketCredentials() {
  try {
    const response = await axios_instance.api_app.post(
      '/api/playht/generateWebSocket',
    )

    return response.data
  } catch (error) {
    console.log(error)
  }
}

async function generateTTS(promptText, voiceUrl) {
  const PlayHtWebSocketCredentials = await generateWebSocketCredentials()
  const { websocket_urls } = PlayHtWebSocketCredentials
  const play3_0miniUrl = websocket_urls['Play3.0-mini']
  const playDialogUrl = websocket_urls['PlayDialog']
  const playDialogMultilingual = websocket_urls['PlayDialogMultilingual']

  const ws = new WebSocket(playDialogUrl)

  ws.onopen = () => {
    console.log('WebSocket connected!')
    const ttsCommand = {
      text: promptText,
      voice: voiceUrl,
      output_format: 'mp3',
      temperature: 0.7,
    }

    ws.send(JSON.stringify(ttsCommand))
  }

  let audioChunks = []

  ws.onmessage = (event) => {
    if (event.data instanceof Blob) {
      // Received binary audio data
      audioChunks.push(event.data)
    } else {
      // Received a text message
      const message = JSON.parse(event.data)
      if (message.type === 'end') {
        // End of audio stream, play the audio
        // If you specified a different output_format, you may need to adjust the audio player logic accordingly
        const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' })
        const audioUrl = URL.createObjectURL(audioBlob)
        const audio = new Audio(audioUrl)
        audio.play()

        // Clear the audio chunks for the next request
        audioChunks = []
      }
    }
  }

  ws.onerror = (error) => {
    console.error('WebSocket Error:', error)
  }

  ws.onclose = (event) => {
    console.log('WebSocket connection closed:', event.code, event.reason)
    // Implement reconnection logic if needed
  }
}

export default {
  generateWebSocketCredentials,
  generateTTS,
}
