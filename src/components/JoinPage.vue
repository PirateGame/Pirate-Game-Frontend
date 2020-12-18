<template>
    <div class="bg-pirate">
        <div class="config-box">
            <h2 class="title">Join</h2>
            <form>
                <h3 class="float-left">Game ID</h3>
                <div class="input-container">
                    <input type="text" class="text-box" placeholder="ID" id="gameID">
                </div>
                <h3 class="float-left">Player Name</h3>
                <div class="input-container">
                    <input type="text" class="text-box" placeholder="Name" id="playerName">
                </div>
                <div style="text-align: center;">
                    <input type="button" value="Start" style="color: white; text-decoration: none;" class="big-button bg-blue">
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'JoinPage'
}
</script>