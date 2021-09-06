import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);


export default new Vuetify({
    theme: { 
        light: true ,
        themes :{
            light: {
                primary: '#3AC2A6',
                secondary: '#349ACF',
                accent: '#7E5899',
                error: '#E66C9B',
            }
        }
    }
});