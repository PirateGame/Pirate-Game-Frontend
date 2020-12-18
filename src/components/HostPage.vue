<template>
    <div class="bg-pirate body">
        <div class="config-box">
            <h2 class="title">Settings</h2>
            <form action="play">
                <h3 class="float-left">Grid Size = {{ gridSize }}</h3>
                <div class="input-container">
                    <input type="range" min="5" max="15" :size='gridSize' class="slider" id="gridSize" v-model='gridSize'>
                </div>
                <h3 class="float-left">Custom Game ID</h3>
                <div class="input-container">
                    <input type="text" class="text-box" placeholder="ID" id="gameID" v-model="gameId">
                </div>
                <div style="text-align: center;">
                    <input type="button" value="Start" style="color: white; text-decoration: none;" class="host-button bg-blue" @click="createGame">
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'HostPage',
    data: function () {
        return {
            gridSize: 7,
            gameId: null
        }
    },
    methods: {
        createGame() {
            alert('This will create a game with grid size ' + this.gridSize + ' with a game code of ' + this.gameId);
        }
    }
}
</script>