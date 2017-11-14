interface Params {
  query: string,
  st: number,
  start: number,
  xml_len: number
}

export function serialize(params: Params): string {
  return Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
}

