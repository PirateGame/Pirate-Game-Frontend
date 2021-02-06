<template>
    <div class="bg-gamepage">
        <h1 class="title">Pick your Captain and ship</h1>
        <div class="team-selector" id="Captain">
            <br>
            <h2>Captain</h2>
            <div class="flex-container">
                <div class="flex-child">
                    <label>
                        <input type="radio" name="Captain" v-model='Captain' v-bind:value="0" class="radio-hidden" @change="showShip()">
                        <img src="/images/placeholder.png" height="150" width="250">
                        <h3> Captain Hook </h3>
                    </label>
                </div>
                <div class="flex-child">
                    <label>
                        <input type="radio" name="Captain" v-model='Captain' v-bind:value="1" class="radio-hidden" @change="showShip()">
                        <img src="/images/placeholder.png" height="150" width="250">
                        <h3> Blackbeard </h3>
                    </label>
                </div>
                <div class="flex-child">
                    <label>
                        <input type="radio" name="Captain" v-model='Captain' v-bind:value="2" class="radio-hidden" @change="showShip()">
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
                        <input type="radio" name="Ship" v-model='Ship' v-bind:value="0" class="radio-hidden" @change="submit()">
                        <img src="/images/placeholder.png" height="150" width="250">
                        <h3> Jolly Rodger </h3>
                    </label>
                </div>
                <div class="flex-child">
                    <label>
                        <input type="radio" name="Ship" v-model='Ship' v-bind:value="1" class="radio-hidden" @change="submit()">
                        <img src="/images/placeholder.png" height="150" width="250">
                        <h3> Barnacle </h3>
                    </label>
                </div>
                <div class="flex-child">
                    <label>
                        <input type="radio" name="Ship" v-model='Ship' v-bind:value="2" class="radio-hidden" @change="submit()">
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
            Captain: null,
            Ship: null,
            authCode: sessionStorage.getItem('authcode'),
            gameName: sessionStorage.getItem('gamename'),
            playerName: sessionStorage.getItem('playername')
        }
    },
    methods: {
        showShip() {
            var x = document.getElementById("Captain");
            x.style.display = "none";
            var y = document.getElementById("ship");
            y.style.display = "block";
            
        },
        async submit(){
            if (this.$socket.connected){
                this.$socket.emit('setTeam',
                {
                    Captain: this.Captain,
                    Ship: this.Ship,
                    gameName: this.gameName,
                    playerName: this.playerName,
                    authCode: this.authCode,
                });
                await this.$socket.on('response', (data) => {
                    if (data["error"] != false){
                        alert(data["error"]);
                        return;
                    }
                    sessionStorage.removeItem("captain")
                sessionStorage.removeItem("ship")
                sessionStorage.setItem("captain", this.Captain)
                sessionStorage.setItem("ship", this.Ship)
                router.push("/DesignBoard")
                });
            }
        }
    }
}
</script>
