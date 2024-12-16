<template>
  <div id="loginBody">
    <div style="padding: 20px;">
      <h2 id="loginWelcomeText">Welcome to PostIt</h2 >
      <form @submit.prevent="handleSubmit">
        <label for="email" style="display: block; text-align: left;">Email</label>
        <input
          v-model="mail"
          required
          type="email"
          placeholder="Email"
          class="loginTextArea"
        />
        <label for="password" style="display: block; text-align: left;">Password</label>
        <input
          v-model="password"
          required
          type="password"
          placeholder="Password"
          class="loginTextArea"
        />
        <div style="display: flex; justify-content: center; margin-top: 15px;">
          <button
            type="submit"
            id="logInButton"
            style="margin-right: 10px;"
          >
            Login
          </button>
          <span style="align-self: center;">Or</span>
          <button
            type="button"
            @click="$router.push('/signup')"
            id="logInButton"
            style="background-color: #4a9cff; margin-left: 10px;"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
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
      const token = localStorage.getItem("token");
      axios
          .post("http://localhost:5000/login", {
            mail: this.mail,
            password: this.password,
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
           .then((response) => {
            localStorage.setItem("token", response.data.token);
            this.$router.push('/');
          })
          .catch((error) => {
            console.error(error);
          });
    },
  },
};
</script>
