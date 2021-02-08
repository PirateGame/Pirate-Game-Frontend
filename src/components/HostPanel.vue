<template>
    <div class="bg-generic">
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
                        <input type="button" value="Save" style="color: white; text-decoration: none; margin:1%;" class="big-button bg-genericButton" @click="saveSettings">
                    </div>
                </div>
                <div style="text-align: center;">
                    <input type="button" value="Add AI Player" style="color: white; text-decoration: none; margin:1%; vertical-align: bottom;" class="big-button bg-genericButton" @click="addAI">
                    <input type="button" value="Start" style="color: white; text-decoration: none; margin:1%;" class="big-button bg-genericButton" @click="startGame">
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
import router from '../router/index';
export default {
    name: 'HostPanel',
    data: function () {
        return {
            authCode: sessionStorage.getItem('authcode'),
            gameName: sessionStorage.getItem('gamename'),
            playerName: sessionStorage.getItem('playername'),
            ship: sessionStorage.getItem("ship"),
            captain: sessionStorage.getItem("captain"),
            gridWidth: sessionStorage.getItem("gridWidth"),
            gridHeight: sessionStorage.getItem("gridHeight"),
            DecisionTime: 30,
            randomiseOnly: false,
            naughty: false,
            similar: false,
            clientList: null,
            playerLimit: 12,
        }
    },
    async mounted () {
        this.$socket.on("playerList", (data) => {
            this.clientList = data["names"]
        });
    },
    methods: {
        async startGame(){
            router.push("/PickTeam")
        },
        async saveSettings(){
            if (this.$socket.connected){
                this.$socket.emit('modifyGame',
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
                await this.$socket.on('response', (data) => {
                    if (data["error"] != false){
                        alert(data["error"]);
                        return;
                    }else{
                        console.log("saved settings")
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
        async kickPlayer(playerToKick){
            if (this.$socket.connected){
                this.$socket.emit('kickPlayer',
                    {
                        gameName: this.gameName,
                        authCode: this.authCode,
                        playerName: this.playerName,
                        playerToKick: playerToKick,
                    }
                );
                await this.$socket.on('response', (data) => {
                    if (data["error"] != false){
                        alert(data["error"]);
                        return;
                    }else{
                        console.log("kicked player")
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
        async addAI(){          
            if (this.$socket.connected){
                this.$socket.emit('addAI',
                    {
                        gameName: this.gameName,
                        authCode: this.authCode,
                        playerName: this.playerName,
                    }
                );
                await this.$socket.on('response', (data) => {
                    if (data["error"] != false){
                        alert(data["error"]);
                        return;
                    }
                    else{
                        console.log("added AI")
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
