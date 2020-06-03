export function prefix(location, ...prefixes) {
  return prefixes.some(
    prefix => (
      location.href.indexOf(`${location.origin}/${prefix}`) !== -1
    )
  )
}

export function navbar(location) {
  return true
}

export function dog(location) {
  return prefix(location, 'dog')
}

export function cat(location) {
  return prefix(location, 'cat')
}
