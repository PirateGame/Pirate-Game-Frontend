<template>
    <div class="bg-pirate">
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
                    <input type="button" value="Join" style="color: white; text-decoration: none;" class="big-button bg-joinColour" @click="joinGame">
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import Axios from '/services/axios.js';
import router from '../router/index';
export default {
    name: 'JoinPage',
    data: function () {
        return {
            gameName: null,
            playerName: null
        }
    },
    methods: {
        async joinGame() {
            let response = null;
            try {
                response = await Axios().post('join_game',
                    {
                        gameName: this.gameName,
                        playerName: this.playerName
                    },
                );
                if (response.data["error"] != false){
                    alert(response.data["error"]);
                    return;
                }

                //incase we already have one
                sessionStorage.removeItem('authcode');
                sessionStorage.removeItem('gamename');
                sessionStorage.setItem("authcode", response.data["authcode"]);
                sessionStorage.setItem("gamename", this.gameName);
                sessionStorage.setItem("playername", this.playerName);
                router.push("/PickTeam")

            } catch (err) {
                alert("server offline")
                console.log(err)
            }

        }
    }
}
</script>