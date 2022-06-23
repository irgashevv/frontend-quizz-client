<template>
  <div class="flex items-center justify-center min-vh-100">
    <form
      action=""
      class="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl max-w-md w-100"
      @submit.prevent="signUpHandler"
    >
      <p class="text-lg font-medium">Регистрация</p>
      <div>
        <label for="username" class="text-sm font-medium">Псевдоним</label>
        <div class="relative mt-1">
          <input
            v-model="userData.username"
            type="text"
            id="username"
            class="w-full p-3 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
            placeholder="..."
          />
        </div>
      </div>
      <div>
        <label for="name" class="text-sm font-medium">Имя</label>
        <div class="relative mt-1">
          <input
            v-model="userData.name"
            type="text"
            id="name"
            class="w-full p-3 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
            placeholder="..."
          />
        </div>
      </div>
      <div>
        <label for="surname" class="text-sm font-medium">Фамилия</label>
        <div class="relative mt-1">
          <input
            v-model="userData.surname"
            type="text"
            id="surname"
            class="w-full p-3 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
            placeholder="..."
          />
        </div>
      </div>
      <div>
        <label for="email" class="text-sm font-medium">Почта</label>
        <div class="relative mt-1">
          <input
            v-model="userData.email"
            type="text"
            id="email"
            class="w-full p-3 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
            placeholder="..."
          />
        </div>
      </div>
      <div>
        <label for="password" class="text-sm font-medium">Пароль</label>
        <div class="relative mt-1">
          <input
            v-model="userData.password"
            type="text"
            id="password"
            class="w-full p-3 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
            placeholder="..."
          />
        </div>
      </div>
      <div>
        <label for="password_confirmation" class="text-sm font-medium">Подтверждение пароля</label>
        <div class="relative mt-1">
          <input
            v-model="userData.password_confirmation"
            type="text"
            id="password_confirmation"
            class="w-full p-3 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
            placeholder="..."
          />
        </div>
      </div>
      <button type="submit" class="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg">
        Регистрация
      </button>

      <p class="text-sm text-center text-gray-500">
        Есть аккаунт?
        <router-link to="/sign-in" class="underline">Вход</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { signUp } from '@/services/api';
  import { useRouter } from 'vue-router';

  const userData = ref({
    username: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const loading = ref(false);
  const router = useRouter();

  const signUpHandler = () => {
    if (userData.value.password !== userData.value.password_confirmation) {
      alert('Пароли нге совпадают');
    }
    loading.value = true;
    signUp(userData.value)
      .then(response => {
        localStorage.setItem('auth-token', response.data.token);
        router.push('/');
      })
      .finally(() => {
        loading.value = false;
      });
  };
</script>
