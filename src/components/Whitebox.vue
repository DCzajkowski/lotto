<template>
    <div class="whitebox" @click="$store.state.expanded = true" :class="classes">
        <slot/>
    </div>
</template>

<style>
    .whitebox{
        position: absolute;
        width: 100vw;
        height: 700px;
        background-color: white;
        z-index: 2;
        margin-top:  -60px;
        transition: margin 0.4s ease-in-out;
         box-shadow: 0 0 2px #666;
    }
    .expanded{
        margin-top:  -300px;
    }
    .animating{
        margin-top:  -450px;
    }
</style>

<script>
export default {
    computed:{
        classes(){
            let classes='';
            this.$store.state.expanded ? classes+='expanded':'';
            this.$store.state.animation ? classes+=' animating':''
            return classes
        }
    }
}
</script>


