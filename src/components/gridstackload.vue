<template>
    <div class="bg-gamepage">
        <div class="board-holder">
            <div class="grid-stack"></div>
        </div>
    </div>
</template>
<script>
import router from '../router/index';
export default {
    name: 'gridstackload',
    data: function () {
        return {
            authCode: this.$store.state.authCode,
            gameName: this.$store.state.gameName,
            playerName: this.$store.state.playerName,
            gridWidth: this.$store.state.gridWidth,
            gridHeight: this.$store.state.gridHeight,
        }
    },
    async mounted () {
       

        //load grids
        this.grid = GridStack.init();
        router.push("/DesignBoard")
    },
    methods: {
    }
}

</script>