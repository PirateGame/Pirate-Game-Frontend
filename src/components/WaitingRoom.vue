<template>
    <div class="bg-pirate">
        <h1 class="title">You're In!</h1>
        <h2>Please wait while the host starts the game.</h2>
        <h2>Here is a guide on how to play the game.</h2>
        <h2> game state: {{gameState}} </h2>
        <div v-show="isHost">
            <div v-show="!isReady" class="flex-child" style="margin-top:0">
                <input type="button" value="Play" style="color: white; text-decoration: none;" class="big-button bg-red">
            </div>
            <div v-show="isReady" class="flex-child" style="margin-top:0">
                <input type="button" value="Play" style="color: white; text-decoration: none;" class="big-button bg-green" @click="startGame">
            </div>
        </div>
    </div>
</template>
<script>
import Axios from '/services/axios.js';
import router from '../router/index';
export default {
    name: 'WaitingRoom',
    data: function () {
        return {
            authCode: sessionStorage.getItem('authcode'),
            gameName: sessionStorage.getItem('gamename'),
            playerName: sessionStorage.getItem("playername"),
            gameState: "unknown",
            timerID: null,
            isHost: false,
            isReady: false,
        }
    },
    async created () {
        this.timerID = setInterval(this.gameCheck, 5000);
        this.amIhost()
        this.gameCheck()
    },
    methods: {
        async gameCheck(){
            let response = null;
            response = await Axios().post('lobbyCheck',
                {
                    gameName: this.gameName,
                    playerName: this.playerName,
                    authCode: this.authCode,
                });
            if (response.data["error"] != false){
                console.log(response.data["error"])
            }
            this.gameState = response.data["state"]
            console.log(this.gameState)
            if (this.gameState == "ready") {
                this.isReady = true
            }
            if (this.gameState == "started") {
                router.push("/Game")
            }
        },
        async amIhost(){
            var response = null;
            response = await Axios().post('amIHost',
                {
                    gameName: this.gameName,
                    playerName: this.playerName,
                    authCode: this.authCode,
                }
            );
            if (response.data["error"] != false){
                console.log(response.data["error"])
                return;
            }
            else{
                this.isHost = true;
            }
        },
        async startGame(){
                clearInterval(this.gameStateTimer)
                var response = null;
                response = await Axios().post('startGame',
                    {
                        gameName: this.gameName,
                        playerName: this.playerName,
                        authCode: this.authCode,
                    }
                );
                if (response.data["error"] != false){
                    console.log(response.data["error"]);
                }
                else {
                    this.gameCheck()
                }
            },

    }
}

</script>
