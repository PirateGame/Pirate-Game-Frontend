<template>
    <div class="bg-pirate">
        <h1 class="title">Host Panel</h1>
        <h2> in this page the host has control over the game. these include:</h2>
        <h2> kicking players by clicking on names</h2>
        <h2> setting randomise board only</h2>
        <h2> modifying decision time limit</h2>
    </div>
</template>
<script>
export default {
    name: 'HostPanel',
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
