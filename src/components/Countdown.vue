<template>
    <span>{{seconds}}</span>
</template>

<script>
export default {
    name: "countwdown",
    data(){
        return {
            seconds : 0,
            counter : null
        }
    },
    props:["init"],
    created(){
        this.seconds = this.init;
        const v = this;
        this.counter = setInterval(function(){
            if(v.seconds > 0){
                v.seconds--;
            }else{
                clearInterval(v.counter);
                v.$emit('finish');
            }
        },1000);
    },
    methods:{

    }
}
</script>
