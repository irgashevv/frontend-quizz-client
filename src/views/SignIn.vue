<template>
  <div class="max-w-screen-xl h-screen px-4 py-16 mx-auto sm:px-6 lg:px-8 flex items-center">
    <div class="max-w-lg w-100 mx-auto">
      <h1 class="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">Войдите чтобы начать</h1>
      <form action="" class="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl" @submit.prevent="login">
        <p class="text-lg font-medium">Вход в аккаунт</p>

        <div>
          <label for="username" class="text-sm font-medium">Имя пользователя</label>

          <div class="relative mt-1">
            <input
              v-model="userData.username"
              type="username"
              id="username"
              class="w-full p-3 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              placeholder="Enter username"
            />
          </div>
        </div>

        <div>
          <label for="password" class="text-sm font-medium">Пароль</label>

          <div class="relative mt-1">
            <input
              v-model="userData.password"
              type="password"
              id="password"
              class="w-full p-3 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              placeholder="Enter password"
            />
          </div>
        </div>

        <button type="submit" class="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg">
          Войти
        </button>

        <p class="text-sm text-center text-gray-500">
          Нет аккаунта
          <router-link class="underline" to="/sign-up">Регистрация</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { signIn } from '@/services/api';

  const router = useRouter();

  const userData = ref({
    username: '',
    password: '',
  });

  function login() {
    signIn(userData.value)
      .then(response => {
        localStorage.setItem('auth-token', response.data.token);
        localStorage.setItem('user-id', response.data.user.id);
        console.log(response);
        router.push('/');
      })
      .catch(error => {
        console.error(error);
      });
  }
</script>
