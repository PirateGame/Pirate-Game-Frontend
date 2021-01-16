<template>
    <div class="bg-pirate">
        <h1 class="title3">The</h1>
        <h1 class="title1">Pirate</h1>
        <h1 class="title2">Game</h1>
        <div class="mainMenu">
            <ul id="menuUL">
                <li class="bg-joinColour">
                    <router-link :to="{ name: 'JoinPage' }">Join</router-link>
                </li>
                <li class="bg-hostColour">
                    <router-link :to="{ name: 'HostPage' }">Host</router-link>
                </li>
                <li id="inputLI">
                </li>
            </ul>
        <h1 class="bottomText1">Developed by Alex.P and Jamie.E</h1>
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
