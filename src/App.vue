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
      <div class="d-flex flex-column pa-5 pb-0">
        <v-btn color="primary" class="ma-auto mb-0" large @click="dialog = true">Ajouter un message</v-btn>
        <v-dialog transition="dialog-bottom-transition" max-width="600" v-model="deleteDialog" >
          <v-card>
            <v-toolbar color="pink" dark >Supprimer un message</v-toolbar>
            <p class="mt-5 pa-5">Supprimer ce message ?</p>
            <v-btn dark class="ml-5 pink" @click="deleteMessage();">Supprimer</v-btn>
            <v-card-actions class="justify-end">
                <v-btn text @click="deleteDialog = false" >Annuler</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog transition="dialog-bottom-transition" max-width="600" v-model="dialog" >
          <v-card>
            <v-toolbar color="primary" dark >Ajouter un message</v-toolbar>
            <message-form @new="addMessage($event)"></message-form>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialog = false" >Annuler</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <div class="d-flex align-center justify-md-start justify-space-between">
          <p class="title mt-5">Les derniers messages : <small class="caption d-block">(reload dans <countdown init="30" :key="refreshed" @finish="refresh"></countdown>s )</small></p>
          <v-btn class="ml-5" fab dark small color="grey" :disabled="loading">
                <v-icon @click="refresh" dark>
                  mdi-reload
                </v-icon>
              </v-btn>
        </div>
      </div>  
      <div  class="postit-container ">
        <div v-if="messages.length && !loading">
          <v-card class="postit" elevation="2" v-for="(message) in messages" :key="message.id" :style="`background-color:${message.color}`">
            <small><strong>De {{message.author}}</strong> </small> 
            <small> le {{message.date}}</small>
            <div class="my-4 text-subtitle-1">
              {{message.text}}
            </div>
            <v-card-actions>
              <v-btn fab dark small color="grey">
                <v-icon @click="deleteDialog = true; toDelete = message.id;" dark>
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <v-progress-circular
          v-else-if="loading"
          :size="50"
          color="primary"
          indeterminate
          class="pa-5"
        ></v-progress-circular>
      </div>

    </v-main>
  </v-app>
</template>

<script>

import MessageForm from './components/MessageForm.vue';
import Countdown from './components/Countdown.vue';


import moment from 'moment';
moment.locale('fr')


import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyAP34uluF7tN22RfJyHW3r1n5u2_3olu2A",
  authDomain: "postit-aaed4.firebaseapp.com",
  databaseURL: "https://postit-aaed4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "postit-aaed4",
  storageBucket: "postit-aaed4.appspot.com",
  messagingSenderId: "514209411686",
  appId: "1:514209411686:web:3196ae9f83020acab173a7"
});

const db = firebase.firestore();

export default {
  name: 'App',
  components: {
    MessageForm,
    Countdown
  },
  data:()=>{
    return{
      drag:false,
      messages:[],
      dialog:false,
      colors: ['#B7DDC7','#6AC7B4','#FFF49C','#F3C5D5','#9FC7E4'],
      toDelete:null,
      deleteDialog:false,
      loading: true,
      refreshed: 0
    }
  },
  async created(){
    await this.getPostsFromFirebase();
    this.loading = false;
  },
  computed:{
  },
  methods:{
    getPostsFromFirebase(){
      this.loading = true;
      return db.collection("posts").get().then((querySnapshot) => {
        this.messages = querySnapshot.docs.map(e=>{return {id: e.id, ...e.data()}}).sort((a,b)=>b.order-a.order);
      });
    },
    async refresh(){
      try{
        await this.getPostsFromFirebase();
        this.refreshed++;
        this.loading = false;
      }catch(e){
        alert('Une erreur est survenue');
      }
    },
    handleDragChange(e){
      const {moved} = e;
      const el = this.messages[moved.oldIndex];
      this.messages.splice(moved.oldIndex,1);
      this.messages.splice(moved.newIndex,0,el); 
    },
    addMessage(e){
      this.loading = true;
      e.date = moment().format('Do MMMM YYYY, h:mm a');
      e.color =  this.colors[Math.floor(Math.random()*this.colors.length)];
      e.order = this.messages.length;
      this.dialog = false;

      db.collection("posts").doc().set(e)
      .then(async () => {
        await this.getPostsFromFirebase();
      })
      .catch((error) => {
          console.error("Error writing document: ", error);
      }).finally(()=>{
        this.loading = false;
      });

    },
    deleteMessage(){
      db.collection("posts").doc(this.toDelete).delete().then(async () => {
        this.toDelete = null;
        this.loading = true;
        await this.getPostsFromFirebase();
      }).catch((error) => {
          console.error("Error removing document: ", error);
      }).finally(()=>{
        this.loading=false;
        this.deleteDialog = false;
      });
    }
  }
};
</script>

<style lang="scss">
  @import './assets/scss/style.scss';
</style>