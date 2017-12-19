import crun from '@/common/crun'

export default {
  created () {
    crun.$on('show-app', this.toggleView)
  },

  methods: {
    toggleView (visible) {
      crun.$emit('sync-visible', visible)
      window.parent.postMessage({
        id: 'chrome-extension-aidou',
        value: visible
      }, '*')
    }
  }
}
