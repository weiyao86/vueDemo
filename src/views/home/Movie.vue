<template>
  <div class="page movie-main">
    <div class="mescroll page-padBottom" id="mescroll" ref="movieList">
      <div :class="{'noImage': !swiperList.length}" class="head">
        <div class="search-wrapper" v-show="navFlag == 1">
          <router-link class="choose-address" tag="div" to="/movie/city">
            <!-- <select-area :area="cityName"></select-area> -->
            <div class="select-area">
              <span class="txt">重庆</span>
            </div>
          </router-link>
          <div class="tabs">
            <van-tabs v-model="activeName" class="tabs-item" title-active-color="#fff" title-inactive-color="#fff" color="#fff" :border=false line-width="60">
              <van-tab @on-item-click="onItemClick" title="正在热映"></van-tab>
              <van-tab nav-right="right" @on-item-click="onItemClick" title="即将上映"></van-tab>
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
          <li class="item">
            <div class="left">
              <img v-lazy="'https://static.xinyingtong.cn/202007/1596071557216.jpg?x-oss-process=style/mobile'" />
              <!-- <img v-lazy="require('../../assets/images/search.png')"> -->
            </div>
            <div class="middle">
              <h3 class="title van-ellipsis">星际穿越<span class="type">2D/IMAX 2D 2D+IMAX 2D+数字</span></h3>
              <p class="rate van-ellipsis"><span class="title">评分</span><span class="num">9.4</span></p>
              <p class="actors van-ellipsis">主演：<span>马修·麦康纳,安妮·海瑟薇,杰西卡·查斯坦</span></p>
              <p class="launch-date van-ellipsis">上映时间：<span>2020-08-02</span></p>
            </div>
            <div class="right">
              <van-button type="danger" class="buy" size="small">购买</van-button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script src="@assets/js/home/movie.js"></script>
<style lang="scss" src="@assets/styles/home/movie.scss" scoped />
