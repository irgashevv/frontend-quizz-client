<template>
  <div v-if="loading">
    <div class="row justify-content-center">
      <div class="col-6">
        <div v-for="i in 10" :key="i" class="mb-4 py-3">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div v-if="!topic.length" class="row justify-content-center">
      <div class="col-6">
        <div class="alert alert-secondary" role="alert">Тестов пока нет</div>
      </div>
    </div>

    <div v-else class="row justify-content-center">
      <div class="col-6">
        <div v-for="(question, index) in topic" :key="question.id" class="mb-4">
          <h5>{{ index + 1 }}) {{ question.title }}</h5>
          <div>
            <div class="form-check" v-for="answer in question.answers" :key="answer.id">
              <input
                class="form-check-input"
                type="radio"
                :id="`answer-${question.id}/${answer.id}`"
                :value="answer.id"
                v-model="question.is_answered"
              />
              <label class="form-check-label" :for="`answer-${question.id}/${answer.id}`">
                {{ answer.title }}
              </label>
            </div>
          </div>
        </div>
        <button class="btn btn-warning w-100 btn-lg" @click="submitTopicHandler" :disabled="submitLoading">
          <span class="spinner-border spinner-border-sm" role="status" v-if="submitLoading">
            <span class="visually-hidden">Loading...</span>
          </span>
          Законить тест
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { getTopic, submitTopic } from '@/services/api';
  import { useRoute, useRouter } from 'vue-router';

  const topic = ref([]);
  const loading = ref(true);
  const submitLoading = ref(false);
  const route = useRoute();
  const router = useRouter();

  const getTopicHandler = () => {
    getTopic(route.params.id)
      .then(response => {
        topic.value = response.data.data;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const submitTopicHandler = () => {
    if (topic.value.some(item => !item.is_answered)) {
      alert('Вы не ответили на все вопросы');
    }
    submitLoading.value = true;
    submitTopic(route.params.id, topic.value)
      .then(() => {
        router.push('/');
      })
      .finally(() => {
        submitLoading.value = false;
      });
  };

  getTopicHandler();
</script>
