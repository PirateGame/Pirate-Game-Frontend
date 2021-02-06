<template>
    <div class="bg-generic">
        <div class="config-box config-box-center">
            <br>
            <h2 class="title1">Host</h2>
            <form action="play">
                <h3 class="float-left">Grid Size</h3>
                <h3 class="float-left">{{ gridSizex }} x {{ gridSizey }}</h3>
                <div class="input-container">
                    <input type="range" min="5" max="12" :size='gridSizey' class="slider" id="gridSizex" v-model='gridSizex'>
                    <input type="range" min="5" max="15" :size='gridSizex' class="slider" id="gridSizey" v-model='gridSizey'>
                </div>
                <h3 class="float-left">Game Name</h3>
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
                    <input type="button" value="Create" style="color: white; text-decoration: none;" class="big-button bg-genericButton" @click="createGame">
                </div>
            </form>
        </div>
    </div>
</template>
<script>
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
    async mounted () {
    },
    methods: {
        async createGame() {
            if (this.$socket.connected){
                this.$socket.emit('createGame',
                    {
                        Sizex: this.gridSizex,
                        Sizey: this.gridSizey,
                        gameName: this.gameName,
                        ownerName: this.playerName,
                        isHostPlaying: this.isHostPlaying,
                    },
                );
                await this.$socket.on('response', (data) => {
                    if (data["error"] != false){
                        alert(data["error"]);
                        return;
                    }
                    sessionStorage.setItem("authcode", data["authcode"]);
                    sessionStorage.setItem("gamename", data["gameName"]);
                    sessionStorage.setItem("playername", data["playerName"]);
                    router.push("/HostPanel")
                });
            } else {
                alert("You are not connected to the server.\n Please contact an Admin")
            }
        }
    }
}
</script>