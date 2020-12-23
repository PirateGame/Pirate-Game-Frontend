<template>
    <div class="bg-pirate">
        <h1 class="title">Please wait</h1>
        <h2>Game Board</h2>
        <h2>your secret code is: {{secretcode}}</h2>
        <div class="grid-stack"></div>
    </div>
</template>
<script>
import Axios from '/services/axios.js';
import router from '../router/index';
import 'gridstack/dist/gridstack.min.css';
import GridStack from 'gridstack';
export default {
    name: 'WaitingRoom',
    async mounted () {
        var grid = GridStack.init();
        grid.addWidget({w: 2, content: 'item 1'});
    }
}

</script>