const dev = {
  PATHWEBAPP: '/brainrot/',
  SERVURL: 'http://localhost:3000',
  GEMINI_API_KEY: 'AIzaSyAJn7k9vdsjb3V38wkh3V6Xg2wQA2M8vnk',
  PLAYHT_USER_ID: 'Tq3TjHcoUffrMjwDgnWwqGBEP542',
  PLAYHT_SECRET_KEY: 'b126bfe3cde74a5bb960b62c50a33d81',
}
const prod = {
  PATHWEBAPP: '/brainrot/',
  SERVURL: 'http://localhost:3000',
  GEMINI_API_KEY: 'AIzaSyAJn7k9vdsjb3V38wkh3V6Xg2wQA2M8vnk',
  PLAYHT_USER_ID: 'Tq3TjHcoUffrMjwDgnWwqGBEP542',
  PLAYHT_SECRET_KEY: 'b126bfe3cde74a5bb960b62c50a33d81',
}

const configs = process.env.NODE_ENV === 'production' ? prod : dev

export default configs
