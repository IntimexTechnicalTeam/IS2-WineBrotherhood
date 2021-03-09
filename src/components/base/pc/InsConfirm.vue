<template>
  <transition name="fade">
    <div class="layer" v-if="LayerVisible">
      <transition name="fade">
        <div v-if="Visible" class="message_warpper" @mousewheel.prevent>
            <div class="confirm">
                <div class="title primary">{{Title}}</div>
                <div class="content">{{Content}}</div>
                <div class="footer">
                  <inButton :nama="$i18n.t('Message.Confirm')" size="small" width="50%" @click="doConfirm"></inButton>
                  <inButton :nama="$i18n.t('Message.Cancel')" size="small" width="50%" @click="doCacel" style="background:#666;"></inButton>
                </div>
            </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import inButton from '@/components/base/pc/InsButton.vue';
@Component({
  components: { inButton: inButton }
})
export default class InsComfirm extends Vue {
    public Title!:string;
    public Content!:string;
    public Visible:boolean = false;
    public Confirm!:Function;
    public Cancel!:Function;
    private LayerVisible:boolean = true;
    created () {
      // document.body.style.overflow = 'hidden';
    }
    doConfirm () {
      Vue.prototype.$ClearSingtonConfirm();
      if (this.Confirm && this.Confirm instanceof Function) { this.Confirm(); };
      this.Visible = false;
      setTimeout(() => { this.LayerVisible = false; });
      // document.body.style.overflow = '';
    }
    doCacel () {
      Vue.prototype.$ClearSingtonConfirm();
      if (this.Cancel && this.Cancel instanceof Function) { this.Cancel(); };
      this.Visible = false;
      setTimeout(() => { this.LayerVisible = false; });
    }
}
</script>
<style scoped lang="less">
.message_warpper{
}
.layer{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    z-index: 2018;
}
.confirm{
    width: 400px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: aliceblue;
    border-radius: 4px;
    z-index: 2019;
    /* box-shadow: 0 0 30px 5px rgba(0, 0, 0, .3) ; */
}
.title{
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}
.content{
  height: 100px;
  text-align: left;
  padding: 16px;
}
.footer{
  display: flex;
  justify-content: center;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.primary {
  background-color: @primary_color;
  color: white;
}
</style>
