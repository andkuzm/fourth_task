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
#addPostContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f3f5e9; 
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  margin: 50px auto;
}
.addPostHeader {
   font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
}
.inputGroup {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.postInput {
  width: 70%;
  padding: 5px;
  border-radius: 5px;
  font-size: 1rem;
}

.addButton {
   background-color: #4a9cff; 
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;
  display: block; 
  margin-left: auto;
  margin-right: auto; 
  text-align: center;
}

.addButton:hover {
  background-color: #3a7ccc; 
}
</style>
