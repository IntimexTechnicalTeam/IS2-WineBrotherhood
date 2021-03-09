<template>
    <div class="productshare_icon_warpper">
        <a @click="whatsApp" class="xq-whatsapp" data-action="share/whatsapp/share"><img src="/static/icon/whatsapp.png"></a>
        <a onclick="window.open('http://www.facebook.com/share.php?u=' + window.location.href+'&t=' + document.title);"><img src="/static/icon/fb-d-icon.png"></a>
        <a onclick="window.open('https://lineit.line.me/share/ui?url='+window.location.href);"><img src="/static/icon/line.png"></a>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
@Component
export default class HkProductShare extends Vue {
  whatsApp () {
    var u = location.href;
    var t = document.title;
    window.location.href = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(t) + encodeURIComponent('\n\n' + u);
  }
}
</script>
<style lang="less" scoped>
.productshare_icon_warpper{
    text-align: right;
    padding-right: 5px;
    margin-top: 5px;
}
.productshare_icon_warpper a{
    display: inline-block;
    margin-right: .5rem;
}
.productshare_icon_warpper a:last-child{
    margin-right: 0px!important;
}
.productshare_icon_warpper img{
    width: auto;
    height: 2rem;
}
</style>
