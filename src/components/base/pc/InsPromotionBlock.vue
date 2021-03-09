<template>
    <div class="pro_one" :style="{ background: data.Style.Color3 }">
        <div class="pro_content" :class="{'pc': userAgent === 'pc', 'mobile': userAgent === 'mobile'}">
            <p class="pro_title" :style="{ backgroundColor: data.Style.Color2, color: data.Style.Color1 }">{{data.Name}}</p>
            <div class="pro_box" :style="{ borderColor: data.Style.Color2}">
                <p class="pro_desc" v-if="data.Layout.CoverType != 1">{{data.Desc}}</p>
                <div class="layout" :class="{'CoverTop': data.Layout.CoverType==1,'CoverBottom': data.Layout.CoverType==3,'CoverLeft': data.Layout.CoverType==4, 'CoverRight': data.Layout.CoverType==2}">
                    <div class="cover" v-if="data.Layout.CoverType">
                        <img v-if="data.BannerList.length" :src="data.ImgPath" />
                    </div>
                    <p class="pro_desc" v-if="data.Layout.CoverType == 1">{{data.Desc}}</p>
                    <div class="productList">
                        <ProSwiper :ProductList="data.PrmtProductList" :slidesPerView="data.Layout.CoverType == 4 || data.Layout.CoverType == 2  ? 3 : 4" :spaceBetween="userAgent === 'pc' ? 20 : 10" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    ProSwiper: () => import('@/components/base/pc/InsProSwiper.vue')
  }
})
export default class InsPromotionBlock extends Vue {
    @Prop() private data!: object;
}
</script>

<style scoped lang="less">
.pro_one {
  .pro_content {
    padding: 30px 0;
    margin: 0 auto;

    &.pc {
        width: 1000px;

        .pro_title {
            min-width: 100px;
            display: inline-block;
            height: 70px;
            text-align: center;
            line-height: 70px;
            border-radius: 3px;
            font-size: 16px;
            color: #faf345;
            font-weight: bold;
            text-shadow: 1px 1px 3px #000;
            background-image: url(../../../assets/Images/collect-icon-red-f.png);
            background-position: 50px;
            background-repeat: no-repeat;
            padding: 0 50px 0 95px;
            background-color: #0874AA;
        }

        .pro_box {
            padding: 20px;

            .pro_desc {
                margin-bottom: 15px;
            }

            .layout {
                .pro_desc {
                    margin: 15px 0;
                }
            }
        }
    }

    &.mobile {
        .pro_title {
            width: 100%;
            background-image: none;
        }

        .pro_title {
            font-size: 1.3rem;
            color: #faf345;
            font-weight: bold;
            text-shadow: 1px 1px 3px #000;
            padding: 0.5rem;
            box-sizing: border-box;
        }

        .pro_box {
            padding: 0.5rem;

            .pro_desc {
                margin-bottom: 1rem;
            }

            .layout {
                .pro_desc {
                    margin: 1rem 0;
                }
            }
        }
    }

    .pro_box {
        border: 7px solid #0874AA;
        box-sizing: border-box;

        .layout {
            display: flex;
            display: -webkit-flex;
            display: -moz-flex;
            display: -ms-flex;

            .cover {
                width: 30%;

                img {
                    max-width: 100%;
                }
            }

            .productList {
                width: 100%;
            }

            &.CoverTop {
                flex-direction: column;

                .cover {
                    width: 100%;
                }

                .productList {
                    width: 100%;
                }
            }

            &.CoverBottom {
                flex-direction: column-reverse;

                .cover {
                    width: 100%;
                }

                .productList {
                    width: 100%;
                }
            }

            &.CoverLeft {
                flex-direction: row;
                justify-content: space-between;

                .productList {
                    width: 66%;
                }
            }

            &.CoverRight {
                flex-direction: row-reverse;
                justify-content: space-between;

                .productList {
                    width: 66%;
                }
            }
        }
    }
  }
}
</style>
