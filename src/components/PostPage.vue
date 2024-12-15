<script setup>
  defineProps({
    id: Number,
  })
</script>

<template>
  <div id="loginBody" style="padding:10px;">
    <p class="loginNormalText">A Post</p>
    <div style="display:flex; flex-flow: column; align-items: center;">
      <textarea v-model="body" required aria-label="body" type="text" placeholder="Post body" class="loginTextArea" id="addPostFirstArea">{{ id }}</textarea>
      <div style="display:flex; flex-flow: row; align-items: center;">
        <button id="updateButton" @click="updatePost">Update Post</button>
        <button id="deletePostButton">Delete Post</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      body: "",
    }
  },
  methods: {
    getBody(){
      axios.get(`http://localhost:5000/posts/${this.id}`).then(response => {
        this.body = response.data.posttext;
      }).catch(error => {console.log(error)});
    },
    async updatePost() {
      try {
        const response = await axios.put(`http://localhost:5000/posts/${this.id}`, {
          body: this.body,
        });

        // Handle successful response
        console.log(response.data); // "Post updated successfully"
        alert("Post updated successfully!");
      } catch (error) {
        // Handle error
        console.error('Error updating post:', error);
        alert('Error updating post');
      }
    }
  },
  mounted() {
    this.getBody();
  }
}

</script>