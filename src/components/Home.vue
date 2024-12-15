<template>
  <div>
    <h1>Home</h1>
    <button @click="logout">Logout</button>
    <button @click="navigateToAddPost">Add Post</button>
    <button @click="deleteAllPosts">Delete All Posts</button>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <a @click="viewPost(post.id)">{{ post.body }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Home',
  setup() {
    const posts = ref([]);
    const router = useRouter();

    const fetchPosts = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/posts', {
        headers: { Authorization: token },
      });
      posts.value = await response.json();
    };

    const viewPost = (id) => {
      router.push(`/posts/${id}`);
    };

    const navigateToAddPost = () => {
      router.push('/add-post');
    };

    const logout = () => {
      localStorage.removeItem('token');
      router.push('/login');
    };

    const deleteAllPosts = async () => {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:5000/posts', {
        method: 'DELETE',
        headers: { Authorization: token },
      });
      fetchPosts(); // Refresh posts after deletion
    };

    onMounted(fetchPosts);

    return {
      posts,
      viewPost,
      navigateToAddPost,
      logout,
      deleteAllPosts,
    };
  },
};
</script>
