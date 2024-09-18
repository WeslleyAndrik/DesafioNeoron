<template>
  <div id="app">
    <a-layout>
      <a-layout-header>
        <h1 style="color: white;">Gerenciamento de Vôos</h1>
      </a-layout-header>
      <a-layout-content style="padding: 20px;">
        <VooForm @onSuccess="fetchVoos" />
        <VooList />
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import VooForm from './components/VooForm.vue';
import VooList from './components/VooList.vue';

export default {
  components: {
    VooForm,
    VooList,
  },
  methods: {
    fetchVoos() {
      
      this.$store.dispatch('fetchVoos');
    },
  },
};
</script>

<style>

#app {
  min-height: 100vh;
  background: #f0f2f5; 
}
</style>
