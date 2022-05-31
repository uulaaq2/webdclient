export function checkMenuPermission(name, permissions) {
  const pieces = name.split('/')

  for (let i = 0; i < pieces.length - 1; i++) {   
    if (permissions.hasOwnProperty(pieces[i])) {
      permissions = permissions[pieces[i]]
      console.log(permissions)
    }
  }
  if (permissions.hasOwnProperty(pieces[pieces.length - 1])) {
    console.log('exists', permissions)
    return true
  }

  return false
}

export function checkAccessPermission(name, permissions) {
  const pieces = name.split('/')
  let location = null
  for (let i = 0; i < pieces.length - 1; i++) {
      if (permissions.hasOwnProperty(pieces[i])) {
        location = permissions[pieces[i]]
      }
  }

  if (location) {
    if (location.hasOwnProperty(pieces[pieces.length - 1]) && pieces[pieces.length - 1] === true ) {
      return true
    }
  }

  return false
}