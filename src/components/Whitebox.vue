<template>
    <div class="whitebox" @click="$store.state.expanded = true" :class="$store.state.expanded ? 'expanded':''"></div>
</template>

<style>
    .whitebox{
        position: absolute;
        width: 100vw;
        height: 300px;
        background-color: white;
        z-index: 2;
        margin-top:  -50px;
        transition: margin 0.4s ease-in-out;
         box-shadow: 0 0 2px #666;
    }
    .expanded{
        margin-top:  -300px;
    }
</style>

<script>
export default {

}
</script>


