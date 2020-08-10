<template>
  <div class="page cniema-main">
    <div class="head">
      <div class="search-wrapper">
        <div class="tabs">
          <van-tabs class="tabs-item" title-active-color="#333" :border=false line-width="60" type="card" @click="onChangeTab">
            <van-tab title="电影" name="1"></van-tab>
            <van-tab title="影院" name="2"></van-tab>
          </van-tabs>
        </div>
        <div class="choose-address" tag="div" @click="toChooseCity">
          <div class="select-area">
            <span class="txt">{{getCurrentCity}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="list-wrap" v-show="navFlag == 1">
      <div class="tabs-wrap van-hairline--bottom">
        <van-tabs @click="onItemClick" v-model="activeName" class="tabs-inner-item" title-active-color="#333" :border=false line-width="60">
          <van-tab title="正在热映"></van-tab>
          <van-tab title="即将上映"></van-tab>
        </van-tabs>
        <van-icon name="search" size="26" class="search-icon" />
      </div>
      <mescroll-vue class="paddingBottom" :down="mescrollDown" :up="mescrollUp" ref="mescroll" @init="mescrollInit">
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
      </mescroll-vue>
    </div>
    <div class="list-wrap" v-show="navFlag == 2">
      <van-search v-model="cinemaSearchVal" show-action label="全城" left-icon="arrow-down" class="search-action-wrap" placeholder="请输入搜索关键词" @search="onSearch">
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
      <mescroll-vue class="cniema-list" :down="mescrollCinemaDown" :up="mescrollCinemaUp" ref="mescroll_cniema" @init="mescrollCinemaInit">
        <ul class="cinema-items">
          <li class="cniema-list van-hairline--bottom" v-for="(cinema,index) in cniemaList" :key="index">
            <div class="top van-ellipsis">{{cinema.name}}</div>
            <div class="middle">
              <div class="sub-title van-ellipsis">{{cinema.address}}</div>
              <div class="distance">{{cinema.distance | formDistance}}</div>
            </div>
          </li>
        </ul>
      </mescroll-vue>
    </div>
  </div>
</template>
<script src="@assets/js/home/cinema.js"></script>
<style lang="scss" src="@assets/styles/home/cinema.scss" scoped />
