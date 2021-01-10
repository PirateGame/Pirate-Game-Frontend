<template>
    <div class="bg-pirate">
        <div class="flex-container">
            <div class="config-box float-left flex-child">
                <h1 class="title">Host Panel</h1>
                <h3>Game Name: {{gameName}}</h3>
                <h3 class="float-left">Decision Time = {{ DecisionTime }}</h3>
                <div class="input-container">
                    <input type="range" min="10" max="45" step=5 :size='DecisionTime' class="slider" v-model='DecisionTime'>
                </div>
                <h3 class="float-left">Player Limit = {{ playerLimit }}</h3>
                <div class="input-container">
                    <input type="range" min="2" max="20" step=1 :size='playerLimit' class="slider" v-model='playerLimit'>
                </div>
                <br>

                <div class="flex-container" style="height: 20%">
                    <div class="flex-child">
                        <input class="float-left" id="random"  type="checkbox" name="Randomize only" v-bind:value="false" v-model='randomiseOnly'>
                        <label for="random">Randomise Boards Only</label>
                        <br>
                        <input class="float-left" id="naughty"  type="checkbox" name="block naughty" v-bind:value="false" v-model='naughty'>
                        <label for="naughty">Block Naughty Names</label>
                        <br>
                        <input class="float-left" id="similar"  type="checkbox" name="block similar" v-bind:value="false" v-model='similar'>
                        <label for="similar">Block Similar names</label>
                    </div>
                    <div class="flex-child" style="text-align: center;">
                        <input type="button" value="Save" style="color: white; text-decoration: none; margin:1%;" class="big-button bg-joinColour" @click="saveSettings">
                    </div>
                </div>
                <div style="text-align: center;">
                    <input type="button" value="Start" style="color: white; text-decoration: none; margin:1%;" class="big-button bg-hostColour" @click="startGame">
                </div>
            </div>
            <div class="config-box float-left flex-child">
                <h1 class="title">Players</h1>
                    <h3 type="button" v-for="item in clientList"  v-bind:key="item" class="kickplayer-button" @click="kickPlayer(item)">
                        {{item}}
                    </h3>
            </div>
        </div>
    </div>
</template>
<script>
import Axios from '/services/axios.js';
import router from '../router/index';
export default {
    name: 'HostPanel',
    data: function () {
        return {
            authCode: sessionStorage.getItem('authcode'),
            gameName: sessionStorage.getItem('gamename'),
            playerName: sessionStorage.getItem('playername'),
            DecisionTime: 30,
            randomiseOnly: false,
            naughty: false,
            similar: false,
            clientList: null,
            timerID: null,
            playerLimit: 12,
        }
    },
    async created () {
        this.getPlayers()
        this.timerID = setInterval(this.getPlayers, 5000);
    },
    methods: {
        async getPlayers(){
            let response = null;
            response = await Axios().post('getPlayers',
                {
                    gameName: this.gameName
                });
            if (response.data["game"] == false){
                alert("game not found")
            }
            this.clientList = response.data["names"]
        },
        async startGame(){
            let response = null;
            response = await Axios().post('startBuilding',
                {
                    gameName: this.gameName,
                    authCode: this.authCode,
                    playerName: this.playerName,
                });
            if (response.data["game"] == false){
                alert("an error has occured")
            }
            if (response.data["auth"] == false){
                alert("authentication failed")
            }
            else{
                clearInterval(this.timerID)
                router.push("/PickTeam")
            } 
        },
        async saveSettings(){
            let response = null;
            response = await Axios().post('modifyGame',
                {
                    gameName: this.gameName,
                    authCode: this.authCode,
                    playerName: this.playerName,
                    naughty: this.naughty,
                    similar: this.similar,
                    DecisionTime: this.DecisionTime,
                    randomiseOnly: this.randomiseOnly,
                    playerLimit: this.playerLimit,
                });
            if (response.data["error"] != false){
                console.log(response.data["error"])
            }
        },
        async kickPlayer(playerToKick){
            let response = null;
            response = await Axios().post('kickPlayer',
                {
                    gameName: this.gameName,
                    authCode: this.authCode,
                    playerName: this.playerName,
                    playerToKick: playerToKick,
                    
                });
            if (response.data["error"] != false){
                console.log(response.data["error"])
            }
        }
    }
}
</script>
