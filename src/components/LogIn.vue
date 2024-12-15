<template>
  <div id="loginBody" style="padding:10px;">
    <h2 id="loginWelcomeText">Welcome to PostIt</h2>
    <br/>
    <router-link to="/signup" class="loginBlueText">Create an account</router-link>
    <p class="loginNormalText">or</p>
    <p class="loginNormalText">Please log in</p>
    <form @submit.prevent="handleSubmit">
      <input v-model="mail" required aria-label="mail" type="email" placeholder="Email" class="loginTextArea" id="loginFirstArea">
      <input v-model="password" required aria-label="password" type="password" placeholder="Password" class="loginTextArea" id="loginSecondArea">
      <input id="logInButton" type="submit" value="Log in">
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      mail: "",
      password: "",
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.mail, this.password);
      axios
          .post("http://localhost:5000/login", {
            mail: this.mail,
            password: this.password,
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
    },
  },
};
</script>
