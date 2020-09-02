<template>
  <div class="page">
    this is a page
    <button @click="show = !show">{{show ? 'HIDE' : 'SHOW'}}</button>
    <custom-dialog v-show="show">
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
