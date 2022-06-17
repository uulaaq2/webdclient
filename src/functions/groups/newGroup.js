import { setSuccess, setWarning, setError } from "functions/setReply"
import { fetchOptions, baseFetch } from "functions/baseFetch"
import config from 'config'

async function getGroups(name) {  
  try {
    const url = config.api.urls.groups.new
    const data = {name: name}
    const accepts = fetchOptions.headers.accepts.json

    const result = await baseFetch('POST', url, data, accepts)
    
    return result
  } catch (error) {
    return setError(error)
  }
}

export default getGroups