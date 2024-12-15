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
      { postText: postText.value },
      { headers: { Authorization: token } }
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
  <div id="addPostContainer" style="text-align: center; margin-top: 50px;">
    <h2>Add Post</h2>
    <div
      style="
        display: inline-block;
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 10px;
        width: 300px;
      "
    >
      <!-- Input field for the post body -->
      <label for="postBody" style="display: block; margin-bottom: 10px;">Body</label>
      <input
        id="postBody"
        v-model="postText"
        type="text"
        placeholder="Enter post body"
        style="width: 90%; padding: 5px; border-radius: 5px; border: 1px solid #aaa;"
      />
      <br />
      <!-- Button to submit the post -->
      <button
        @click="addPost"
        style="
          margin-top: 15px;
          padding: 5px 20px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        "
      >
        Add
      </button>
    </div>
  </div>
</template>

<style scoped>
button:hover {
  background-color: #45a049;
}
</style>
