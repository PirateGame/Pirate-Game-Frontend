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
                <br>
                <input class="float-left" id="random"  type="checkbox" name="Randomize only" v-bind:value="false" v-model='randomizeOnly'>
                <label for="random">Randomize Boards Only</label>
                <div style="text-align: center;">
                    <input type="button" value="Start" style="color: white; text-decoration: none;" class="big-button bg-blue" @click="startGame">
                </div>
            </div>
            <div class="config-box float-left flex-child">
                <h1 class="title">Players</h1>
                    <li v-for="item in clientList">
                        {{item}}
                    </li>
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
            randomizeOnly: false,
            clientList: null
        }
    },
    async created () {
        this.getPlayers()
        this.timer = setInterval(this.getPlayers, 5000);
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
            response = await Axios().post('startGame',
                {
                    gameName: this.gameName,
                    authCode: this.authCode,
                    playerName: this.playerName,
                });
            if (response.data["game"] == false){
                alert("an error has occured")
            }
            alert("game started")
            clearInterval(this.timer)
            //router.push("/PickTeam")
        }
    }
}
</script>
