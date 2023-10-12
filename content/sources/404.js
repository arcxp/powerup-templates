const resolve = () => {
  const error = new Error()
  error.statusCode = 404
  throw error
}

export default { resolve }
