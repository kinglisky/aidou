import Vue from 'vue';
import Temp from './temp.vue'
import Test from './test.vue'
const v = new Vue({
  el: '#app',
  
  template: `
    <div>
        Name: <input v-model='name' type='text'>
        <temp :name='name'/>
        <test :name='name'/>
    </div>`,
  
  data: { name: 'for time is short' },
  components: { Temp, Test }
})
