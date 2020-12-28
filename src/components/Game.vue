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
            <div class="flex-container" v-show="isHost">
                <div class="flex-child" v-show="isPaused">
                    <input type="button" value="Play" style="color: white; text-decoration: none;" class="big-button bg-green" @click="pauseGame">
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
</template>
<script>
import Axios from '/services/axios.js';
import router from '../router/index';
import 'gridstack/dist/gridstack.min.css';
import 'gridstack/dist/gridstack-h5.js';
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
            isPaused: false,
        }
    },
    async mounted () {
        await this.amIhost()
        console.log(this.isHost)
        await this.getGridDim()
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
            if (response.data["error"] == !false){
                console.log(response.data["error"])
                return;
            }
            else{
                this.isHost = true;
            }
        
      },
      async getGameStatus(){
          //this function will be called every 3-5 secods
      }
    }
}

</script>