<template>
    <div class="bg-gamepage">
        <h1 class="title">Pick your captain and ship</h1>
        <div class="team-selector" id="captain">
            <br>
            <h2>Captain</h2>
            <div class="flex-container">
                <div class="flex-child">
                    <label>
                        <input type="radio" name="captain" v-model='captain' v-bind:value="0" class="radio-hidden" @change="showShip()">
                        <img src="/images/placeholder.png" height="150" width="250">
                        <h3> captain Hook </h3>
                    </label>
                </div>
                <div class="flex-child">
                    <label>
                        <input type="radio" name="captain" v-model='captain' v-bind:value="1" class="radio-hidden" @change="showShip()">
                        <img src="/images/placeholder.png" height="150" width="250">
                        <h3> Blackbeard </h3>
                    </label>
                </div>
                <div class="flex-child">
                    <label>
                        <input type="radio" name="captain" v-model='captain' v-bind:value="2" class="radio-hidden" @change="showShip()">
                        <img src="/images/placeholder.png" height="150" width="250">
                        <h3> Jack Sparrow </h3>
                    </label>
                </div>
            </div>
        </div>
        <div class="team-selector" style="display: none;" id="ship">
            <br>
            <h2>Ship</h2>
            <div class="flex-container">
                <div class="flex-child">
                    <label>
                        <input type="radio" name="ship" v-model='ship' v-bind:value="0" class="radio-hidden" @change="submit()">
                        <img src="/images/placeholder.png" height="150" width="250">
                        <h3> Jolly Rodger </h3>
                    </label>
                </div>
                <div class="flex-child">
                    <label>
                        <input type="radio" name="ship" v-model='ship' v-bind:value="1" class="radio-hidden" @change="submit()">
                        <img src="/images/placeholder.png" height="150" width="250">
                        <h3> Barnacle </h3>
                    </label>
                </div>
                <div class="flex-child">
                    <label>
                        <input type="radio" name="ship" v-model='ship' v-bind:value="2" class="radio-hidden" @change="submit()">
                        <img src="/images/placeholder.png" height="150" width="250">
                        <h3> Queen Anne's Revenge </h3>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import router from '../router/index';
export default {
    name: 'PickTeam',
    data: function () {
        return {
            authCode: this.$store.state.authCode,
            gameName: this.$store.state.gameName,
            playerName: this.$store.state.playerName,
            gridWidth: this.$store.state.gridWidth,
            gridHeight: this.$store.state.gridGHeight,
            ship: this.$store.state.ship,
            captain: this.$store.state.captain,
        }
    },
    methods: {
        showShip() {
            var x = document.getElementById("captain");
            x.style.display = "none";
            var y = document.getElementById("ship");
            y.style.display = "block";
            
        },
        async submit(){
            if (this.$socket.connected){
                this.$socket.emit('setTeam',
                {
                    Captain: this.captain,
                    Ship: this.ship,
                    gameName: this.gameName,
                    authCode: this.authCode,
                    playerName: this.playerName,
                });
                await this.$socket.on('setTeamResponse', (data) => {
                    if (data["error"] != false){
                        alert(data["error"]);
                        return;
                    }else{
                        this.$store.commit("updateCaptain", this.captain)
                        this.$store.commit("updateShip", this.ship)
                        if (data["randomise"]){
                            router.push("/WaitingRoom")
                        } else {
                            router.push("/DesignBoard")
                        }
                    }
                });
            }
        }
    }
}
</script>
