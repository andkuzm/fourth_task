<script setup>
import router from "@/router.js";
import { ref, onMounted } from 'vue';
import axios from "axios";

// Declare reactive data
const posts = ref([]);

// Logout function
function logout() {
  localStorage.removeItem("token"); // Clear the token
  console.log("Logged out");
  router.push("/login"); // Redirect to login page
}

// Function to handle adding a post (placeholder)
function addPost() {
  console.log("Add post clicked");
}

// Clear all posts
function deleteAll() {
  posts.value = []; // Clear posts array
}

// Fetch posts when the component is mounted
onMounted(() => {
  axios.get("http://localhost:5000/posts")
    .then((response) => {
      var posts = response.data;
      console.log(posts[0]);
      return posts;
    })
    .then((data) => {
      posts.value = data; // Update the reactive posts array
    })
    .catch((error) => console.error(error));
});
</script>

<template>
  <div id="mainContainer" style="display: flex; justify-content: center; flex-flow: column">
    <button @click="logout">Logout</button>
    <div id="postsFeed">
      <div v-for="post in posts" :key="post.id" class="post">
        <router-link to="/">
          <div class="postUpperBar">
            <p class="post-date" style="margin-left: 70%">{{ post.date.split("T")[0] }}</p>
          </div>
          <div class="postBody">
            <p class="postText">{{ post.posttext }}</p>
          </div>
        </router-link>
      </div>
    </div>
    <!-- Logout button -->

    <div id="buttonsContainer" style="display: flex; justify-content: center;">
      <router-link to="/addpost">Add post</router-link>
      <button @click="deleteAll">Delete all</button>
    </div>
  </div>
</template>

<style scoped>
</style>
