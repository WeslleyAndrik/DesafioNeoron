import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    voos: [],
  },
  mutations: {
    SET_VOOS(state, voos) {
      state.voos = voos;
    },
    ADD_VOO(state, voo) {
      state.voos.push(voo);
    },
  },
  actions: {
    async fetchVoos({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/voos');
        commit('SET_VOOS', response.data);
      } catch (error) {
        console.error("Erro ao buscar voos:", error);
      }
    },
    async createVoo({ commit, state }, voo) {
      const novoVooData = new Date(voo.data);

      if (isTimeValid(state.voos, novoVooData) && isDestinationValid(state.voos, voo, novoVooData)) {
        try {
          const response = await axios.post('http://localhost:3000/voos', {
            ...voo,
            data: novoVooData.toISOString(),
          });
          commit('ADD_VOO', response.data);
        } catch (error) {
          console.error("Erro ao criar voo:", error);
        }
      } else {
        console.error("Validação falhou: Verifique as regras de agendamento.");
      }
    },
    async initStore({ dispatch }) {
      await dispatch('fetchVoos');
    },
  },
});

function isTimeValid(voos, novoVooData) {
  return voos.every(existingVoo => {
    const existingVooData = new Date(existingVoo.data);
    const diffMinutes = Math.abs((novoVooData - existingVooData) / 60000);
    return diffMinutes >= 30;
  });
}

function isDestinationValid(voos, voo, novoVooData) {
  return !voos.some(existingVoo => {
    const existingVooDate = new Date(existingVoo.data);
    return existingVoo.destino === voo.destino && existingVooDate.toDateString() === novoVooData.toDateString();
  });
}

export default store;
