import { setScuess, setWarning, setError } from 'functions/setReply'
import { fetchOptions, baseFetch } from "functions/baseFetch"
import config from 'config'

async function changeUserPassword(newPassword) {
  try {
    const url = config.api.urls.user.changePassword
    console.log(url)
    const data = { token, newPassword }

    const accepts = fetchOptions.headers.accepts.json

    const getChangePasswordResult = await baseFetch('POST', url, data, accepts)

    return getChangePasswordResult
  } catch (error) {
    return setError(error)
  }
}

export function prepareTokenForChangeUserPassword(token, showCurrentPassword) {
  return config.urls.user.changePassword.path + '/' + token + showCurrentPassword
}

export default changeUserPassword