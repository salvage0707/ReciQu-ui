<template>
  <v-app>
    <Header/>
    <v-main>
      <v-container class="main-container">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from './views/layout/Header';

export default {
  name: 'App',

  components: {
    Header
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
.main-container {
  margin-top: 20px;
}
</style>
