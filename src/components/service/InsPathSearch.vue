<template>
  <div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
@Component
export default class InsNotFond extends Vue {
  created () {
    let last = this.$Storage.get('reflect');
    if (!last || last < new Date().getTime()) {
      console.log('映射表超時，正在更新……');
      this.getFromServer();
    } else if (last && last >= new Date().getTime()) {
      console.log('正在從映射表中獲取……');
      this.getFromDB();
    };
  }
  get path () {
    return this.$route.path;
  }
  getFromDB () {
    let request = window.indexedDB.open('style1');
    request.onsuccess = () => {
      let db = request.result;
      let select = db.transaction(['reflect'], 'readonly').objectStore('reflect').get(this.path);
      select.onsuccess = (event) => {
        if (select.result) {
          this.$router.push(select.result.url);
        } else {
          console.log('未知重定向方向，正在檢索……');
          this.getFromServer();
        }
      };
    };
  }
  getFromServer () {
    let that = this;
    this.$Api.sysApi.getReflect().then((result) => {
      let request = window.indexedDB.open('style1');
      let objectStore;
      this.$Storage.set('reflect', new Date().getTime() + 1000 * 60 * 60);
      request.onupgradeneeded = (event) => {
        let db = request.result;
        let objectStore;
        if (!db.objectStoreNames.contains('reflect')) {
          objectStore = db.createObjectStore('reflect', { keyPath: 'path' });
        }
      };
      request.onsuccess = () => {
        let realPath;
        let db = request.result;
        if (db.objectStoreNames.contains('reflect')) db.transaction(['reflect'], 'readwrite').objectStore('reflect').clear();
        result.data.ReturnValue.forEach((element, index) => {
          if (element.Key === that.path.replace('/', '')) realPath = element.Url;
          let insert = db.transaction(['reflect'], 'readwrite').objectStore('reflect').add({ path: element.Key, url: element.Url });
          insert.onerror = () => {
            console.log('插入信息出错！');
          };
          insert.onsuccess = (event) => {
            if ((index + 1) === result.data.ReturnValue.length && realPath) that.$router.push(realPath); else if ((index + 1) === result.data.ReturnValue.length && !realPath)that.$router.push('/');
            console.log('数据写入成功');
          };
        });
      };
    });
  }
}
</script>
<style lang="less" scoped>
</style>
