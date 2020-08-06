<template>
  <div class="page movie-main">
    <mescroll-vue class="mescroll page-padBottom" :down="mescrollDown" :up="mescrollUp" ref="movieList" @init="mescrollInit">
      <div :class="{'noImage': !swiperList.length}" class="head">
        <div class="search-wrapper" v-show="navFlag == 1">
          <router-link class="choose-address" tag="div" to="/choosecity">
            <!-- <select-area :area="cityName"></select-area> -->
            <div class="select-area">
              <span class="txt">重庆</span>
            </div>
          </router-link>
          <div class="tabs">
            <van-tabs @click="onItemClick" v-model="activeName" class="tabs-item" title-active-color="#fff" title-inactive-color="#fff" color="#fff" :border=false line-width="60">
              <van-tab title="正在热映"></van-tab>
              <van-tab title="即将上映"></van-tab>
            </van-tabs>
          </div>
          <img @click="toSearch" class="search-btn" src="../../assets/images/search.png" />
        </div>
        <div class="swipe-wrap">
          <van-swipe class="my-swipe" :autoplay="3000" :height="142.5" indicator-color="white">
            <van-swipe-item v-for="(item, index) in swiperList" :key="index">
              <img v-lazy="item.img" />
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div class="kefu">
        服务热线：
        <a href="tel:4000235507">400-023-5507</a>
      </div>
      <div class="list-wrap">
        <ul>
          <li class="item van-hairline--bottom" v-for="(item,index) in movieList">
            <div class="left">
              <img v-lazy="$httpImage(item.img.replace('meituan.net','meituan.net/128.180'))" />
            </div>
            <div class="middle">
              <h3 class="title van-ellipsis"> {{item.name}}<span class="type">{{item.ver}}</span></h3>
              <template v-if="type ==1">
                <p class="rate van-ellipsis"><span class="title">评分</span><span class="num">{{item.sc}}</span></p>
              </template>
              <p class="actors van-ellipsis">主演：<span>{{item.star}}</span></p>
              <p class="launch-date van-ellipsis">上映时间：<span>{{item.rt}}</span></p>
            </div>
            <div class="right">
              <van-button @click.stop.prev="goChooseCinema" :type="item.showst == 3 ? 'danger' : 'default'" size="small">{{item.showst == 3 ? '购买':'预售'}}</van-button>
            </div>
          </li>
        </ul>
      </div>
    </mescroll-vue>
  </div>
</template>
<script src="@assets/js/home/movie.js"></script>
<style lang="scss" src="@assets/styles/home/movie.scss" scoped />
