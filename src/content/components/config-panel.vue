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
        <span class="config-label">生产链接：（默认使用 markdown 链接）</span>
        <div class="config-content">
          <label>
            <span>显示图链接面板</span>
            <input type="checkbox" v-model="config.showFullLinks">
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

export default {
  data () {
    this.PIC_BED = PIC_BED
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
      margin-right: 10px;

      span {
        margin-right: 6px;
        color: #929aa3;
      }
    }
  }
}
</style>
