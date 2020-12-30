<template>
    <div class="bg-pirate">
        <h2>The Pirate Game</h2>
        <div class="board-holder">
            <div :class="['grid-stack grid-stack-' + gridWidth]"></div>
        </div>
        <div class="right-bar">
            <h2> Game log </h2>
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
                        <input type="button" value="Play" style="color: white; text-decoration: none;" class="big-button bg-red" @click="pauseGame">
                    </div>
                    <div class="flex-child" v-show="!isPaused">
                        <input type="button" value="Pause" style="color: white; text-decoration: none;" class="big-button bg-blue" @click="pauseGame">
                    </div>
                    <div class="flex-child">
                        <input type="button" value="Stop" style="color: white; text-decoration: none;" class="big-button bg-red" @click="stopGame">
                    </div>
                </div>
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
            gridWidth: 8,
            gridHeight: 8,
            currentSquare: '--',
            isHost: false,
            isPaused: true,
            isReady: false,
            gameStarted: false,
            gameStateTimer: null,
        }
    },
    async mounted () {
        await this.amIhost()
        if (this.amIhost == true){
            this.gameStateTimer = setInterval(this.getGameState, 5000);
        }
        await this.getGridDim()
        this.getEvent()
        let grid = GridStack.init({
            column: this.gridWidth,
            row: this.gridHeight,
            cellHeight: 90,
            disableDrag: true,
        });
        
        var items = await this.getBoard()
        grid.load(items, true);
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
                    console.log(response.data["error"]);
                    return;
                }
                else{
                    return
                }
            }
    }
}

</script>