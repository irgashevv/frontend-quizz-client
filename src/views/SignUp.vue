<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <form @submit.prevent="signUpHandler">
      <h4>Регистрация</h4>
      <div class="mb-3">
        <label for="username" class="form-label">Псевдоним</label>
        <input v-model="userData.username" type="text" class="form-control" id="username" placeholder="..." />
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">Имя</label>
        <input v-model="userData.name" type="text" class="form-control" id="name" placeholder="..." />
      </div>
      <div class="mb-3">
        <label for="surname" class="form-label">Фамилия</label>
        <input v-model="userData.surname" type="text" class="form-control" id="surname" placeholder="..." />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Почта</label>
        <input v-model="userData.email" type="email" class="form-control" id="email" placeholder="example@mail.ru" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Пароль</label>
        <input v-model="userData.password" type="password" class="form-control" id="password" placeholder="******" />
      </div>
      <div class="mb-3">
        <label for="passwordConfirmation" class="form-label">Подтверждение пароля</label>
        <input
          v-model="userData.password_confirmation"
          type="password"
          class="form-control"
          id="passwordConfirmation"
          placeholder="******"
        />
      </div>
      <button class="btn btn-primary w-100" :disabled="loading">
        <span class="spinner-border spinner-border-sm" role="status" v-if="loading">
          <span class="visually-hidden">Loading...</span>
        </span>
        Зарегистрироваться
      </button>
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
    signUp()
      .then(() => {
        router.push('/');
      })
      .finally(() => {
        loading.value = false;
      });
  };
</script>
