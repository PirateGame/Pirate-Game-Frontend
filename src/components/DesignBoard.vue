<template>
  <div class="bg-pirate">
  <h2>Drag and drop the tiles to create your board, or hit the randomise button.</h2>
    <div class="board-holder">
      <div :class="['grid-stack grid-stack-' + gridWidth]"></div>
    </div>
    <div class="board-holder-narrow">
      <div :class="['grid-stack grid-stack-' + 1]"></div>
    </div>
  </div>
</template>
<script>
import Axios from '/services/axios.js';
import router from '../router/index';
import 'gridstack/dist/gridstack.min.css';
import 'gridstack/dist/gridstack-h5.js';




export default {
    name: 'DesignBoard',
    data: function () {
        return {
            gridWidth: 8,
            gridHeight: 8
        }
    },
    async mounted () {
        var items = [
          {content: 'Kill',noResize: true, noMove:false},
          {content: 'Steal',noResize: true, noMove:false},
          {content: 'Swap',noResize: true, noMove:false}
        ];

        //this is pre placed to stop the grid from disappearing
        var MANDATORYitems = [
          {content: '£5000',noResize: true, noMove:false}
        ];
        
        let grids = GridStack.initAll({
          dragIn: '.grid-stack-item',
          dragInOptions: { revert: 'invalid', scroll: false, appendTo: 'body', helper: 'clone' },
          acceptWidgets: function(el) { return true; }
        });
        grids[0].float(true);
        grids[0].column(this.gridWidth);
        grids[0].opts.minRow = this.gridHeight;
        grids[0].opts.maxRow = this.gridHeight;
        grids[1].float(false);
        grids[1].column(1);
        grids[1].opts.cellHeight = 40; //pixels
        grids[0].load(MANDATORYitems);
        grids[1].load(items);
    }
}

</script>