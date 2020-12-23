<template>
    <div class="bg-pirate">
        <h1 class="title">Please wait</h1>
        <h2>Game Board</h2>
        <h2>your secret code is: {{secretcode}}</h2>
    </div>
</template>
<script>
import Axios from '/services/axios.js';
import router from '../router/index';
export default {
    name: 'WaitingRoom',
}

</script>