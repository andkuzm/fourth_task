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
    getBody(){
      const token = localStorage.getItem("token");
      axios.get(`http://localhost:5000/posts/${this.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        this.body = response.data.posttext;
      }).catch(error => {console.log(error)});
    },
    async updatePost() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`http://localhost:5000/posts/${this.id}`, {
          body: this.body,
        },{
          headers: {
            'Authorization': `Bearer ${token}`
          }
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
<style scoped>
#postContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f3f5e9; 
  padding: 50px;
  border-radius: 10px;
  max-width: 500px;
  margin: 50px auto;
  
}
.postHeader {
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
.postLabel {
  font-size: 15px;
}
.postInput {
  width: 70%;
  padding: 5px;
  border-radius: 5px;
  font-size: 15px;
}

.buttonGroup {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.updateButton,
.deleteButton {
  background-color: #4a9cff; 
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin: 0 10px;
}

.updateButton:hover {
  background-color: #3a7ccc; 
}

.deleteButton {
  background-color: #4a9cff; 
}

.deleteButton:hover {
  background-color: #3a7ccc; 
}
</style>