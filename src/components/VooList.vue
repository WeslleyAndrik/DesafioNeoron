<template>
    <a-table :dataSource="voos" :columns="columns" rowKey="id" />
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    computed: {
      ...mapState(['voos']),
      columns() {
        return [
          {
            title: 'Código',
            dataIndex: 'codigo',
          },
          {
            title: 'Origem',
            dataIndex: 'origem',
            customRender: (text) => this.renderLocalidade(text),
          },
          {
            title: 'Destino',
            dataIndex: 'destino',
            customRender: (text) => this.renderLocalidade(text),
          },
          {
            title: 'Data',
            dataIndex: 'data',
            customRender: (text) => new Date(text).toLocaleString(),
          },
        ];
      },
    },
    methods: {
      renderLocalidade(localidade) {
        return `${localidade.cidade}, ${localidade.estado} - ${localidade.cep}`;
      },
    },
    mounted() {
      this.$store.dispatch('fetchVoos');
    },
  };
  </script>
  
  <style scoped>
 
  </style>
  