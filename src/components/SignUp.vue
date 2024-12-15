<script setup>

</script>

<template>
  <div id="loginBody" style="padding:10px;">
    <h2 id="loginWelcomeText">Welcome to PostIt</h2>
    <br/>
    <p class="loginNormalText">Create a new account</p>
    <form onsubmit="event.preventDefault(); window.location.href = 'index.html'">
      <!--<form @submit.prevent="handleSubmit">-->
      <input required aria-label="mail" type="email" placeholder="Email" class="loginTextArea" id="loginFirstArea">
      <input required aria-label="password" type="password" placeholder="Password" class="loginTextArea" id="loginSecondArea">
      <input id="logInButton" type="submit" value="Log in">
    </form>
  </div>
</template>
