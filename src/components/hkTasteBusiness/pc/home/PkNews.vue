<template>
  <div class="news">
    <h2>{{$t('home.News')}}</h2>
    <ul>
      <li v-for="(n,index) in lastestContents" :key="index">
        <router-link :to="'/cms/content/'+n.Id">
          <img :src="n.Cover" class="NewsPart" />
        </router-link>
        <p class="news-date">{{n.CreateDate}}</p>
        <p class="news-title">{{n.Title}}</p>
      </li>
    </ul>
    <p class="more">
      <a href="#">{{$t('home.More')}}></a>
    </p>
  </div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class PkNews extends Vue {
  lastestContents: any[] = [];
  getNews () {
    var cond = {
      Page: 1,
      PageSize: 3,
      catId: 10029
    };
    this.$Api.cms.getLastestContents(cond).then(result => {
      result.Data.forEach(function (item) {
        item.CreateDate = item.CreateDate.substring(
          0,
          item.CreateDate.indexOf(' ')
        );
      });
      this.lastestContents = result.Data;
    });
  }
  mounted () {
    this.getNews();
  }
}
</script>

<style scoped lang="less">
.news {
  width: 100%;
  /*height:800px;*/
  padding-bottom: 150px;
  padding-top: 160px;
  box-sizing: border-box;
}
.news h2 {
  font-size: 28px;
  color: #383838;
  text-align: center;
  margin-bottom: 65px;
}
.news ul {
  width: 1120px;
  margin: 0 auto;
  overflow: hidden;
}
.news li {
  width: 326px;
  margin-right: 71px;
  float: left;
  box-sizing: border-box;
}
.news li:nth-child(3n) {
  margin-right: 0;
}
.news li a {
  display: block;
  width: 100%;
  height: 210px;
  background-color: #ededed;
  display: flex;
  justify-content: center;
  align-items: center;
}
.news li a img {
  max-width: 100%;
  max-height: 100%;
}
.news li .news-date {
  display: inline-block;
  width: 100%;
  font-size: 16px;
  color: #7e7e7e;
  text-align: left;
  height: 48px;
  line-height: 60px;
  border-bottom: 1px solid #bdbdbd;
}
.news li .news-title {
  width: 100%;
  font-size: 16px;
  color: #424242;
  text-align: left;
  height: 40px;
  line-height: 20px;
  margin-top: 10px;
  display: flex;
  display: -webkit-box;
  display: -moz-box;
  line-clamp: 2;
  -moz-line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
}
.news .more {
  display: block;
  width: 1120px;
  margin: 0 auto;
  overflow: hidden;
  margin-top: 75px;
}
.news .more a {
  color: #7e7e7e;
  font-size: 16px;
  float: right;
}
</style>
