<script setup>
  defineProps({
    id: Number,
  })
</script>

<template>
  <div id="loginBody" style="padding:10px;">
    <p class="loginNormalText">A Post</p>
    <div style="display:flex; flex-flow: column; align-items: center;">
      <textarea required aria-label="body" type="text" placeholder="Post body" class="loginTextArea" id="addPostFirstArea">{{ id }}</textarea>
      <div style="display:flex; flex-flow: row; align-items: center;">
        <button id="updateButton" style="width:10%;"></button>
        <button id="deletePostButton" style="width:10%;"></button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>