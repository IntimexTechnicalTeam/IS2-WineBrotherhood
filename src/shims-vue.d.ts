declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;

}
declare module '*.css' {
}
declare module 'vue-awesome-swiper' {
  import PluginFunction from 'vue/types/plugin';
  export const Swiper: any;
  export const SwiperSlide: any;
  export const install: PluginFunction.PluginFunction<any>;
}
