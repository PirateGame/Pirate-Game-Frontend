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
import router from '../router/index';
export default {
    name: 'DesignBoard',
    data: function () {
        return {
            authCode: this.$store.state.authCode,
            gameName: this.$store.state.gameName,
            playerName: this.$store.state.playerName,
            gridWidth: this.$store.state.gridWidth,
            gridHeight: this.$store.state.gridGHeight,
            items: [],
        }
    },
    async mounted () {
        await this.getGridDim();
        
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
        this.grids[0].load(MANDATORYitems);

        this.grids[1].float(false);
        this.grids[1].column(1);
        this.grids[1].opts.cellHeight = 40; //pixels
        this.getTiles();
        this.grids[1].load(this.items);
    },
    methods: {
        async submitBoard(){
            var serializedData = this.grids[0].save();
            this.grids[1].removeAll();
            if (this.$socket.connected){
                this.$socket.emit('saveBoard',
                    {
                        gameName: this.gameName,
                        playerName: this.playerName,
                        authCode: this.authCode,
                        board: serializedData
                    }
                );
                await this.$socket.on('saveBoardResponse', (data) => {
                    if (data["error"] != false){
                        console.log("board failed to submit")
                        alert(data["error"]);
                        return;
                    }
                    router.push("/WaitingRoom")
                });
            }
        },
        async randomiseBoard (){
            this.grids[1].removeAll();
            if (this.$socket.connected){
                this.$socket.emit('randomiseBoard',
                    {
                        gameName: this.gameName,
                        playerName: this.playerName,
                        authCode: this.authCode
                    }
                );
                await this.$socket.on('randomiseBoardResponse', (data) => {
                    if (data["error"] != false){
                        console.log("board failed to submit")
                        alert(data["error"]);
                        return;
                    }
                    else {
                        this.grids[0].load(data["board"]);
                    }
                });
            }
        },
        async getGridDim () {
            if (this.$socket.connected){
                this.$socket.emit('getGridDim',
                    {
                        gameName: this.gameName,
                        playerName: this.playerName
                    }
                );
                await this.$socket.on('getGridDimResponse', (data) => {
                    if (data["error"] != false){
                        console.log("board failed to submit")
                        alert(data["error"]);
                        return;
                    }else{
                        console.log("got grid dimensions")
                        this.gridWidth = data["x"]
                        this.gridHeight = data["y"]
                        this.$store.commit("updateGridWidth", this.gridWidth)
                        this.$store.commit("updateGridHeight", this.gridHeight)
                    }
                });
            }

        },
        async getTiles(){
            if (this.$socket.connected){
                this.$socket.emit('getTiles',
                    {
                        gameName: this.gameName,
                        playerName: this.playerName
                    }
                );
                await this.$socket.on('getTilesResponse', (data) => {
                    if (data["error"] != false){
                        console.log("failed to get tiles")
                        alert(data["error"]);
                        return;
                    } else {
                        console.log("got tiles")
                        this.grids[1].load(data["tiles"]);
                    }
                });
            }
        },
        async clearGrid(){
            this.grids[0].removeAll();
            this.grids[1].removeAll();
            this.getTiles()
            this.grids[0].load([{content: '£5000',noResize: true, noMove:false}]);
            this.grids[1].load(this.items, true);
        }
    }
}

</script>