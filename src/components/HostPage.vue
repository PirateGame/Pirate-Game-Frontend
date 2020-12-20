<template>
    <div class="bg-pirate">
        <div class="config-box">
            <h2 class="title">Settings</h2>
            <form action="play">
                <h3 class="float-left">Grid Size = {{ gridSizex }} x {{ gridSizey }}</h3>
                <div class="input-container">
                    <input type="range" min="5" max="15" :size='gridSizey' class="slider" id="gridSizex" v-model='gridSizex'>
                    <input type="range" min="5" max="15" :size='gridSizex' class="slider" id="gridSizey" v-model='gridSizey'>
                </div>
                <h3 class="float-left">Custom Game ID</h3>
                <div class="input-container">
                    <input type="text" class="text-box" placeholder=" Please enter a game id..." id="gameID" v-model="gameId">
                </div>
                <div style="text-align: center;">
                    <h3>Do you want to play?</h3>
                    <input type="radio" id="yes" name="hostPlaying" v-bind:value="true" v-model='isHostPlaying'>
                    <label for="yes">Yes</label>
                    <input type="radio" id="no" name="hostPlaying" v-bind:value="false" v-model='isHostPlaying'>
                    <label for="no">No</label><br>
                </div>
                <div class="input-container" v-show="isHostPlaying">
                    <input type="text" class="text-box" placeholder=" Please enter your name..." id="playerName" v-model="playerName">
                </div>
                <div style="text-align: center;">
                    <input type="button" value="Start" style="color: white; text-decoration: none;" class="big-button bg-blue" @click="createGame">
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import LandingPage from './landingPage.vue';
import Api from '/services/backend.js';
export default {
    name: 'HostPage',
    data: function () {
        return {
            gridSizex: 7,
            gridSizey: 7,
            gameId: null,
            playerName: null,
            isHostPlaying: false
        }
    },
    methods: {
        async createGame() {
            //alert('This will create a game with grid size ' + this.gridSizex + 'x' + this.gridSizey + ' with a game code of ' + this.gameId);
            
            
            let response = await Api().post('create_game',
            {
                    Sizex: this.gridSizex,
                    Sizey: this.gridSizey,
                    ID: this.gameId,
                    isHostPlaying: this.isHostPlaying,
                    playerName: this.playerName
                }
            );
            
        }
    }
}
</script>