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
import 'gridstack/dist/gridstack-h5.js';
export default {
    name: 'Board',
    async mounted () {
        var items = [
          {content: 'my first widget',noResize: true},
          {content: 'another widget!',noResize: true}
        ];
         var grid = GridStack.init({float: true});
        grid.load(items);
    }
}

</script>