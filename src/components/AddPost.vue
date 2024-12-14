<script setup>

</script>

<template>
  <div id="loginBody" style="padding:10px;">
    <p class="loginNormalText">Add Post</p>
    <form onsubmit="event.preventDefault(); window.location.href = 'index.html'" style="display:flex; flex-flow: column; align-items: center;">
      <!--<form @submit.prevent="handleSubmit">-->
      <textarea required aria-label="body" type="text" placeholder="Post body" class="loginTextArea" id="addPostFirstArea"/>
      <input id="addPostButton" type="submit" value="Add" style="width:10%;">
    </form>
  </div>
</template>

<style scoped>

</style>