import { setSuccess, setWarning, setCustom, setError } from 'functions/setReply'
import config from 'config'

export function checkPermission(permissionName, lookFor, permissions) {
  try {

    if (permissions.hasOwnProperty(permissionName)) {
      if (permissions[permissionName].includes(lookFor)) {
        return setSuccess()
      }
    }

    return setCustom('nopermission', 'You don\'t have access')

  } catch (error) {
    setError(error)
  }
}
