<template>
    <div class="bg-pirate">
        <h2>Drag and drop the tiles to create your board, or hit the randomise button.</h2>
          <div class="board-holder">
            <div :class="['grid grid-stack grid-stack-' + gridWidth]"></div>
          </div>
          <div id="sidebar" :class="['bar grid-stack grid-stack-' + 1]"></div>
        </div>
</template>
<script>
import Axios from '/services/axios.js';
import router from '../router/index';
import 'gridstack/dist/gridstack.min.css';
import 'gridstack/dist/gridstack-h5.js';




export default {
    name: 'Board',
    data: function () {
        return {
            gridWidth: 8,
            gridHeight: 8
        }
    },
    async mounted () {
        var items = [
          {content: 'my first widget',noResize: true, noMove:false},
          {content: 'another widget!',noResize: true, noMove:false}
        ];
        
        var grid = GridStack.init({class:"grid",float: true, column:this.gridWidth, minRow:this.gridHeight, maxRow:this.gridHeight});
        var sidebar = GridStack.init({class:"bar",float: false, column:1});
        grid.load(items);
    }
}

</script>