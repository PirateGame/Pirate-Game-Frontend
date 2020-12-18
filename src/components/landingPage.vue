<template>
<<<<<<< Updated upstream
    <div class="bg-pirate">
        <div class="config-box">
            <h1 class="title">The Pirate Game</h1>
            <form>
                <div style="text-align: center;">
                    <input type="button" value="Host" style="color: white; text-decoration: none;" class="big-button bg-blue">
                </div>
                <div style="text-align: center;">
                    <input type="button" value="Join" style="color: white; text-decoration: none;" class="big-button bg-green">
                </div>
            </form>
=======
    <div class="bg-pirate body">
        <h1 class="big-title">The Pirate Game</h1>
        <div class="mainMenu">
            <ul id="menuUL">
                <li class="bg-blue">
                    <router-link :to="{ name: 'HostPage' }">Host Game</router-link>
                </li>
                <li class="bg-green">
                    <router-link :to="{ name: 'JoinPage' }">Join Game</router-link>
                </li>
                <li id="inputLI">
                </li>
            </ul>
>>>>>>> Stashed changes
        </div>
    </div>
</template>

<script>
export default {
    name: 'LandingPage'
}
</script>
