<template>
    <validation-observer ref="observer" v-slot="{ invalid }" >
        <form @submit.prevent="submit" class="pa-5">
        
            <validation-provider v-slot="{ errors }" name="text" rules="required|min:2" >
                <v-text-field v-model="newMessage.text"  :error-messages="errors" label="Ton message" required></v-text-field>
            </validation-provider>
            <validation-provider v-slot="{ errors }" name="author" rules="required|min:2" >
                <v-text-field v-model="newMessage.author"  :error-messages="errors" label="Auteur" required></v-text-field>
            </validation-provider>
            <v-btn class="mr-4" type="submit" :disabled="invalid">Poster</v-btn>
            <v-btn @click="clear">Vider</v-btn>
        </form>
    </validation-observer>
</template>

<script>
import { required, min } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')


extend('required', {
...required,
message: '{_field_} ne peut pas être vide',
})

extend('min', {
...min,
message: 'Minimum 2 caractères',
})


export default {
    name:"MessageForm",
    created(){},
    components:{
        ValidationProvider,
        ValidationObserver,
    },
    data(){
        return {
            newMessage:{
                text:"",
                author:""
            },

        }
    },
    methods:{
        submit () {
            this.$refs.observer.validate();
            this.$emit('new',this.newMessage);
            this.clear();
        },
        clear () {
            this.newMessage={
                text:"",
                title:"",
                author:""
            }
            this.$refs.observer.reset()
        },
    }
}
</script>

<style>

</style>