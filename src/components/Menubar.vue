<template>
    <div class='menubar'>
        <hamburger/>
        <div class="logo"></div>
        <div class="tickets">
            <span class="ticket"/>
            <p class="ticketnr">{{tickets}}</p>    
        </div>
    </div>
</template>


<style>
.menubar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    width: calc(100vw - 30px);
    position: absolute;
    padding: 0px 15px;
    top: 0;
    z-index: 1;
    background: linear-gradient(180deg, rgba(43, 43, 43,0.7) 0%, rgba(0, 0, 0,0) 100%);
}
.logo{
    height: 60px;
    margin: 10px 0px; 
    width: 100px;
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
    width: 50px;
}
.ticketnr{
    font-size: 24px;
    font-weight: 700;
    color: white;

}
.ticket{
    height: 24px;
    width: 24px;
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
            tickets: 5,
        }
    }
};
</script>