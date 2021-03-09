import Vue from 'vue';
import VueI18n from 'vue-i18n';
import locale from 'element-ui/lib/locale';
import { FrontE } from '@/sdk/common/SysConst';
// User defined lang
import E from './en-US';
import C from './zh-CN';
import S from './zh-CNS';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import zhSLocale from 'element-ui/lib/locale/lang/zh-TW';
Vue.use(VueI18n);

const messages = {
  // E: {
  //   ...E
  // },
  // C: {
  //   ...C
  // },
  // S: {
  //   ...S
  // }
  E: Object.assign(E, enLocale),
  C: Object.assign(C, zhSLocale),
  S: Object.assign(S, zhLocale)
};

const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || FrontE.defaultLang, // 从localStorage中获取 默认英文
  messages,
  fallbackLocale: FrontE.defaultLang, // 如果在message中找不到相应的键值将回退到原本的语言
  formatFallbackMessages: true // 如果在message中找不到相应的键值将回退到原本的语言
});

locale.i18n((key, value) => i18n.t(key, value)); // 为了实现element插件的多语言切换

export default i18n;
