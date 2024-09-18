<template>
    <a-form @submit.prevent="submitForm">
      <a-row :gutter="16">
        <a-col span="12">
          <h3>Origem</h3>
          <a-form-item label="CEP" :rules="[{ required: true, message: 'Por favor, insira o CEP' }]">
            <a-input v-model="origem.cep" />
          </a-form-item>
          <a-form-item label="País" :rules="[{ required: true, message: 'Por favor, insira o país' }]">
            <a-input v-model="origem.pais" />
          </a-form-item>
          <a-form-item label="Cidade" :rules="[{ required: true, message: 'Por favor, insira a cidade' }]">
            <a-input v-model="origem.cidade" />
          </a-form-item>
          <a-form-item label="Estado" :rules="[{ required: true, message: 'Por favor, insira o estado' }]">
            <a-input v-model="origem.estado" />
          </a-form-item>
        </a-col>
        <a-col span="12">
          <h3>Destino</h3>
          <a-form-item label="CEP" :rules="[{ required: true, message: 'Por favor, insira o CEP' }]">
            <a-input v-model="destino.cep" />
          </a-form-item>
          <a-form-item label="País" :rules="[{ required: true, message: 'Por favor, insira o país' }]">
            <a-input v-model="destino.pais" />
          </a-form-item>
          <a-form-item label="Cidade" :rules="[{ required: true, message: 'Por favor, insira a cidade' }]">
            <a-input v-model="destino.cidade" />
          </a-form-item>
          <a-form-item label="Estado" :rules="[{ required: true, message: 'Por favor, insira o estado' }]">
            <a-input v-model="destino.estado" />
          </a-form-item>
        </a-col>
      </a-row>
  
      <a-form-item label="Data e Hora" :rules="[{ required: true, message: 'Por favor, selecione a data e hora' }]">
        <a-date-picker
          v-model="data"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
        />
      </a-form-item>
  
      <a-button type="primary" html-type="submit">{{ isEdit ? 'Atualizar Voo' : 'Salvar Voo' }}</a-button>
    </a-form>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        origem: {
          cep: '',
          pais: '',
          cidade: '',
          estado: ''
        },
        destino: {
          cep: '',
          pais: '',
          cidade: '',
          estado: ''
        },
        data: null,
        isEdit: false,
        id: null, // Para armazenar o ID do voo, se estiver editando
      };
    },
    methods: {
      ...mapActions(['createVoo', 'updateVoo']),
      async submitForm() {
        const payload = {
          origem: this.origem,
          destino: this.destino,
          data: this.data,
        };
  
        try {
          if (this.isEdit) {
            await this.updateVoo({ id: this.id, ...payload });
          } else {
            await this.createVoo(payload);
          }
          this.resetForm();
        } catch (error) {
          console.error('Erro ao salvar voo:', error);
          // Aqui você pode exibir uma mensagem de erro ao usuário
        }
      },
      resetForm() {
        this.origem = { cep: '', pais: '', cidade: '', estado: '' };
        this.destino = { cep: '', pais: '', cidade: '', estado: '' };
        this.data = null;
        this.isEdit = false;
        this.id = null; // Resetar o ID ao reiniciar o formulário
      },
      editVoo(voo) {
        this.origem = voo.origem;
        this.destino = voo.destino;
        this.data = voo.data;
        this.isEdit = true;
        this.id = voo.id; // Assume que o voo possui um campo 'id'
      }
    },
  };
  </script>
  
  <style scoped>
  /* Adicione estilos específicos, se necessário */
  </style>
  