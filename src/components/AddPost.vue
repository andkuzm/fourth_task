<template>
  <div>
    <h1>Add a New Post</h1>
    <form @submit.prevent="submitPost">
      <label for="post-body">Post Body:</label>
      <textarea
        id="post-body"
        v-model="body"
        placeholder="Write your post here..."
        required
      ></textarea>
      <button type="submit">Add Post</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'AddPost',
  setup() {
    const body = ref(''); // Post content
    const router = useRouter();

    const submitPost = async () => {
      const token = localStorage.getItem('token'); // Retrieve JWT from local storage
      if (!token) {
        alert('You must be logged in to add a post!');
        router.push('/login'); // Redirect to login if not authenticated
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({ body: body.value }), // Send post body
        });

        if (response.ok) {
          alert('Post added successfully!');
          router.push('/'); // Redirect to home page after successful post
        } else {
          const errorMessage = await response.text();
          console.error('Failed to add post:', errorMessage);
          alert('Failed to add post: ' + errorMessage);
        }
      } catch (error) {
        console.error('Error adding post:', error);
        alert('An error occurred. Please try again.');
      }
    };

    return {
      body,
      submitPost,
    };
  },
};
</script>

<style>
/* Basic styles */
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: 0 auto;
}

textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  font-size: 16px;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}
</style>
