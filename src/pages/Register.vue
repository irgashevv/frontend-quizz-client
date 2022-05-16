<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Регистрация
        </h2>
      </div>

      <div
        class="rounded bg-white max-w-md rounded overflow-hidden shadow-xl p-5"
      >
        <form class="space-y-4" @submit.prevent="handleSubmit">
          <input type="hidden" name="remember" value="True" />
          <div class="rounded-md shadow-sm -space-y-px">
            <div class="grid gap-6">
              <div class="col-span-12">
                <label
                  for="user_name"
                  class="block text-sm font-medium text-gray-700"
                >
                  Псевдоним
                </label>
                <input
                  type="text"
                  name="user_name"
                  v-model="userData.username"
                  id="user_name"
                  autocomplete="given-name"
                  class="mt-1 focus:outline-none border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3"
                />
              </div>
              <div class="col-span-12">
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700"
                >
                  Имя
                </label>
                <input
                  type="text"
                  name="name"
                  v-model="userData.name"
                  id="name"
                  autocomplete="given-name"
                  class="mt-1 focus:outline-none border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3"
                />
              </div>

              <div class="col-span-12">
                <label
                  for="surname"
                  class="block text-sm font-medium text-gray-700"
                >
                  Фамилия
                </label>
                <input
                  type="text"
                  name="surname"
                  v-model="userData.surname"
                  id="surname"
                  autocomplete="given-name"
                  class="mt-1 focus:outline-none border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3"
                />
              </div>

              <div class="col-span-12">
                <label
                  for="email_address"
                  class="block text-sm font-medium text-gray-700"
                >
                  Электронная почта
                </label>
                <input
                  type="text"
                  name="email_address"
                  v-model="userData.email"
                  id="email_address"
                  autocomplete="email"
                  class="mt-1 focus:outline-none border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3"
                />
              </div>
              <div class="col-span-12">
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-700"
                >
                  Пароль
                </label>
                <input
                  type="password"
                  name="password"
                  v-model="userData.password"
                  id="password"
                  autocomplete="password"
                  class="mt-1 focus:outline-none border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3"
                />
              </div>
              <div class="col-span-12">
                <label
                  for="password_confirmation"
                  class="block text-sm font-medium text-gray-700"
                >
                  Подтверждение пароля
                </label>
                <input
                  type="password"
                  name="password_confirmation"
                  v-model="userData.password_confirmation"
                  id="password_confirmation"
                  autocomplete="password"
                  class="mt-1 focus:outline-none border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3"
                />
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label for="remember_me" class="ml-2 block text-sm text-gray-900">
                Запомнить меня
              </label>
            </div>

            <div class="text-sm">
              <a
                href="#"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Забыли пароль?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <!-- Heroicon name: solid/lock-closed -->
                <svg
                  class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="True"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { registration } from "@/api/auth";

export default defineComponent({
  setup() {
    const router = useRouter();

    const userData = ref({
      username: "",
      name: "",
      surname: "",
      email: "",
      password: "",
      password_confirmation: "",
    });

    const handleSubmit = async () => {
      const { data } = await registration(userData.value);
      console.log(data);
      router.push({ name: "home" });
    };

    return { userData, handleSubmit };
  },
});
</script>
