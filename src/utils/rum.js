import { init as initApm } from '@elastic/apm-rum'

const apm = initApm({
  // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
  serviceName: 'docudio-' + process.env.REACT_APP_ENVIRONMENT,

  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: process.env.REACT_APP_ENVIRONMENT === 'prod'
    ? 'https://docudio.com'
    : 'https://docudio-dev.com',

  // Set service version (required for sourcemap feature)
  serviceVersion: '0.1.0'
})

export default apm
