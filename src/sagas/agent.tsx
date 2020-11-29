function handleResponse (response) {
  if (response.status === 204) {
    return response.text().then((text) => {
      return { headers: response.headers, data: text }
    })
  }
  if (response.status === 302) {
    return response.json().then((json) => {
      return { headers: response.headers, data: json }
    })
  }
  const contentType = response.headers.get('content-type')
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json().then((json) => {
      if (!response.ok) {
        const error = Object.assign({}, json, {
          status: response.status,
          message: response.statusText
        })
        return Promise.reject(error)
      }
      return { headers: response.headers, data: json }
    })
  }

  return response.text().then((text) => {
    if (!response.ok) {
      const error = Object.assign({}, {
        status: response.status,
        message: response.statusText,
        data: text
      })
      return Promise.reject(error)
    }
    return { headers: response.headers, data: text }
  })
}

function handleResponsenonJson (response) {
  return response.text()
    .then((text) => {
      if (!response.ok) {
        let error = Object.assign({}, {
          status: response.status,
          message: response.statusText
        })
        const contentType = response.headers.get('content-type')
        if (contentType && contentType.indexOf('application/json') !== -1) {
          error = { ...error, text }
        }
        return Promise.reject(error)
      }
      return { headers: response.headers, data: text }
    })
}

export const requests = {
  del: (url, options) => {
    return fetch(`${url}`, { method: 'DELETE', ...options }).then(handleResponse)
  },
  get: (url: String, options) => fetch(`${url}`, { method: 'GET', ...options }).then(handleResponse),
  put: (url: String, options, body) => {
    return fetch(`${url}`, { method: 'PUT', ...options, body: JSON.stringify(body) }).then(handleResponse)
  },
  putprops: (url: String, options) => {
    return fetch(`${url}`, { method: 'PUT', ...options }).then(handleResponsenonJson)
  },
  post: (url: String, options, body) => {
    return fetch(`${url}`, { method: 'POST', ...options, body: JSON.stringify(body) }).then(handleResponse)
  },
  postprops: (url: String, options) => {
    return fetch(`${url}`, { method: 'POST', ...options }).then(handleResponse)
  }
}
