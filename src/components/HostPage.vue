<template>
    <div class="bg-pirate">
        <div class="config-box config-box-center">
            <br>
            <h2 class="title1">Host</h2>
            <form action="play">
                <h3 class="float-left">Grid Size = {{ gridSizex }} x {{ gridSizey }}</h3>
                <div class="input-container">
                    <input type="range" min="5" max="12" :size='gridSizey' class="slider" id="gridSizex" v-model='gridSizex'>
                    <input type="range" min="5" max="15" :size='gridSizex' class="slider" id="gridSizey" v-model='gridSizey'>
                </div>
                <h3 class="float-left">Custom Game ID</h3>
                <div class="input-container">
                    <input type="text" class="text-box" placeholder=" Please enter a game id..." id="gameName" v-model="gameName">
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
                    <input type="button" value="Create" style="color: white; text-decoration: none;" class="big-button bg-hostColour" @click="createGame">
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import Axios from '/services/axios.js';
import router from '../router/index';
export default {
    name: 'HostPage',
    data: function () {
        return {
            gridSizex: 7,
            gridSizey: 7,
            gameName: null,
            playerName: null,
            isHostPlaying: false
        }
    },
    methods: {
        async createGame() {
            let response = null;
            try {
                response = await Axios().post('create_game',
                    {
                        Sizex: this.gridSizex,
                        Sizey: this.gridSizey,
                        gameName: this.gameName,
                        ownerName: this.playerName,
                        isHostPlaying: this.isHostPlaying,
                    },
                );
                if (response.data["error"] != false){
                    alert(response.data["error"]);
                    return;
                }

                sessionStorage.setItem("authcode", response.data["authcode"]);
                sessionStorage.setItem("gamename", response.data["gameName"]);
                sessionStorage.setItem("playername", response.data["playerName"]);
                router.push("/HostPanel")

            } catch (err) {
                alert("server offline")
                console.log(err)
            }

        }
    }
}
</script>