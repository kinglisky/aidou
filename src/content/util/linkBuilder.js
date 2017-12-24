export default {
  url: url => url,
  ubb: url => `[IMG]${url}[/IMG]`,
  img: url => `<img src="${url}"/>`,
  makrdown: url => `![](${url})`
}
