<template>
    <div class="bg-pirate">
        <h2>Drag and drop the tiles to create your board, or hit the randomise button.</h2>
        <div class="board-holder">
          <div :class="['grid-stack grid-stack-' + gridWidth]"></div>
        </div>
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
            gridWidth: 12,
            gridHeight: 12
        }
    },
    async mounted () {
        var items = [
          {content: 'my first widget',noResize: true, noMove:false},
          {content: 'another widget!',noResize: true, noMove:false}
        ];
         var grid = GridStack.init({float: true, column:this.gridWidth, minRow:this.gridHeight});
        grid.load(items);
    }
}

</script>