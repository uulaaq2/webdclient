import axios from 'axios'
import { setSuccess, setWarning, setError } from 'functions/setReply'
import { getLocalStorage } from 'functions/localStorage';

export const fetchOptions = {
  headers: {
    accepts: {
      json: {
        "Accept": "application/json",
        "Content-Type": "application/json"  
      }
    }
  }  
}

export async function baseFetch(method, url, data = {}, accepts = {}) {
  try {
    const headers = {    
      ...accepts,
      "Access-Control-Allow-Origin": "*"
    }

    data.token = getLocalStorage('token').value
    const site = getLocalStorage('site')
    if (site.status === 'ok') {
      data.site = getLocalStorage('site').value
    }

    console.log(data)

    const requestResult = await axios({ method, url, data, headers })

    return requestResult.data
  } catch (error) {
    return setError(error)
  }  
}