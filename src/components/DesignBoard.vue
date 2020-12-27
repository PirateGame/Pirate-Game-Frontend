<template>
  <div class="bg-pirate">
  <h2>Drag and drop the tiles to create your board, or hit the randomise button.</h2>
    <div class="board-holder">
      <div :class="['grid-stack board grid-stack-' + gridWidth]"></div>
    </div>
    <div class="board-holder-narrow">
      <input type="button" value="Randomise" style="color: white; text-decoration: none;" class="big-button bg-red" @click="randomiseBoard">
      <div :class="['grid-stack bar grid-stack-' + 1]"></div>
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
            gridWidth: null,
            gridHeight: null,
            authCode: sessionStorage.getItem('authcode'),
            gameName: sessionStorage.getItem('gamename'),
            playerName: sessionStorage.getItem('playername'),
            grid0: null,
            grid1: null,
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
        var items = response.data;

        response = await Axios().post('getGridDim',
            {
                gameName: this.gameName,
                playerName: this.playerName
            }
        );
        this.gridWidth = response.data["x"]
        this.gridHeight = response.data["y"]

        //this is pre placed to stop the grid from disappearing
        var MANDATORYitems = [
          {content: '£5000',noResize: true, noMove:false}
        ];
        

        //load grids

        this.grid0 = GridStack.init({
          dragIn: '.grid-stack-item',
          dragInOptions: { revert: 'invalid', scroll: false, appendTo: 'body', helper: 'clone' },
          acceptWidgets: function(el) { return true;},
          float: true,
          column: this.gridWidth,
          row: this.gridHeight,
        }, '.grid-stack.board');

        this.grid1 = GridStack.init({
          dragIn: '.grid-stack-item',
          dragInOptions: { revert: 'invalid', scroll: false, appendTo: 'body', helper: 'clone' },
          acceptWidgets: function(el) { return true},
          float: false,
          column: 1,
          cellHeight: 40,
        }, '.grid-stack.bar');

        this.grid0.load(MANDATORYitems);
        this.grid1.load(items);
    },
    methods: {
      async submitBoard(){
        var serializedData = this.grid0.save();
        let response = null;
        response = await Axios().post('saveBoard',
            {
                gameName: this.gameName,
                playerName: this.playerName,
                authCode: this.authCode,
                board: serializedData
            });
        if (response.data["game"] == false){
            alert("game not found")
        }

      },
      async randomiseBoard (){
        this.grid1.removeAll();
        let response = null;
        response = await Axios().post('randomiseBoard',
              {
                  gameName: this.gameName,
                  playerName: this.playerName,
                  authCode: this.authCode
              });
        var board = response.data;
        console.log(board);
        this.grid0.load(board, true);
      }
    }
}

</script>