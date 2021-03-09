import pc from '@/components/business/pc/login/InsLoginFlow.vue';
import mobile from '@/components/business/mobile/login/InsLoginFlow.vue';
import Vue from 'vue';
const ep = Vue.prototype.userAgent === 'pc' ? pc : mobile;
export default ep;
