<template>
    <div class="bg-pirate">
        <h2>The Pirate Game</h2>
        <div class="board-holder">
            <div :class="['grid-stack grid-stack-' + gridWidth]"></div>
        </div>
        <div class="right-bar">
            <h2 style="margin-top:10px"> Game log </h2>
            <div class="flex-container" style="height:6%">
                <div class="flex-child" style="margin:0">
                    <h2> Stash: {{money}}</h2>
                </div>
                <div class="flex-child" style="margin:0">
                    <h2> Chest: {{bank}}</h2>
                </div>
            </div>
            <div class="flex-container" style="height:6%">
                <div class="flex-child" style="margin:0">
                    <h2> Mirror: {{mirror}}</h2>
                </div>
                <div class="flex-child" style="margin:0">
                    <h2> Shield: {{shield}}</h2>
                </div>
            </div>
            <br>
            <div class="gameLog" id="chat">
                <div class="message">
                    <h3> Welcome to the Pirate Game </h3>
                </div>
            </div>
            <div v-show="isHost">
                <div v-show="!gameStarted" class="flex-container">
                    <div v-show="!isReady" class="flex-child" style="margin-top:0">
                        <input type="button" value="Play" style="color: white; text-decoration: none;" class="big-button bg-red">
                    </div>
                    <div v-show="isReady" class="flex-child" style="margin-top:0">
                        <input type="button" value="Play" style="color: white; text-decoration: none;" class="big-button bg-green" @click="startGame">
                    </div>
                </div>
                <div v-show="gameStarted" class="flex-container">
                    <div class="flex-child" v-show="isPaused">
                        <input type="button" value="Resume" style="color: white; text-decoration: none;" class="big-button bg-green" @click="pauseGame">
                    </div>
                    <div class="flex-child" v-show="!isPaused">
                        <input type="button" value="Pause" style="color: white; text-decoration: none;" class="big-button bg-red" @click="pauseGame">
                    </div>
                    <div class="flex-child">
                        <input type="button" value="Stop" style="color: white; text-decoration: none;" class="big-button bg-red" @click="stopGame">
                    </div>
                </div>
            </div>
        </div>
        <div class="board-holder question" v-show="questionBool">
            <div class="question-box">
                <br>
                <h3> {{questionTitle}} </h3>
                <h3> {{questionSubTitle}} </h3>
                <form>
                    <select v-model="selected">
                        <option v-for="option in optionList" v-bind:value="option" v-bind:key="option">
                            {{ option }}
                        </option>
                    </select>
                    <div style="text-align: center;">
                        <input type="button" value="Submit" style="color: white; text-decoration: none;" class="big-button bg-blue" @click="submitResponse">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import Axios from '/services/axios.js';
