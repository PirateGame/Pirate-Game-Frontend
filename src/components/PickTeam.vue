<template>
    <div class="bg-pirate">
        <h1 class="title" style="padding: 5%; margin:0; padding-bottom:0">Pick your Crew and ship</h1>
        <div class="flex-container">
            <div class="config-box flex-child float-left padding-top:5%">
                <h2>Crew</h2>
                <label>
                    <input type="radio" name="Team" v-model='Team' v-bind:value="1" class="radio-hidden">
                    <img src="/images/placeholder.png" height="150" width="250">
                </label>
                <br>
                <label>
                    <input type="radio" name="Team" v-model='Team' v-bind:value="2" class="radio-hidden">
                    <img src="/images/placeholder.png" height="150" width="250">
                </label>
                <br>
                <label>
                    <input type="radio" name="Team" v-model='Team' v-bind:value="3" class="radio-hidden">
                    <img src="/images/placeholder.png" height="150" width="250">
                </label>
            </div>
            <div class="config-box flex-child float-right">
                <h2>Ship</h2>
                <label>
                    <input type="radio" name="Ship" v-model='Ship' v-bind:value="1" class="radio-hidden">
                    <img src="/images/placeholder.png" height="150" width="250">
                </label>
                <br>
                <label>
                    <input type="radio" name="Ship" v-model='Ship' v-bind:value="2" class="radio-hidden">
                    <img src="/images/placeholder.png" height="150" width="250">
                </label>
                <br>
                <label>
                    <input type="radio" name="Ship" v-model='Ship' v-bind:value="3" class="radio-hidden">
                    <img src="/images/placeholder.png" height="150" width="250">
                </label>
            </div>
        </div>
        <div style="text-align: center;">
                    <input type="button" value="Next" style="color: white; text-decoration: none;" class="big-button bg-blue" @click="saveTeams">
                </div>
    </div>
</template>

<script>
import Axios from '/services/axios.js';
import router from '../router/index';
export default {
    name: 'PickTeam',
    data: function () {
        return {
            Team: null,
            Ship: null,
            secretcode: sessionStorage.getItem('authcode'),
            gameName: sessionStorage.getItem('gamename'),
            playerName: sessionStorage.getItem('playername')
        }
    },
    methods: {
        async saveTeams(){
            let response = null;
            response = await Axios().post('create_game',
                {
                    Team: this.Team,
                    Ship: this.Ship,
                    gameName: this.gameName,
                    playerName: this.playerName,
                    authCode: this.authCode,
                },
            );
            if (response.data["auth"] == false){
                alert("authentication failed")
            }
            console.log(response);
        }
    }
}
</script>
