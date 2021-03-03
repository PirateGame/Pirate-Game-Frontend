<template>
    <div class="bg-generic">
        <h1 class="title">You're In!</h1>
        <h2>Please wait while the host starts the game.</h2>
        <h2>Here is a guide on how to play the game.</h2>
        <h2> game state: {{gameState}} </h2>
        <router-link :to="{ name: 'Rules'}" target="_blank">
            <input type="button" value="Rules" style="color: white; text-decoration: none; width:50%; margin:2%" class="big-button bg-genericButton">
        </router-link>
        <div v-show="isHost" style="margin:0">
            <div v-show="!isReady" class="flex-child" style="margin-top:0">
                <input type="button" value="Play" style="color: white; text-decoration: none; width:50%; margin:2%" class="big-button bg-red">
            </div>
            <div v-show="isReady" class="flex-child" style="margin-top:0">
                <input type="button" value="Play" style="color: white; text-decoration: none; width:53%; margin:2%" class="big-button bg-green" @click="startGame">
            </div>
        </div>
    </div>
</template>
<script>
import router from '../router/index';
export default {
    name: 'WaitingRoom',
    data: function () {
        return {
            authCode: this.$store.state.authCode,
            gameName: this.$store.state.gameName,
            playerName: this.$store.state.playerName,
            gridWidth: this.$store.state.gridWidth,
            gridHeight: this.$store.state.gridGHeight,
            ship: this.$store.state.ship,
            captain: this.$store.state.captain,
            gameState: "unknown",
            timerID: null,
            isHost: false,
            isReady: false,
        }
    },
    async mounted () {
        this.amIhost()

        if (this.$socket.connected){this.$socket.emit('requestGameState', {gameName: this.gameName});}
        else{console.log("not connected to server")}

        this.$socket.on("status", (data) => {
            this.gameState = data["state"]
            console.log(this.gameState)
            if (this.gameState == "ready") {
                this.isReady = true
            }
            if (this.gameState == "started") {
                router.push("/Game")
            }
        });
    },
    methods: {
        async amIhost(){
            if (this.$socket.connected){
                this.$socket.emit('amIHost',
                {
                    gameName: this.gameName,
                    playerName: this.playerName,
                    authCode: this.authCode,
                }
            );
            await this.$socket.on('amIHostResponse', (data) => {
                    if (data["error"] != false){
                        alert(data["error"]);
                        return;
                    }else{
                        this.isHost = true;
                    }
                });
            }
        },
        async startGame(){
            if (this.$socket.connected){
                this.$socket.emit('startGame',
                {
                    gameName: this.gameName,
                    playerName: this.playerName,
                    authCode: this.authCode,
                });
                await this.$socket.on('startGameResponse', (data) => {
                    if (data["error"] != false){
                        alert(data["error"]);
                        return;
                    }
                });
            }
        }
    }
}

</script>
