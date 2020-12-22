<template>
    <div class="bg-pirate">
        <h1 class="title">The Pirate Game</h1>
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
        </div>
    </div>
</template>

<script>
export default {
    name: 'LandingPage'
}
</script>
