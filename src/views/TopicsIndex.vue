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
  <div class="row" v-else>
    <div class="col-12 col-md-4 mb-4" v-for="topic in topics" :key="topic.slug">
      <div class="card" style="width: 18rem">
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
