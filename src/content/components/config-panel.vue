<template>
  <section class="cpt-config-panel">
    <ul class="config-panel" v-if="config">
      <li class="config-item">
        <span class="config-label">图床服务：</span>
        <div class="config-content">
          <label>
            <span>微博图床</span>
            <input type="radio" :value="PIC_BED.WEIBO" v-model="config.picBed">
          </label>
          <label>
            <span>SM 图床</span>
            <input type="radio" :value="PIC_BED.SM" v-model="config.picBed">
          </label>
        </div>
      </li>
      <li class="config-item">
        <span class="config-label">显示链接面板：</span>
        <div class="config-content">
          <label>
            <span>显示面板</span>
            <input type="checkbox" v-model="config.showFullLinks">
          </label>
        </div>
      </li>
      <li class="config-item">
        <span class="config-label">生成链接：（显示链接面板时无效）</span>
        <div class="config-content">
          <label v-for="link in LINK_OPTIONS" :key="link.name">
            <span>{{ link.name }}</span>
            <input type="radio"
              :value="link.value"
              :disabled="config.showFullLinks"
              v-model="config.copyLink">
          </label>
        </div>
      </li>
      <li class="config-item">
        <span class="config-label">快捷键设置：{{ shortcutInfo }}</span>
        <div class="config-content shortcut-config">
          <label v-for="kb in KB_KEYS" :key="kb.name">
            <span>{{ kb.name }}</span>
            <input type="checkbox" :value="kb.value"
              v-model="config.shortcut.specialKeys">
          </label>
          <span class="add-text">+</span>
          <input type="text"
            class="shortcut-key"
            v-model="config.shortcut.key"
            @keydown="setShortcutCode">
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import crun from '@/common/crun'

const PIC_BED = {
  SM: 'sm',
  WEIBO: 'weibo'
}

const LINK_OPTIONS = [
  {
    name: 'Markdown',
    value: 'markdown'
  },
  {
    name: '图片链接',
    value: 'url'
  },
  {
    name: 'UBB',
    value: 'ubb'
  },
  {
    name: 'IMG',
    value: 'img'
  }
]

const DEFAULT_SHORTCUT = {

}

const KB_KEYS = [
  {
    name: 'CMD/WIN',
    value: 'metaKey'
  },
  {
    name: 'CTRL',
    value: 'ctrlKey'
  },
  {
    name: 'OPT/ALT',
    value: 'altKey'
  },
  {
    name: 'SHIFT',
    value: 'shiftKey'
  }
]

const KB_KEYS_MAP = KB_KEYS.reduce((map, curr, i) => {
  map[curr.value] = {
    name: curr.name,
    index: i
  }
  return map
}, {})

export default {
  data () {
    this.PIC_BED = PIC_BED
    this.KB_KEYS = KB_KEYS
    this.LINK_OPTIONS = LINK_OPTIONS
    return {
      config: null
    }
  },

  computed: {
    appConf () {
      return this.$root.APP_CONF
    },
  
    shortcutInfo () {
      const { config } = this
      if (!config) return ''
      const { specialKeys = [], key = '' } = config.shortcut || {}
      if (!specialKeys.length) return ''
      const head = specialKeys
        .map(key => KB_KEYS_MAP[key])
        .sort((a, b) => a.index - b.index)
        .map(it => it.name).join(' + ')
      return `${head} + ${String(key).toUpperCase()}`
    }
  },

  watch: {
    appConf (v) {
      this.config = v
    },

    config: {
      deep: true,
      handler: 'updateConfig'
    }
  },

  methods: {
    updateConfig (conf) {
      if (!conf) return
      crun.$emit('update-config', conf).then(res => {
        this.$root.APP_CONF = conf
      })
    },

    setShortcutCode (event) {
      this.config.shortcut.code = event.code
    }
  }
}
</script>

<style lang="scss">
.cpt-config-panel {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  color: #3e5165;
  font-weight: 200;

  .config-panel {
    list-style: none;
  }

  .config-item {
    padding: 20px 0;
    border-bottom: 1px dotted #eee;
  }

  .config-label {
    display: block;
    margin: 10px 0;
  }

  .config-content {
    margin-right: 10px;

    label {
      margin-right: 20px;

      span {
        margin-right: 6px;
        color: #929aa3;
      }
    }
  }

  .shortcut-config {
    label {
      margin-right: 14px;

      span {
        margin-right: 2px;
        color: #929aa3;
      }

      &:last-child {
         margin-right: 0;
      }
    }

    .add-text {
      margin-right: 14px;
      font-weight: bolder;
    }

    .shortcut-key {
      display: inline-block;
      width: 60px;
      padding: 4px 8px;
      border: 1px solid #eee;
      border-radius: 4px;
      outline: none;
      color: #929aa3;
    }

    // .btn {
    //   padding: 4px 8px;
    //   border: none;
    //   border-radius: 4px;
    //   color: #fff;
    //   outline: none;
    //   transition: opacity .2s;

    //   &.confirm {
    //     background: #4ad9d9;
    //   }

    //   &.cancel {
    //     background: #ccc;
    //   }

    //   &:hover {
    //     opacity: .8;
    //   }
    // }
  }
}
</style>
