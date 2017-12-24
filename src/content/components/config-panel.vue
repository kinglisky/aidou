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

export default {
  data () {
    this.PIC_BED = PIC_BED
    this.LINK_OPTIONS = LINK_OPTIONS
    return {
      config: null
    }
  },

  computed: {
    appConf () {
      return this.$root.APP_CONF
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
    border-bottom: 1px dotted #eee;
    padding: 20px 0;
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
}
</style>
