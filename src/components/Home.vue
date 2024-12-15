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

// Clear all posts
function deleteAll() {
  posts.value = [];
  const token = localStorage.getItem("token");
  axios.delete("http://localhost:5000/posts", {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then((response) => {console.log(response.date);}).catch((error) => {console.error(error);});
}

function addPost() {
  router.push('/addpost');
}

// Fetch posts when the component is mounted
onMounted(() => {
  const token = localStorage.getItem("token");
  axios.get("http://localhost:5000/posts", {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then((response) => {
      var posts = response.data;
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
      <div v-for="post in posts" :key="post.id" class="post" >
        <router-link :to="`/${post.id}`">
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
      <button @click="addPost">Add post</button>
      <button @click="deleteAll">Delete all</button>
    </div>
  </div>
</template>

<style scoped>
</style>
