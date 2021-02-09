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
            authCode: sessionStorage.getItem('authcode'),
            gameName: sessionStorage.getItem('gamename'),
            playerName: sessionStorage.getItem('playername'),
            ship: sessionStorage.getItem("ship"),
            captain: sessionStorage.getItem("captain"),
            gridWidth: sessionStorage.getItem("gridWidth"),
            gridHeight: sessionStorage.getItem("gridHeight"),
            gameState: "unknown",
            timerID: null,
            isHost: false,
            isReady: false,
        }
    },
    async created () {
        this.amIhost()
        this.$socket.on("lobbyCheck", (data) => {
            this.gameState = data["state"]
            console.log(this.gameState)
            if (this.gameState == "ready") {
                this.isReady = true
            }
            if (this.gameState == "started") {
                router.push("/Game")
            }
            sessionStorage.setItem('authcode', this.authCode);
            sessionStorage.setItem('gamename', this.gameName);
            sessionStorage.setItem('playername', this.playerName);
            sessionStorage.setItem('gridWidth', this.gridWidth);
            sessionStorage.setItem('gridHeight', this.gridHeight);
            sessionStorage.setItem('captain', this.captain);
            sessionStorage.setItem('ship', this.ship);
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
                    sessionStorage.setItem('authcode', this.authCode);
                    sessionStorage.setItem('gamename', this.gameName);
                    sessionStorage.setItem('playername', this.playerName);
                    sessionStorage.setItem('gridWidth', this.gridWidth);
                    sessionStorage.setItem('gridHeight', this.gridHeight);
                    sessionStorage.setItem('captain', this.captain);
                    sessionStorage.setItem('ship', this.ship);
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
                    }else{
                        console.log(data)
                    }
                    sessionStorage.setItem('authcode', this.authCode);
                    sessionStorage.setItem('gamename', this.gameName);
                    sessionStorage.setItem('playername', this.playerName);
                    sessionStorage.setItem('gridWidth', this.gridWidth);
                    sessionStorage.setItem('gridHeight', this.gridHeight);
                    sessionStorage.setItem('captain', this.captain);
                    sessionStorage.setItem('ship', this.ship);
                });
            }
        }
    }
}

</script>
