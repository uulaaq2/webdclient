import { setSuccess, setWarning, setError } from "functions/setReply"
import { fetchOptions, baseFetch } from "functions/baseFetch"
import config from 'config'
import { getLocalStorage } from 'functions/localStorage';

async function getUserWithToken() {  
  try {
    const url = config.api.urls.user.verifyToken
    const data = {}
    const accepts = fetchOptions.headers.accepts.json

    const getUserResult = await baseFetch('POST', url, data, accepts)
    
    return getUserResult
  } catch (error) {
    return setError(error)
  }
}

export default getUserWithToken