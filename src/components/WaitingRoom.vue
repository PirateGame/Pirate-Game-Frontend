<template>
    <div class="bg-pirate">
        <h1 class="title">Please wait</h1>
        <h2> in this page players should be able to see who is in the game.</h2>
        <h2>your secret code is: {{secretcode}}</h2>
    </div>
</template>
<script>
import Axios from '/services/axios.js';
import router from '../router/index';
export default {
    name: 'WaitingRoom',
    data: function () {
        return {
            secretcode: localStorage.getItem('authcode'),
            gameName: localStorage.getItem('gamename')
        }
    },
    async mounted () {
        let response = null;
        try {
            response = await Axios().post('getPlayers',{gameName: this.gameName});
        }
        catch(err) {
            console.log("Server Offline")
        }
        console.log(response);
    }
}

</script>
