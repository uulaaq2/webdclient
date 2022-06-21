import { setSuccess, setWarning, setCustom, setError } from 'functions/setReply'
import config from 'config'

export function checkMenuPermission(menuName, permissions) { 
  if (permissions.hasOwnProperty(menuName)) {
    return true
  }

  return false
}

export function checkPermission(permissionName, lookFor, permissions) {
  if (permissions.hasOwnProperty(permissionName)) {
    if (permissions[permissionName].includes(lookFor)) {
      return true
    }
  }

  return false
}