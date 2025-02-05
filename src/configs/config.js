const dev = {
  PATHWEBAPP: '/brainrot/',
}
const prod = {
  PATHWEBAPP: '/brainrot/',
}

const configs = process.env.NODE_ENV === 'production' ? prod : dev

export default configs
