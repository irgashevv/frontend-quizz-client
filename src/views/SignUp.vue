<template>
  <div></div>
</template>

<script setup>
  import { ref } from 'vue';

  const userData = ref({
    username: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
</script>
