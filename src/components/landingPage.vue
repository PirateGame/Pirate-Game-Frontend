<template>
    <div class="bg-pirate">
        <!--<div class="accountBtns">
            <button class="bg-red">Login</button>
            <button class="bg-red">Register</button>
        </div>-->
        <h2 class="title">The Pirate Game</H2>
        <div class="mainMenu">
            <ul id="menuUL">
                <li class="bg-blue">
                    <a>Host Game</a>
                </li>
                <li class="bg-green" onclick="ShowPopUp()">
                    <router-link to="">Join Game</router-link>
                </li>
                <!--<li class="bg-red">
                    <a>
                        Exit
                    </a>
                </li>-->
                <li id="inputLI">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'landingPage'
}
</script>
