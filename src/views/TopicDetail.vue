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
  <div v-else class="">
    <div v-if="!topic.length" class="row justify-content-center">
      <div class="col-6">
        <div class="alert alert-secondary" role="alert">Тестов пока нет</div>
      </div>
    </div>

    <div v-else class="max-w-lg mx-auto">
      <h1 class="font-bold text-5xl text-center text-indigo-700">Simple Quiz</h1>
      <div class="bg-white p-12 rounded-lg shadow-lg w-full mt-8">
        <div v-if="questionIndex < count">
          <div>
            <p>{{ questionIndex + 1 }} / {{ count }}</p>
          </div>
          <p class="text-2xl font-bold">{{ topic[questionIndex]['title'] }}</p>
          <label
            v-for="(answer, index) in topic[questionIndex].answers"
            :key="index"
            :for="index"
            class="block mt-4 border border-gray-300 rounded-lg py-2 px-6 text-lg"
            :class="{
              'hover:bg-gray-100 cursor-pointer': selectedAnswer === '',
              'bg-green-200': answer.is_right && selectedAnswer !== '',
              'bg-red-200': selectedAnswer === answer.id && !answer.is_right,
            }"
          >
            <input
              :id="index"
              type="radio"
              class="hidden"
              :value="answer.id"
              @change="answered($event)"
              :disabled="selectedAnswer != ''"
            />
            {{ answer.title }}
          </label>
          <div class="mt-6 flex items-center justify-between">
            <button
              @click="nextQuestion"
              v-show="questionIndex < count - 1"
              class="float-right bg-indigo-600 text-white text-sm font-bold tracking-wide rounded-full px-5 py-2"
            >
              Next &gt;
            </button>
            <button
              @click="finishQuestion"
              class="float-right bg-indigo-600 text-white text-sm font-bold tracking-wide rounded-full px-5 py-2"
            >
              Finish
            </button>
          </div>
        </div>
        <div v-else>
          <h2 class="text-bold text-3xl">Results</h2>
          <div class="flex justify-start space-x-4 mt-6">
            <p>
              Correct Answers:
              <span class="text-2xl text-green-700 font-bold">{{ correctAnswers }}</span>
            </p>
            <p>
              Wrong Answers:
              <span class="text-2xl text-red-700 font-bold">{{ wrongAnswers }}</span>
            </p>
          </div>
          <div class="mt-6 flow-root">
            <button
              @click="resetQuiz"
              class="float-right bg-indigo-600 text-white text-sm font-bold tracking-wide rounded-full px-5 py-2"
            >
              Play again
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { getTopic, submitTopic } from '@/services/api';
  import { useRoute } from 'vue-router';

  const topic = ref([]);
  const loading = ref(true);
  const submitLoading = ref(false);
  const route = useRoute();
  const questionIndex = ref(0);
  const wrongAnswers = ref(0);
  const correctAnswers = ref(0);
  const selectedAnswer = ref('');
  const answeredQuestions = ref([]);
  // const router = useRouter();

  const count = computed(() => topic.value.length);

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
    submitLoading.value = true;
    submitTopic(route.params.id, answeredQuestions.value)
      .then(() => {
        console.log('success');
      })
      .finally(() => {
        submitLoading.value = false;
      });
  };

  function answered(e) {
    selectedAnswer.value = +e.target.value;
    const correct = topic.value[questionIndex.value].answers.find(item => item.is_right);
    if (selectedAnswer.value === correct?.id) {
      correctAnswers.value++;
    } else {
      wrongAnswers.value++;
    }
    answeredQuestions.value.push({ ...topic.value[questionIndex.value], answer: selectedAnswer.value });
  }
  function nextQuestion() {
    questionIndex.value++;
    selectedAnswer.value = '';
    document.querySelectorAll('input').forEach(el => (el.checked = false));
  }
  function finishQuestion() {
    questionIndex.value = count.value;
    submitTopicHandler();
  }
  function resetQuiz() {
    questionIndex.value = 0;
    selectedAnswer.value = '';
    correctAnswers.value = 0;
    wrongAnswers.value = 0;
  }

  getTopicHandler();
</script>
