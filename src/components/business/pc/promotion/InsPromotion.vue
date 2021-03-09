<template>
  <div class="promotion">
    <PrmBlock v-for="prm in PromotionData" :key="prm.id" :data="prm" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import sdk from '@/sdk/InstoreSdk';
import { Message } from 'element-ui';

@Component({
  components: {
    PrmBlock: () => import('@/components/base/pc/InsPromotionBlock.vue')
  }
})
export default class InsPromotion extends Vue {
    PromotionData: object[]=[];
    PromotionData1: object[] = [{
      BannerList: [{
        Content: '',
        Id: 1,
        Image: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2628926606,1779558491&fm=26&gp=0.jpg',
        Url: 'http://HKPOST.dev.in-store.hk:85'
      }],
      Name: '推广标题',
      Desc: '推广描述',
      Layout: {
        BorderType: 2,
        CoverType: 4,
        HeaderType: 2,
        Id: 'c728f1f2-2568-47e7-849b-74f3e7db2854',
        ProductLstType: 2
      },
      PrmtProductList: [{
        Name: '推广产品',
        Imgs: ['https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=210115727,190403149&fm=26&gp=0.jpg'],
        SalePrice: 200,
        Sku: 1
      }, {
        Name: '推广产品',
        Imgs: ['https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3840181553,1196073017&fm=15&gp=0.jpg'],
        SalePrice: 200,
        Sku: 1
      }, {
        Name: '推广产品',
        Imgs: ['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3375551376,2801987203&fm=11&gp=0.jpg'],
        SalePrice: 200,
        Sku: 1
      }, {
        Name: '推广产品',
        Imgs: ['https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3859737316,1471135681&fm=11&gp=0.jpg'],
        SalePrice: 200,
        Sku: 1
      }, {
        Name: '推广产品',
        Imgs: ['https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=869365488,3825399794&fm=15&gp=0.jpg'],
        SalePrice: 200,
        Sku: 1
      }],
      Style: {
        Color1: '#9aff73',
        Color2: '#ffa4d1',
        Color3: '#ebf4ff'
      }
    }, {
      BannerList: [{
        Content: '',
        Id: 1,
        Image: 'https://mall-uat.hongkongpost.hk/ClientResources/47de6d2e-4091-49bc-a422-491d95e8608b/00000000-0000-0000-0000-000000000000/promotion/6802166d-2999-46ee-91ff-b87a6edf1f9c/aa036cf0-66bf-4d93-bb58-0c024a318a13.jpg',
        Url: 'http://HKPOST.dev.in-store.hk:85'
      }],
      Name: 'promotion 1',
      Desc: 'promotion Desc',
      Layout: {
        BorderType: 2,
        CoverType: 1,
        HeaderType: 2,
        Id: 'c728f1f2-2568-47e7-849b-74f3e7db2854',
        ProductLstType: 2
      },
      PrmtProductList: [{
        Name: '古郵筒系列 - 隨行杯',
        Imgs: ['http://192.168.1.2:8001/ClientResources/47de6d2e-4091-49bc-a422-491d95e8608b/00000000-0000-0000-0000-000000000000/promotion/1bc0c482-a289-42aa-8079-4cea58ea4ffc/09f532c7-b607-4658-9746-ae8b5f491bfd.jpg'],
        SalePrice: 200,
        Sku: 1
      }, {
        Name: '古郵筒系列 - 隨行杯',
        Imgs: ['http://192.168.1.2:8001/ClientResources/47de6d2e-4091-49bc-a422-491d95e8608b/00000000-0000-0000-0000-000000000000/promotion/1bc0c482-a289-42aa-8079-4cea58ea4ffc/09f532c7-b607-4658-9746-ae8b5f491bfd.jpg'],
        SalePrice: 200,
        Sku: 1
      }, {
        Name: '古郵筒系列 - 隨行杯',
        Imgs: ['http://192.168.1.2:8001/ClientResources/47de6d2e-4091-49bc-a422-491d95e8608b/00000000-0000-0000-0000-000000000000/promotion/1bc0c482-a289-42aa-8079-4cea58ea4ffc/09f532c7-b607-4658-9746-ae8b5f491bfd.jpg'],
        SalePrice: 200,
        Sku: 1
      }, {
        Name: '古郵筒系列 - 隨行杯',
        Imgs: ['http://192.168.1.2:8001/ClientResources/47de6d2e-4091-49bc-a422-491d95e8608b/00000000-0000-0000-0000-000000000000/promotion/1bc0c482-a289-42aa-8079-4cea58ea4ffc/09f532c7-b607-4658-9746-ae8b5f491bfd.jpg'],
        SalePrice: 200,
        Sku: 1
      }, {
        Name: '古郵筒系列 - 隨行杯',
        Imgs: ['http://192.168.1.2:8001/ClientResources/47de6d2e-4091-49bc-a422-491d95e8608b/00000000-0000-0000-0000-000000000000/promotion/1bc0c482-a289-42aa-8079-4cea58ea4ffc/09f532c7-b607-4658-9746-ae8b5f491bfd.jpg'],
        SalePrice: 200,
        Sku: 1
      }],
      Style: {
        Color1: '',
        Color2: '#263238',
        Color3: '#fbefdd'
      }
    }];

    getPromotion () {
      let _this = this;

      sdk.api.promotion.getPromotionList('Home').then(
        function (data) {
          _this.PromotionData = data.slice(1);
          console.log(_this.PromotionData, 'promotion data');
        },
        function (data) {
          Message({
            message: data,
            type: 'error'
          });
        }
      );
    }

    mounted () {
      this.getPromotion();
    }
}
</script>

<style scoped lang="less">
.promotion {
  margin-bottom: 200px;
}
</style>
