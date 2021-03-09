import pc from '@/components/base/pc/InsConfirm.vue';
import mobile from '@/components/base/mobile/InsConfirm.vue';
import Vue from 'vue';
const ep = Vue.prototype.userAgent === 'pc' ? pc : mobile;
export default ep;
