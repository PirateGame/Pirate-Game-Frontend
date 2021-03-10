<template>
    <div class="bg-generic">
        <div class="flex-container" style="height:100%">
            <div class="config-box flex-child">
                <div class="flex-vertical-container" style="width:100%">
                    <h1 class="title flex-child">Host Panel</h1>
                    <h3 class="flex-child">Game Name: {{gameName}}</h3>
                    <div class="flex-child">
                        <h3 class="float-left">Decision Time = {{ DecisionTime }}</h3>
                        <div class="input-container">
                            <input type="range" min="10" max="45" step=5 :size='DecisionTime' class="slider" v-model='DecisionTime'>
                        </div>
                        <h3 class="float-left">Player Limit = {{ playerLimit }}</h3>
                        <div class="input-container">
                            <input type="range" min="2" max="20" step=1 :size='playerLimit' class="slider" v-model='playerLimit'>
                        </div>
                    </div>
                    <br>
                    <div class="flex-child">
                        <div class="flex-container">
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
                    </div>
                    <div class="flex-child" style="flex-grow:3">
                        <input type="button" value="Add AI Player" style="color: white; text-decoration: none; margin-top:5%;" class="big-button bg-genericButton" @click="addAI">
                        <input type="button" value="Start" style="color: white; text-decoration: none; margin-top:5%;" class="big-button bg-genericButton" @click="startGame">
                    </div>
                </div>
            </div>
            <div class="config-box flex-child" style="margin:6%; height:77%">
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
            authCode: this.$store.state.authCode,
            gameName: this.$store.state.gameName,
            playerName: this.$store.state.playerName,
            gridWidth: this.$store.state.gridWidth,
            gridHeight: this.$store.state.gridGHeight,
            DecisionTime: 30,
            randomiseOnly: false,
            naughty: false,
            similar: false,
            clientList: null,
            playerLimit: 12,
        }
    },
    async mounted () {
        if (this.$socket.connected){this.$socket.emit('requestPlayerList', {gameName: this.gameName});}
        else{console.log("not connected to server")}

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
                await this.$socket.on('modifyGameResponse', (data) => {
                    if (data["error"] != false){
                        alert(data["error"]);
                        return;
                    }else{
                        console.log("saved settings")
                    }
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
                await this.$socket.on('kickPlayerResponse', (data) => {
                    if (data["error"] != false){
                        alert(data["error"]);
                        return;
                    }else{
                        console.log("kicked player")
                    }
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
                await this.$socket.on('addAIResponse', (data) => {
                    if (data["error"] != false){
                        alert(data["error"]);
                        return;
                    }
                    else{
                        console.log("added AI")
                    }
                });
            }
        }
    }
}


</script>
