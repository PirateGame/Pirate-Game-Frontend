<template>
    <div class="bg-generic">
        <h1 class="title3">The</h1>
        <h1 class="title1">Pirate</h1>
        <h1 class="title2">Game</h1>
        <h1 class="subtitle1">Conquer the seven seas!</h1>
        <div class="mainMenu">
            <ul id="menuUL">
                <li class="bg-landingQuickplay">
                    <router-link :to="{ name: 'JoinPage' }">Quick Play</router-link>
                </li>
                <li class="bg-landingJoin">
                    <router-link :to="{ name: 'JoinPage' }">Join</router-link>
                </li>
                <li class="bg-landingHost">
                    <router-link :to="{ name: 'HostPage' }">Host</router-link>
                </li>
                <li class="bg-landingRules">
                    <router-link :to="{ name: 'Rules' }">Rules</router-link>
                </li>
                <li id="inputLI">
                </li>
            </ul>
        <h1 class="bottomText1">v1.2</h1>
        <h1 class="bottomText1">Developed by</h1>
        <h1 class="bottomText2">Website: Alex.P</h1>
        <h1 class="bottomText2">Backend: Jamie.E</h1>
        <a href="https://ko-fi.com/pirategameonline" target="_blank">
            <img src="/images/ko-fi.png" style="width:80%; height:auto">
        </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LandingPage'
}
</script>
