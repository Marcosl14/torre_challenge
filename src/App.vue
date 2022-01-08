<template>
  <router-view />
</template>

<style>
body {
  background-color: rgb(39, 41, 45);
  min-width: 500px;
}

#app {
  font-family: "Mulish", "Helvetica", "Arial", "sans-serif";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(167, 169, 172);

  padding: 20px;
  height: 90vh;
}

.waiting-container {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  justify-items: center;
  width: 100%;
  height: 100%;
}
</style>