import router from '../router/index';
import 'gridstack/dist/gridstack.min.css';
import 'gridstack/dist/gridstack-h5.js';
import { getCurrentInstance } from 'vue';
export default {
    name: 'Game',
    data: function () {
        return {
            authCode: sessionStorage.getItem('authcode'),
            gameName: sessionStorage.getItem('gamename'),
            playerName: sessionStorage.getItem('playername'),
            ship: sessionStorage.getItem("ship"),
            captaion: sessionStorage.getItem("captain"),
            mirror: 0,
            shield: 0,
            gridWidth: 7,
            gridHeight: 7,
            grid: null,
            isHost: false,
            isPaused: false,
            isReady: false,
            gameStarted: false,
            gameStateTimer: null,
            gameTimer: null,
            questionBool: false,
            selected: null,
            questionTitle: "",
            questionSubTitle: "",
            optionList: [],
            money: 0,
            bank: 0,
            currentTile: null,
        }
    },
    async mounted () {
        await this.amIhost()
        if (this.isHost == true){
            this.gameStateTimer = setInterval(this.getGameState, 1000);
        }
        await this.getGridDim()

        this.gameTimer = setInterval(this.getEvent, 4000);
        
        this.grid = GridStack.init({
            column: this.gridWidth,
            row: this.gridHeight,
            cellHeight: 90,
            disableDrag: true,
        });
        
        var items = await this.getBoard()
        this.grid.load(items, true);
    },
    methods: {
        addMessage(message){
            var div = document.createElement('div');
            div.innerHTML = '<h3>' + message + '</h3>';
            div.class = 'message'

            var chat = document.getElementById("chat")

            chat.insertBefore(div, chat.children[0]);
        },
        async pauseGame(){
            this.isPaused = !this.isPaused

            if (this.isPaused){
                console.log("pause game")
            }
            else{
                console.log("Play game")
            }
        },
        async getBoard(){
            let response = null;
            response = await Axios().post('getBoard',
                {
                    gameName: this.gameName,
                    playerName: this.playerName,
                    authCode: this.authCode
                });
            var board = response.data;
            return board
        },
        async getGridDim () {
        var response = null;
        response = await Axios().post('getGridDim',
            {
                gameName: this.gameName,
                playerName: this.playerName
            }
        );
        console.log("got grid Dimensions: " + response.data["x"] + ", " + response.data["y"])
        this.gridWidth = response.data["x"]
        this.gridHeight = response.data["y"]
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
        async getGameState(){
            var response = null;
            response = await Axios().post('getGameState',
                {
                    gameName: this.gameName,
                    playerName: this.playerName,
                    authCode: this.authCode,
                }
            );
            if (response.data["error"] != false){
                console.log(response.data["error"]);
                return;
            }
            else {
                var state = response.data["state"]
                console.log(state)
                if (state == "paused"){
                    this.isPaused = true;
                    this.isReady = false;
                }
                else if (state == "ready"){
                    //set the start button green
                    this.isPaused = false;
                    this.isReady = true;

                }
                else if (state == "active"){
                    this.isPaused = false;
                    this.isReady = false;
                }
                else if (state == "building"){
                    this.isPaused = false;
                    this.isReady = false;
                }
                else{
                    console.log("something went wrong. missed exception")
                    console.log(state)
                }
            }

        },
            async startGame(){
                this.gameStarted = true;
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
                    return;
                }
                else{
                    return
                }
            },
            async getEvent(){
                var response = null;
                response = await Axios().post('getEvent',
                    {
                        gameName: this.gameName,
                        playerName: this.playerName,
                        authCode: this.authCode,
                    }
                );
                if (response.data["error"] != false){
                    console.log(response.data["error"])
                    return
                }
                this.money = response.data["money"]
                this.bank = response.data["bank"]
                this.shield = response.data["shield"]
                this.mirror = response.data["mirror"]

                if (this.currentTile != response.data["id"]){
                    if (this.currentTile !== null){
                        console.log('[gs-id="' + this.currentTile + '"]')
                        var tile = this.grid.engine.nodes.find(n => n.id === this.currentTile).el
                        tile.children[0].className = "old-square"
                    }
                    this.currentTile = response.data["id"]
                    var tile = this.grid.engine.nodes.find(n => n.id === this.currentTile).el
                    tile.children[0].className = "current-square"
                }
                var events = response.data["events"]
                var questions = response.data["questions"]
                for (var i = 0; i < events.length; i++){
                    this.addMessage(events[i])
                }
                if (questions.length != 0) {
                    clearInterval(this.gameTimer)
                    this.questionBool = true
                    this.questionTitle = questions[0]["labels"][0]
                    if (questions[0]["labels"].length > 1) {
                        this.questionSubTitle = questions[0]["labels"][1]
                    }
                    this.optionList = questions[0]["options"]
                }
            },
            async submitResponse(){
                this.questionBool = false;
                var response = null;
                response = await Axios().post('submitResponse',
                    {
                        gameName: this.gameName,
                        playerName: this.playerName,
                        authCode: this.authCode,
                        choice: this.selected,
                    }
                );
                this.gameTimer = setInterval(this.getEvent, 4000);
            }
    }
}

</script>