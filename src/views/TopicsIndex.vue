<template>
  <div class="row" v-if="loading">
    <div class="col-12 col-md-4 mb-4 text-center" v-for="i in 6" :key="i">
      <div class="card">
        <div class="card-body">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <section class="text-center">
      <div class="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <ul class="grid grid-cols-2 gap-4 border-2 border-teal-600 rounded-xl lg:grid-cols-3">
          <li class="p-8">
            <p class="text-2xl font-extrabold text-teal-500">2,101</p>
            <p class="mt-1 text-lg font-medium">Пройдено тестов</p>
          </li>

          <li class="p-8">
            <p class="text-2xl font-extrabold text-teal-500">16</p>
            <p class="mt-1 text-lg font-medium">Среднее кол-во вопросов в тесте</p>
          </li>

          <li class="p-8">
            <p class="text-2xl font-extrabold text-teal-500">1500</p>
            <p class="mt-1 text-lg font-medium">Кол-во успешных тестов</p>
          </li>
        </ul>
      </div>
    </section>
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-screen-xl mx-auto">
      <div class="" v-for="topic in topics" :key="topic.slug">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ topic.title }}</h5>
            <p class="text-secondary mb-0">{{ topic.count }} вопросов</p>
            <router-link :to="{ name: 'topic-detail', params: { id: topic.slug } }" class="card-link">
              Пройти тест
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { getTopics } from '@/services/api';
  import { ref } from 'vue';

  const topics = ref([]);
  const loading = ref(true);

  const getTopicsList = () => {
    getTopics()
      .then(response => {
        topics.value = response.data.data;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  getTopicsList();
</script>
