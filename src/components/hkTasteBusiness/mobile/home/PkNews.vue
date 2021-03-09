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
        item.CreateDate = item.CreateDate.substring(0, item.CreateDate.indexOf(' ')
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
  width: 94%;
  margin: 0 auto;
  padding-top: 5.5rem;
  padding-bottom: 3rem;
  overflow: hidden;
}
.news h2 {
  font-size: 2.2rem;
  color: #383838;
  text-align: center;
  margin-bottom: 2.5rem;
  text-transform: uppercase;
  font-family: 'Century Gothic';
}
.news li {
  margin-bottom: 4rem;
}
.news li a {
  width: 100%;
  height: 19.5rem;
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
  font-size: 1.5rem;
  color: #7e7e7e;
  text-align: left;
  height: 3rem;
  line-height: 3rem;
  margin-top: 1rem;
  border-bottom: 1px solid #bdbdbd;

}
.news li .news-title {
  width: 100%;
  font-size: 1.5rem;
  color: #424242;
  text-align: left;
  height: 4rem;
  line-height: 2rem;
  margin-top: 1rem;
  display:flex;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
}
.news .more {
  display: block;
  width: 94%;
  margin: 0 auto;
  overflow: hidden;
}
.news .more a {
  color: #7e7e7e;
  font-size: 1.5rem;
  float: right;
}
</style>
