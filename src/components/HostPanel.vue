<template>
    <div class="bg-pirate">
        <div class="flex-container">
            <div class="config-box float-left flex-child">
                <h1 class="title">Host Panel</h1>
                <h3 class="float-left">Decision Time = {{ DecisionTime }}</h3>
                <div class="input-container">
                    <input type="range" min="10" max="45" step=5 :size='DecisionTime' class="slider" v-model='DecisionTime'>
                </div>
                <br>
                <input class="float-left" id="random"  type="checkbox" name="Randomize only" v-bind:value="false" v-model='randomizeOnly'>
                <label for="random">Randomize Boards Only</label>
                <div style="text-align: center;">
                    <input type="button" value="Start" style="color: white; text-decoration: none;" class="big-button bg-blue" @click="startGame">
                </div>
            </div>
            <div class="config-box float-left flex-child">
                <h1 class="title">Players</h1>
                <h3> List of Players </h3>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'HostPanel',
    data: function () {
        return {
            secretcode: localStorage.getItem('authcode'),
            gameName: localStorage.getItem('gamename'),
            DecisionTime: 30,
            randomizeOnly: false
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
