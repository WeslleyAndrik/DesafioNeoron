import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      voos: [],
    };
  },
  mutations: {
    setVoos(state, voos) {
      state.voos = voos;
    },
  },
  actions: {
    async fetchVoos({ commit }) {
      try {
        const response = await fetch('/api/voos');
        const data = await response.json();
        commit('setVoos', data);
      } catch (error) {
        console.error("Erro ao buscar voos:", error);
      }
    },
  },
});

const app = createApp(App);

// Usar Ant Design Vue
app.use(Antd);

// Usar Vuex
app.use(store);

app.mount('#app');
