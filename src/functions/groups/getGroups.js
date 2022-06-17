import { setSuccess, setWarning, setError } from "functions/setReply"
import { fetchOptions, baseFetch } from "functions/baseFetch"
import config from 'config'

async function getGroups(name = '', orderByFields = '', order = 'ASC') {  
  try {
    const url = config.api.urls.groups.get
    const data = {name: name, orderByFields: orderByFields, order: order}
    const accepts = fetchOptions.headers.accepts.json

    const getResult = await baseFetch('POST', url, data, accepts)
    
    return getResult
  } catch (error) {
    return setError(error)
  }
}

export default getGroups