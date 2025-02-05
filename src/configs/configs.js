const dev = {
  PATHWEBAPP: '/brainrot/',
  GEMINI_API_KEY: 'AIzaSyAJn7k9vdsjb3V38wkh3V6Xg2wQA2M8vnk',
}
const prod = {
  PATHWEBAPP: '/brainrot/',
  GEMINI_API_KEY: 'AIzaSyAJn7k9vdsjb3V38wkh3V6Xg2wQA2M8vnk',
}

const configs = process.env.NODE_ENV === 'production' ? prod : dev

export default configs
