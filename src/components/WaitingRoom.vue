<template>
    <div class="bg-pirate">
        <h1 class="title">You're In!</h1>
        <h2>Please wait while the host starts the game.</h2>
        <h2>Here is a guide on how to play the game.</h2>
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
            gameName: sessionStorage.getItem('gamename')
        }
    },
    async cretaed () {
        let response = null;
        try {
            response = await Axios().post('getPlayers',{gameName: this.gameName});
        }
        catch(err) {
            console.log(err)
        }
        console.log(response);
    },
    methods: {
        async getState(){
            let response = null;
            response = await Axios().post('getGameState',
                {
                    gameName: this.gameName
                });
            if (response.data["error"] != false){
                console.log(response.data["error"])
            }
            else {
                this.clientList = response.data["names"]
            }
        }

    }
}

</script>
