<template>
  <div class="page">
    this is a page
    <div class="wrap">
      aaa
    </div>
    <button @click="show = !show">{{show ? 'HIDE' : 'SHOW'}}</button>
    <custom-dialog v-show="show" :info="[{logit:[1,2,3,4,5,6]}]">
      this is a plugin
      <template #inner="{userInfo:person}">
        inner box
        <h1>
          {{person.name}}
        </h1>
      </template>
    </custom-dialog>
  </div>
</template>
<script src="@assets/js/home/scan.js"></script>
<style lang="scss" src="@assets/styles/home/scan.scss" scoped />
<style lang="scss" scoped>
  .wrap{
    width:750px;
    height:300px;
    border: 1px solid;
    box-sizing: border-box;
  }
</style>
