<template>
  <div class="bg-pirate">
  <h2>Drag and drop the tiles to create your board, or hit the randomise button.</h2>
    <div class="board-holder">
      <div :class="['grid-stack grid-stack-' + gridWidth]"></div>
    </div>
    <div class="board-holder-narrow">
      <input type="button" value="Randomize" style="color: white; text-decoration: none;" class="big-button bg-red" @click="RandomizeBoard">
      <div :class="['grid-stack grid-stack-' + 1]"></div>
      <input type="button" value="Submit" style="color: white; text-decoration: none;" class="big-button bg-blue" @click="submitBoard">
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
            gridWidth: 12,
            gridHeight: 15,
            authCode: sessionStorage.getItem('authcode'),
            gameName: sessionStorage.getItem('gamename'),
            playerName: sessionStorage.getItem('playername')
        }
    },
    async mounted () {
        var items = [
          {content: 'Kill',noResize: true, noMove:false},
          {content: 'Steal',noResize: true, noMove:false}
        ];
        let response = null;
        response = await Axios().post('getNumTiles',
            {
                gameName: this.gameName,
            }
        );
        if (response.data["game"] == false){
            alert("Game not found.");
            return;
        }

        console.log(response.data)
        items = response.data;

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
    },
    methods: {
      async submitBoard(){
        serializedData = grid.save();
        let response = null;
          response = await Axios().post('getPlayers',
              {
                  gameName: this.gameName,
                  playerName: this.playerName,
                  authCode: this.authcode,
                  board: serializedData
              });
          if (response.data["game"] == false){
              alert("game not found")
          }

      }
    }
}

</script>