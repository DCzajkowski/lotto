<template>
    <div class='menubar'>
        <div class='shop' @click="change"></div>
        <div class="logo"></div>
        <div class="tickets">
            <span class="ticket"/>
            <p class="ticketnr">{{$store.state.tickets}}</p>    
        </div>
    </div>
</template>


<style>
.shop{
    height: 40px;
    width: 40px;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url('../assets/shoping.svg');
}
.menubar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    width: calc(100vw - 30px);
    position: absolute;
    padding: 0px 15px;
    top: 0;
    z-index: 2;
    color: #f78d1d;
    /* background: linear-gradient(180deg, rgba(43, 43, 43,0.7) 0%, rgba(0, 0, 0,0) 100%); */
    background-color: white;
    box-shadow: 0 0 5px #333;
}
.logo{
    height: 60px;
    /* margin-bottom: 10px; */
    width: 100px;
    position: absolute;
    left: calc(50% - 50px);
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url('https://upload.wikimedia.org/wikipedia/commons/5/50/Lotto_logo_polska.svg');
}
.tickets{
    border-radius: 12px;
    height: 24px;
    display: flex;
    align-items: center;

}
.ticketnr{
    font-size: 24px;
    font-weight: 700;
    color: #f78d1d;

}
.ticket{
    height: 20px;
    width: 20px;
    margin-right: 6px;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url(../assets/ticket.svg);
    background-size: contain;
}

</style>
 
 

<script>
import Hamburger from "@/components/Hamburger.vue";

export default {
    components: {
        Hamburger,
    },
    data(){
        return {
        }
    },
    methods:{
        change(){
            this.$store.state.expanded= true
            if (this.$store.state.phase != -1){
                this.$store.state.old = this.$store.state.phase; this.$store.state.phase=-1;
            }else{
                this.$store.state.phase= this.$store.state.old 
            }
            
        }
    }
};
</script>