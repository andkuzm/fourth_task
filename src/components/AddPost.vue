<script setup>
import { ref } from "vue";
import axios from "axios";
import router from "@/router.js";
const postText = ref("");
async function addPost() {
  const token = localStorage.getItem("token"); // Retrieve the JWT token
  if (!token) {
    alert("You must be logged in to add a post.");
    router.push("/login");
    return;
  }

  try {
    // Send post body to the backend
    await axios.post(
      "http://localhost:5000/posts",
      { posttext: postText.value},{
          headers: {
            'Authorization': `Bearer ${token}`
          }
      }
    );

    alert("Post added successfully!");
    postText.value = ""; // Clear the input field
    router.push("/"); // Redirect back to the Home page
  } catch (error) {
    console.error("Error adding post:", error.message);
    alert("Failed to add post. Please try again.");
  }
}
</script>

<template>
  <div id="addPostContainer">
    <h3 class="addPostHeader">Add Post</h3>
    <div class="formContainer">
      <div class="inputGroup">
        <label for="postBody" class="postLabel">Body</label>
        <input
          id="postBody"
          v-model="postText"
          type="text"
          placeholder="Enter post body"
          class="postInput"
        />
      </div>

      <button @click="addPost" class="addButton">Add</button>
    </div>
  </div>
</template>
<style scoped>

</style>
