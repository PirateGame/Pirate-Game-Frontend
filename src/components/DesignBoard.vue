<template>
  <div class="bg-gamepage">
  <h2>Drag and drop the tiles to create your board, or hit the randomise button.</h2>
    <div class="board-holder">
      <div :class="['grid-stack grid-stack-' + gridWidth]"></div>
    </div>
    <div class="board-holder-narrow">
      <input type="button" value="Randomise" style="color: white; text-decoration: none;" class="big-button bg-red" @click="randomiseBoard">
      <div class="board-scroll">
        <div class="grid-stack grid-stack-1"></div>
      </div>
      <input type="button" value="Submit" style="color: white; text-decoration: none;" class="big-button bg-blue" @click="submitBoard">
    </div>
  </div>
</template>
<script>
import Axios from '/services/axios.js';
import router from '../router/index';
import '../gridstack.css';
import '../gridstack-h5.js';
export default {
    name: 'DesignBoard',
    data: function () {
        return {
            gridWidth: 7,
            gridHeight: 7,
            authCode: sessionStorage.getItem('authcode'),
            gameName: sessionStorage.getItem('gamename'),
            playerName: sessionStorage.getItem('playername'),
            items: [],
        }
    },
    async mounted () {
        await this.getTiles();
        this.getGridDim();
        
        //this is pre placed to stop the grid from disappearing
        var MANDATORYitems = [
          {content: '£5000',noResize: true, noMove:false}
        ];
        

        //load grids

        //load grids
        this.grids = GridStack.initAll({
          dragIn: '.grid-stack-item',
          maxRow: this.gridHeight,
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
        this.grids[1].load(this.items, true);
    },
    methods: {
      async submitBoard(){
        var serializedData = this.grids[0].save();
        let response = null;
        response = await Axios().post('saveBoard',
            {
                gameName: this.gameName,
                playerName: this.playerName,
                authCode: this.authCode,
                board: serializedData
            });
        if (response.data["error"] != false){
            alert(response.data["error"])
        }
        else {
          //we should probably have a page that just says board submitted waiting for others.
          router.push("/WaitingRoom")
        }

      },
      async randomiseBoard (){
        this.grids[1].removeAll();
        let response = null;
        response = await Axios().post('randomiseBoard',
              {
                  gameName: this.gameName,
                  playerName: this.playerName,
                  authCode: this.authCode
              });
        var board = response.data;
        console.log("Randomised board");
        this.grids[0].load(board, true);
      },
      async getGridDim () {
        var response = null;
        response = await Axios().post('getGridDim',
            {
                gameName: this.gameName,
                playerName: this.playerName
            }
        );
        console.log("got grid Dimensions: " + response.data["x"] + ", " + response.data["y"])
        this.gridWidth = response.data["x"]
        this.gridHeight = response.data["y"]

      },
      async getTiles(){
        var response = null;
        response = await Axios().post('getBarTiles',
            {
                gameName: this.gameName,
                playerName: this.playerName
            }
        );
        if (response.data["error"] == !false){
            console.log(response.data["error"])
            return;
        }
        this.items = response.data;
      }
    }
}

</script>