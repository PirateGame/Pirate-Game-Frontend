<template>
    <div class="bg-pirate">
        <h1 class="title">Pick your Crew and ship</h1>
        <div class="team-selector" id="crew">
            <br>
            <h2>Crew</h2>
            <label>
                <input type="radio" name="Team" v-model='Team' v-bind:value="1" class="radio-hidden" @change="showShip()">
                <img src="/images/placeholder.png" height="150" width="250">
            </label>
            <label>
                <input type="radio" name="Team" v-model='Team' v-bind:value="2" class="radio-hidden" @change="showShip()">
                <img src="/images/placeholder.png" height="150" width="250">
            </label>
            <label>
                <input type="radio" name="Team" v-model='Team' v-bind:value="3" class="radio-hidden" @change="showShip()">
                <img src="/images/placeholder.png" height="150" width="250">
            </label>
        </div>
        <div class="team-selector" style="display: none;" id="ship">
            <br>
            <h2>Ship</h2>
            <label>
                <input type="radio" name="Ship" v-model='Ship' v-bind:value="1" class="radio-hidden" @change="submit()">
                <img src="/images/placeholder.png" height="150" width="250">
            </label>
            <label>
                <input type="radio" name="Ship" v-model='Ship' v-bind:value="2" class="radio-hidden" @change="submit()">
                <img src="/images/placeholder.png" height="150" width="250">
            </label>
            <label>
                <input type="radio" name="Ship" v-model='Ship' v-bind:value="3" class="radio-hidden" @change="submit()">
                <img src="/images/placeholder.png" height="150" width="250">
            </label>
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
            authCode: sessionStorage.getItem('authcode'),
            gameName: sessionStorage.getItem('gamename'),
            playerName: sessionStorage.getItem('playername')
        }
    },
    methods: {
        showShip() {
            var x = document.getElementById("crew");
            x.style.display = "none";
            var y = document.getElementById("ship");
            y.style.display = "block";
            
        },
        async submit(){
            let response = null;
            response = await Axios().post('setTeam',
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
            else{
                router.push("/DesignBoard")
            }
        }
    }
}
</script>
