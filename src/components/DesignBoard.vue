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
            gridWidth: 7,
            gridHeight: 7,
            authCode: sessionStorage.getItem('authcode'),
            gameName: sessionStorage.getItem('gamename'),
            playerName: sessionStorage.getItem('playername'),
            ship: sessionStorage.getItem("ship"),
            captain: sessionStorage.getItem("captain"),
            gridWidth: sessionStorage.getItem("gridWidth"),
            gridHeight: sessionStorage.getItem("gridHeight"),
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
            this.grids[1].removeAll();
            if (this.$socket.connected){
                this.$socket.emit('getGridDim',
                    {
                        gameName: this.gameName,
                        playerName: this.playerName,
                        authCode: this.authCode,
                        board: serializedData
                    }
                );
                await this.$socket.on('response', (data) => {
                    if (data["error"] != false){
                        alert(data["error"]);
                        return;
                    }
                    sessionStorage.setItem('authcode', this.authCode);
                    sessionStorage.setItem('gamename', this.gameName);
                    sessionStorage.setItem('playername', this.playerName);
                    sessionStorage.setItem('gridWidth', this.gridWidth);
                    sessionStorage.setItem('gridHeight', this.gridHeight);
                    sessionStorage.setItem('captain', this.captain);
                    sessionStorage.setItem('ship', this.ship);
                    router.push("/WaitingRoom")
                });
            }
        },
        async randomiseBoard (){
            this.grids[1].removeAll();
            if (this.$socket.connected){
                this.$socket.emit('getGridDim',
                    {
                        gameName: this.gameName,
                        playerName: this.playerName,
                        authCode: this.authCode
                    }
                );
                await this.$socket.on('response', (data) => {
                    if (data["error"] != false){
                        alert(data["error"]);
                        return;
                    }
                    var board = data;
                    this.grids[0].load(board, true);
                    sessionStorage.setItem('authcode', this.authCode);
                    sessionStorage.setItem('gamename', this.gameName);
                    sessionStorage.setItem('playername', this.playerName);
                    sessionStorage.setItem('gridWidth', this.gridWidth);
                    sessionStorage.setItem('gridHeight', this.gridHeight);
                    sessionStorage.setItem('captain', this.captain);
                    sessionStorage.setItem('ship', this.ship);
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
                await this.$socket.on('response', (data) => {
                    if (data["error"] != false){
                        alert(data["error"]);
                        return;
                    }
                    this.gridWidth = data["x"]
                    this.gridHeight = data["y"]
                    sessionStorage.setItem("gridWidth", this.gridWidth);
                    sessionStorage.setItem("gridHeight", this.gridHeight);
                    sessionStorage.setItem('authcode', this.authCode);
                    sessionStorage.setItem('gamename', this.gameName);
                    sessionStorage.setItem('playername', this.playerName);
                    sessionStorage.setItem('captain', this.captain);
                    sessionStorage.setItem('ship', this.ship);
                });
            }

        },
        async getTiles(){
            if (this.$socket.connected){
                this.$socket.emit('amIHost',
                    {
                        gameName: this.gameName,
                        playerName: this.playerName
                    }
                );
                await this.$socket.on('response', (data) => {
                    if (data["error"] != false){
                        alert(data["error"]);
                        return;
                    }else{
                        this.items = data;
                    }
                    sessionStorage.setItem('authcode', this.authCode);
                    sessionStorage.setItem('gamename', this.gameName);
                    sessionStorage.setItem('playername', this.playerName);
                    sessionStorage.setItem('gridWidth', this.gridWidth);
                    sessionStorage.setItem('gridHeight', this.gridHeight);
                    sessionStorage.setItem('captain', this.captain);
                    sessionStorage.setItem('ship', this.ship);
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