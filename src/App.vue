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
        <v-btn color="primary" @click="dialog = true">Ajouter un message</v-btn>
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
      </div>  
      <div class="postit-container ">
        <draggable v-if="messages.length" :value="messages" @change="handleDragChange($event)"  @start="drag = true" v-bind="dragOptions" @end="drag = false"  ghost-class="ghost">
          <v-card class="postit" elevation="2" v-for="(message,i) in messages" :key="message.author+message.title" :style="`background-color:${message.color}`">
            <p class="title">{{message.title}}</p>
            <small>{{message.date}}</small>
            <div class="my-4 text-subtitle-1">
              {{message.text}}
            </div>
            <v-card-actions>
              <v-btn fab dark small color="grey">
                <v-icon @click="deleteDialog = true; toDelete = i;" dark>
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </draggable>
      </div>

    </v-main>
  </v-app>
</template>

<script>
// import json from './assets/postit';
import MessageForm from './components/MessageForm.vue'

import draggable from 'vuedraggable';
import moment from 'moment';

// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';


import firebase from "firebase";
import "firebase/firestore";
console.log(firebase);

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

// const firebaseConfig = {
//     apiKey: "AIzaSyAP34uluF7tN22RfJyHW3r1n5u2_3olu2A",
//     authDomain: "postit-aaed4.firebaseapp.com",
//     databaseURL: "https://postit-aaed4-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "postit-aaed4",
//     storageBucket: "postit-aaed4.appspot.com",
//     messagingSenderId: "514209411686",
//     appId: "1:514209411686:web:3196ae9f83020acab173a7"
// }
  
// const firebase = initializeApp(firebaseConfig);
// const db = getFirestore(firebase);


export default {
  name: 'App',
  data:()=>{
    return{
      drag:false,
      messages:[],
      dialog:false,
      colors: ['#B7DDC7','#6AC7B4','#FFF49C','#F3C5D5','#9FC7E4'],
      toDelete:null,
      deleteDialog:false
    }
  },
  created(){
    db.collection("posts").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.messages.push(doc.data());
      });
    });
    // const postsCol = collection(db, 'posts');
    // const postSnapshot = await getDocs(postsCol);
    // this.messages = postSnapshot.docs.map(doc => doc.data());
  },
  components: {
    draggable,
    MessageForm
  },
  computed:{
    dragOptions() {
      return {
          animation: 200,
          group: "description",
          disabled: false,
          ghostClass: "ghost"
      };
    }
  },
  methods:{
    handleDragChange(e){
      const {moved} = e;
      const el = this.messages[moved.oldIndex];
      this.messages.splice(moved.oldIndex,1);
      this.messages.splice(moved.newIndex,0,el); 
    },
    addMessage(e){
      e.date = moment().format('Do MMMM YYYY, h:mm:ss a');
      e.color =  this.colors[Math.floor(Math.random()*this.colors.length)];
      this.messages.unshift(e);
      this.dialog = false;
    },
    deleteMessage(){
      this.messages.splice(this.toDelete,1);
      this.deleteDialog = false;
    }
  }
};
</script>

<style lang="scss">
  @import './assets/scss/style.scss';
</style>