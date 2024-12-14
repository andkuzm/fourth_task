<script setup>
</script>

<template>
  <div style="display: flex; gap: 100px; flex-flow: column nowrap; align-items: center;">
    <header style="width: 100%;">
      <div id="navBar">
        <div id="navLinksBlock" style="cursor: default">
          <router-link to="/" class="nav-link">Home</router-link>
          <span id="linksNavBarSeparator" style="cursor: inherit">|</span>
          <router-link to="/contacts" class="nav-link">Contacts</router-link>
        </div>
      </div>
    </header>

    <main style="position: relative; width: 50%; background-color: gray;">
      <RouterView/>
    </main>

    <footer style="position: relative; bottom: 1%; padding-top: 5%; width: 100%; display: flex; justify-content: center;">
      <p>default footer text</p>
    </footer>
  </div>
</template>

<style scoped>

</style>
