<template>
  <div class="bg-pirate">
  <h2>Drag and drop the tiles to create your board, or hit the randomise button.</h2>
    <div class="board-holder">
      <div :class="['grid-stack grid-stack-' + gridWidth]"></div>
    </div>
    <div class="board-holder-narrow">
      <input type="button" value="Randomise" style="color: white; text-decoration: none;" class="big-button bg-red" @click="randomiseBoard">
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
        //get all the tiles that should be placed in the grid
        let response = null;
        response = await Axios().post('getBarTiles',
            {
                gameName: this.gameName,
                playerName: this.playerName
            }
        );
        if (response.data["game"] == false){
            alert("Game not found.");
            return;
        }

        console.log(response.data)
        var items = response.data;

        //this is pre placed to stop the grid from disappearing
        var MANDATORYitems = [
          {content: '£5000',noResize: true, noMove:false}
        ];
        

        //load grids
        this.grids = GridStack.initAll({
          dragIn: '.grid-stack-item',
          dragInOptions: { revert: 'invalid', scroll: false, appendTo: 'body', helper: 'clone' },
          acceptWidgets: function(el) { return true; }
        });
        this.grids[0].float(true);
        this.grids[0].column(this.gridWidth);
        this.grids[0].opts.minRow = this.gridHeight;
        this.grids[0].opts.maxRow = this.gridHeight;
        this.grids[1].float(false);
        this.grids[1].column(1);
        this.grids[1].opts.cellHeight = 40; //pixels
        this.grids[0].load(MANDATORYitems);
        this.grids[1].load(items);
    },
    methods: {
      async submitBoard(){
        serializedData = grid.save();
        let response = null;
        response = await Axios().post('saveBoard',
            {
                gameName: this.gameName,
                playerName: this.playerName,
                authCode: this.authcode,
                board: serializedData
            });
        if (response.data["game"] == false){
            alert("game not found")
        }

      },
      async randomiseBoard (){
        this.grids[1].removeAll();
        let response = null;
        response = await Axios().post('randomiseBoard',
              {
                  gameName: this.gameName,
                  playerName: this.playerName,
                  authCode: this.authcode
              });
        var board = response.data;
        console.log(board);
        this.grids[0].load(board, true);
      }
    }
}

</script>