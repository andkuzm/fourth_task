<script setup>
  defineProps({
    id: Number,
  })
</script>

<template>
  <div id="postContainer">
    <p class="postHeader">A Post</p>
    <div class="postForm">
      <div class="inputGroup">
        <label for="postBody" class="postLabel">Body</label>
        <input
          v-model="body"
          id="postBody"
          type="text"
          placeholder="body"
          class="postInput"
        />
      </div>
      <div class="buttonGroup">
        <button @click="updatePost" class="updateButton">Update</button>
        <button @click="deletePost" class="deleteButton">Delete</button>
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
    getBody() {
      const token = localStorage.getItem("token");
      axios.get(`http://localhost:5000/posts/${this.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        this.body = response.data.posttext;
      }).catch(error => { console.log(error) });
    },
    async updatePost() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`http://localhost:5000/posts/${this.id}`, {
          body: this.body,
        }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        console.log(response.data); 
        alert("Post updated successfully!");
      } catch (error) {
        console.error('Error updating post:', error);
        alert('Error updating post');
      }
    },
    async deletePost() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
          `http://localhost:5000/posts/${this.id}`,
          {
            headers: { 'Authorization': `Bearer ${token}`
            }
          }
        );

        console.log(response.data);
        alert("Post deleted successfully!");
        this.$router.push("/");
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Error deleting post");
      }
    },
  },
  mounted() {
    this.getBody();
  }
}
</script>

<style scoped>

</style>