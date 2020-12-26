<template>
    <div class="bg-pirate">
        <h2>The Pirate Game</h2>
        <div class="board-holder">
            <div :class="['grid-stack grid-stack-' + gridWidth]"></div>
        </div>
        <div class="right-bar">
            <h2> Current square: {{currentSquare}}</h2>
            <h2> Game log </h2>
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
            gridWidth: 8,
            gridHeight: 8,
            currentSquare: 'A3',
            isHost: true,
            isPaused: false
        }
    },
    async mounted () {
        var items = [
          {content: 'Kill',noResize: true, noMove:true},
          {content: 'Steal',noResize: true, noMove:true},
          {content: 'Swap',noResize: true, noMove:true}
        ];//this will need to come from server.
        
        let grid = GridStack.init({
            column: this.gridWidth,
            row: this.gridHeight,
            cellHeight: 90,
        });
        grid.load(items);
    },
    methods: {
        async pauseGame(){
            this.isPaused = !this.isPaused

            if (this.isPaused){
                console.log("pause game")
            }
            else{
                console.log("Play game")
            }
        }
    }
}

</script>