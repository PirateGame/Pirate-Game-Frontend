<template>
    <div class="bg-generic">
        <div class="config-box config-box-center">
            <br>
            <h2 class="title1">Join</h2>
            <form>
                <h3 class="float-left">Game Name</h3>
                <div class="input-container">
                    <input type="text" class="text-box" placeholder="Game Name..." id="gameName" v-model="gameName">
                </div>
                <h3 class="float-left">Player Name</h3>
                <div class="input-container">
                    <input type="text" class="text-box" placeholder="Name" id="playerName" v-model="playerName">
                </div>
                <div style="text-align: center;">
                    <input type="button" value="Join" style="color: white; text-decoration: none;" class="big-button bg-genericButton" @click="joinGame">
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import router from '../router/index';
export default {
    name: 'JoinPage',
    data: function () {
        return {
            playerName: null,
            gameName: null
        }
    },
    methods: {
        async joinGame() {
            if (this.$socket.connected){
                this.$socket.emit('joinGame',
                {
                    gameName: this.gameName,
                    playerName: this.playerName
                });
                await this.$socket.on('joinGameResponse', (data) => {
                    console.log(data);
                    if (data["error"] != false){
                        alert(data["error"]);
                        return;
                    }
                    this.$store.commit("updatePlayerName", this.playerName)
                    this.$store.commit("updateGameName", this.gameName)
                    this.$store.commit("updateAuthCode", data["authcode"])
                    router.push("/PickTeam")
                });
            } else {
            alert("You are not connected to the server.\n Please contact an Admin")
            }
        }
    }
}
</script>