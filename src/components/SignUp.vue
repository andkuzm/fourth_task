<script setup>
</script>

<template>
  <div id="loginBody" style="padding:10px;">
    <h2 id="loginWelcomeText">Create a new account</h2>
    <br/>
    <form @submit.prevent="handleSubmit">
      <input v-model="mail" required aria-label="mail" type="email" placeholder="Email" class="loginTextArea" id="loginFirstArea">
      <input v-model="password" required aria-label="password" type="password" placeholder="Password" class="loginTextArea" id="loginSecondArea">
      <input id="logInButton" type="submit" value="Sign Up">
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

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
          .post("http://localhost:5000/signup", {
            mail: this.mail,
            password: this.password,
          })
          .then((response) => {
            console.log(response.data);
            router.push('/login')
          })
          .catch((error) => {
            console.error(error);
          });
    },
  },
};
</script>
