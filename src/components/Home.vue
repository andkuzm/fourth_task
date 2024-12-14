<script setup>

  import router from "@/router.js";

  function logout() {
    console.log('Logged out');
  }

  function addPost() {
    console.log('Add post clicked');
  }

  function deleteAll() {
    posts.value = []; // Clear posts
  }

  import { ref, onMounted } from 'vue';

  // Declare reactive data
  const posts = ref([]);

  // Fetch posts when the component is mounted
  onMounted(() => {
    fetch('/src/assets/posts.json') // Adjusted file path
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then(data => {
          posts.value = data.posts; // Update the reactive posts array
        })
        .catch(error => console.error(error));
  });
</script>

<template>
  <div id="mainContainer" style="display: flex; justify-content: center; flex-flow: column">
    <div id="postsFeed">
      <div v-for="post in posts" :key="post.id" class="post">
        <router-link to="/">
          <div class="postUpperBar">
            <!--          <img :src="post.accountImage" alt="User Image" />-->
            <p class="post-date" style="margin-left: 70%">{{ post.date }}</p>
          </div>
          <div class="postBody">
            <p class="postText">{{ post.postText }}</p>
            <!--          <img v-if="post.postImage" :src="post.postImage" alt="Post Image" />-->
          </div>
        </router-link>
      </div>
    </div>
    <button @click="logout">Logout</button>
    <div id="buttonsContainer" style="display: flex; justify-content: center;">
      <router-link to="/addpost">Add post</router-link>
      <button @click="deleteAll">Delete all</button>
    </div>
  </div>
</template>

<style scoped>

</style>
