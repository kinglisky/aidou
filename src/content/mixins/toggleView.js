import crun from '@/common/crun'

export default {
  created () {
    crun.$on('show-app', this.toggleView)
  },

  methods: {
    toggleView (visible) {
      window.parent.postMessage({
        id: 'chrome-extension-aidou',
        value: visible
      }, '*')
    }
  }
}
