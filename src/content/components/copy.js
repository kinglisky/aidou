const HIDDEN_INPUT = document.createElement('textarea')
HIDDEN_INPUT.style.position = 'fixed'
HIDDEN_INPUT.style.left = '-1000px'
document.body.appendChild(HIDDEN_INPUT)

export default function copy (v) {
  if (!HIDDEN_INPUT || !HIDDEN_INPUT.select) return
  HIDDEN_INPUT.value = v
  HIDDEN_INPUT.focus()
  HIDDEN_INPUT.select()
  try {
    document.execCommand('copy')
    window.alert('复制成功 ~')
  } catch (e) {
    console.log(e)
  }
  HIDDEN_INPUT.blur()
  HIDDEN_INPUT.value = ''
}
