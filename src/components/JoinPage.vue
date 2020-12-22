<template>
    <div class="bg-pirate">
        <div class="config-box">
            <h2 class="title">Join</h2>
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
                    <input type="button" value="Start" style="color: white; text-decoration: none;" class="big-button bg-blue" @click="joinGame">
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
                console.log(response.data);

                //incase we already have one
                localStorage.removeItem('authcode');
                localStorage.removeItem('gamename');
                localStorage.setItem("authcode", response.data["authCode"]);
                localStorage.setItem("gamename", this.gameName);
                router.push("/WaitingRoom")

            } catch (err) {
                alert("server offline")
                console.log(err)
            }

        }
    }
}
</script>