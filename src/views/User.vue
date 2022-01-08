<template>
  <div class="user">
    <h1>Mostrar {{ username }}</h1>
  </div>
</template>

<script>
export default {
  name: "User",
  props: {
    username: {
      required: true,
    },
  },
};
</script>
