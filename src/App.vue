<template>
  <div id="app">
    <div v-for="message in messages" :key="message.title">
      <p>{{message.title}}</p>
    </div>
  </div>
</template>

<script>
import messages from './assets/postit.js'

export default {
  name: 'App',
  data:()=>{
    return {
      messages: messages.messages
    }
  },
  components: {
  },
  created(){
    
  }
}
</script>

<style>

@import 'assets/scss/style.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


</style>
