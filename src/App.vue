<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">

        <h1>📮 Jobtimise Post-it </h1>
      </div>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <div class="d-flex pa-5">
        <p class="pa-2">Laisser votre message ici :</p>
        <v-btn color="primary">Ajouter un message</v-btn>
      </div>  
      <div class="d-flex "></div>

    </v-main>
  </v-app>
</template>

<script>
import messages from './assets/postit';

export default {
  name: 'App',
  data:()=>{
    return{
      messages:messages.messages
    }
  },
  components: {
  }
};
</script>

<style lang="scss">
  @import './assets/scss/style.scss';
</style>