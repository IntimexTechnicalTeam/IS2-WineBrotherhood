<template>
    <div class="dialog_warpper" v-show="visible">
        <div class="dialog_header">
            <slot name="header"></slot>
            <div class="dialog_close">
                <i class="el-icon-circle-close" @click="touch"></i>
            </div>
        </div>
        <div class="dialog_body">
            <slot></slot>
        </div>
        <div class="dialog_footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
@Component
export default class InsDialog extends Vue {
    @Prop() private visible!:boolean;
    touch () {
      this.$emit('input', false);
    }
}
</script>
<style lang="less" scoped>
// body{
//     overflow-y: hidden !important;
// }
.dialog_warpper{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: calc(100vh - 7rem);
    padding-top: 4rem;
    background-color: white;
    overflow-y: auto;
    overflow-x: auto;
    z-index: 1;
    margin-top: 3rem;
}
.dialog_header{
    // min-height: 2rem;
    margin: 1rem 2rem;
    position: relative;
    .dialog_close{
        position: absolute;
        z-index: 2;
        right: 0;
        top: 0;
        i{
            font-size: 2rem;
        }
    }
}
.dialog_body{
    margin: 0 2rem;
}
.dialog_footer{
    text-align: right;
    margin: 1rem 2rem;
}
</style>
