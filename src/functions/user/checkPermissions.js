export function checkMenuPermissions(name, permissions) {
  if (!permissions) return false
  if (permissions.hasOwnProperty('user')) {
    if (permissions.hasOwnProperty('globalAdmin')) {
      if (permissions.globalAdmin === true) {
        return true
      }
    }
  }

  const pieces = name.split('/')

  for (let i = 0; i < pieces.length -1; i++) {
      if (permissions.hasOwnProperty(pieces[i])) {
          permissions = permissions[pieces[i]]
      }
  }

  if (permissions) {
    if (permissions.hasOwnProperty(pieces[pieces.length - 1])) {
        return true
    }
  }

  return false
}

export function checkAccessPermission(name, permissions) {
  if (!permissions) return false
  if (permissions.hasOwnProperty('user')) {
    if (permissions.hasOwnProperty('globalAdmin')) {
      if (permissions.globalAdmin === true) {
        return true
      }
    }
  }
    
  const pieces = name.split('/')
  
  for (let i = 0; i < pieces.length -1; i++) {
      if (permissions.hasOwnProperty(pieces[i])) {
          permissions = permissions[pieces[i]]
      }
  }

  if (permissions) {
    if (permissions.hasOwnProperty(pieces[pieces.length - 1])) {
      if (permissions[pieces[pieces.length -1]] === true) {
        return true
      }
    }
  }

  return false
}