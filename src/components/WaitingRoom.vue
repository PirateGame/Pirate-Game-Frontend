<template>
    <div class="bg-pirate">
        <h1 class="title">You're In!</h1>
        <h2>Please wait while the host starts the game.</h2>
        <h2>Here is a guide on how to play the game.</h2>
        <h2> game state: {{gameState}} </h2>
    </div>
</template>
<script>
import Axios from '/services/axios.js';
import router from '../router/index';
export default {
    name: 'WaitingRoom',
    data: function () {
        return {
            secretcode: sessionStorage.getItem('authcode'),
            gameName: sessionStorage.getItem('gamename'),
            gameState: "unknown",
            timerID: null,
        }
    },
    async created () {
        this.timerID = setInterval(this.gameCheck, 5000);
    },
    methods: {
        async gameCheck(){
            let response = null;
            response = await Axios().post('getGameState',
                {
                    gameName: this.gameName
                });
            if (response.data["error"] != false){
                console.log("error:")
                console.log(response.data["error"])
            }
            else {
                this.gameState = response.data["state"]
            }
            console.log(response.data)
            if (this.gameState == "design"){
                clearInterval(this.timerID)
                router.push("/PickTeam")
            }
        }

    }
}

</script>
