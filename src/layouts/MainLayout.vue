<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container">
      <div class="flex items-center justify-between w-100">
        <router-link to="/" class="navbar-brand">Все топики</router-link>
        <button
          class="inline-flex items-center justify-center px-3 py-2 text-gray-500 transition border border-gray-200 rounded-lg hover:text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring"
          type="button"
          @click="logout"
        >
          Выход
        </button>
      </div>
    </div>
  </nav>
  <div class="container py-5">
    <router-view></router-view>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();

  function logout() {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user-id');
    router.push('/sign-in');
  }
</script>
