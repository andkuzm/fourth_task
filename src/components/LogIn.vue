<template>
  <div id="loginBody" style="padding:10px;">
    <h2 id="loginWelcomeText">Welcome to PostIt</h2>
    <br/>
    <router-link to="/signup" class="loginBlueText">Create an account</router-link>
    <p class="loginNormalText">or</p>
    <p class="loginNormalText">Please log in</p>
    <form onsubmit="event.preventDefault(); window.location.href = 'index.html'">
      <!--<form @submit.prevent="handleSubmit">-->
      <input required aria-label="mail" type="email" placeholder="Email" class="loginTextArea" id="loginFirstArea">
      <input required aria-label="password" type="password" placeholder="Password" class="loginTextArea" id="loginSecondArea">
      <input id="logInButton" type="submit" value="Log in">
    </form>
  </div>
</template>

<style scoped>

</style>
