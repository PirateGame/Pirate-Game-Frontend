<template>
    <div class="bg-gamepage">
        <h2>The Pirate Game</h2>
        <div class="board-holder">
            <div :class="['grid-stack grid-stack-' + gridWidth]"></div>
        </div>
        <div class="right-bar">
            <h2 style="margin-top:10px"> Game log </h2>
            <div class="flex-container" style="height:6%">
                <div class="flex-child" style="margin:0">
                    <h2> Stash: {{money}}</h2>
                </div>
                <div class="flex-child" style="margin:0">
                    <h2> Chest: {{bank}}</h2>
                </div>
            </div>
            <div class="flex-container" style="height:6%">
                <div class="flex-child" style="margin:0">
                    <h2> Mirror: {{mirror}}</h2>
                </div>
                <div class="flex-child" style="margin:0">
                    <h2> Shield: {{shield}}</h2>
                </div>
            </div>
            <br>
            <div class="gameLog" id="chat">
                <div class="message-dark">
                    <h3> Welcome to the Pirate Game </h3>
                </div>
            </div>
            <div v-show="isHost">
                <div class="flex-container">
                    <div class="flex-child" v-show="isPaused">
                        <input type="button" value="Resume" style="color: white; text-decoration: none;" class="big-button bg-green" @click="pauseGame">
                    </div>
                    <div class="flex-child" v-show="!isPaused">
                        <input type="button" value="Pause" style="color: white; text-decoration: none;" class="big-button bg-red" @click="pauseGame">
                    </div>
                    <div class="flex-child">
                    <input type="button" value="Stop" style="color: white; text-decoration: none;" class="big-button bg-red" @click="stopGame">
                    </div>
                </div>
            </div>
        </div>
        <div class="board-holder question" v-show="questionBool">
            <div class="question-box">
                <br>
                <h3> {{questionTitle}} </h3>
                <h3 v-for="line in questionSubTitle" v-bind:value="line" v-bind:key="line">
                    {{line}}
                </h3>
                <form>
                    <select v-model="selected">
                        <option v-for="option in optionList" v-bind:value="option" v-bind:key="option">
                            {{ option }}
                        </option>
                    </select>
                    <div style="text-align: center;">
                        <input type="button" value="Submit" style="color: white; text-decoration: none;" class="big-button bg-blue" @click="submitResponse">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import router from '../router/index';
export default {
    name: 'Game',
    data: function () {
        return {
            authCode: sessionStorage.getItem('authcode'),
            gameName: sessionStorage.getItem('gamename'),
            playerName: sessionStorage.getItem('playername'),
            ship: sessionStorage.getItem("ship"),
            captain: sessionStorage.getItem("captain"),
            gridWidth: sessionStorage.getItem("gridWidth"),
            gridHeight: sessionStorage.getItem("gridHeight"),
            mirror: 0,
            shield: 0,
            grid: null,
            isHost: false,
            isPaused: false,
            questionBool: false,
            selected: null,
            questionTitle: "",
            questionSubTitle: "",
            optionList: [],
            money: 0,
            bank: 0,
            currentTile: null,
        }
    },
    async mounted () {
        await this.amIhost()

        
        this.grid = GridStack.init({
            column: this.gridWidth,
            row: this.gridHeight,
            cellHeight: 90,
            disableDrag: true,
        });
        
        await this.getBoard()

        this.$socket.on("turn", (data) => {
            this.processTurn(data)
        });

        this.$socket.on("Event", (data) => {
            this.processEvent(data)
        });

        this.$socket.on("Question", (data) => {
            this.processQuestion(data)
        });
    },
    methods: {
        addMessage(message, turnNum){
            var div = document.createElement('div');
            div.innerHTML = '<h3 name="event">' + message + '</h3>';
            if (turnNum % 2 ==0){
                div.class = 'message'
            } else {
                div.class = 'message-dark'
            }
            

            var chat = document.getElementById("chat")

            chat.insertBefore(div, chat.children[0]);
        },
        clearAllMessages(){
            var log = document.getElementById("chat")
            while (log.firstChild) {
                log.removeChild(log.firstChild);
            }
        },
        pauseGame(){
            this.isPaused = !this.isPaused;
            if (this.isPaused){
                console.log("pause game")
            }
            else{
                console.log("Play game")
            }
        },
        async getBoard(){
            if (this.$socket.connected){
                this.$socket.emit('getBoard',
                    {
                        gameName: this.gameName,
                        playerName: this.playerName,
                        authCode: this.authCode
                });
            await this.$socket.on('getBoardResponse', (data) => {
                    if (data["error"] != false){
                        alert(data["error"]);
                        return;
                    }
                    else{
                        this.grid.load(data["board"]);
                    }
                });
            }
        },
        async amIhost(){
            if (this.$socket.connected){
                this.$socket.emit('amIHost',
                {
                    gameName: this.gameName,
                    playerName: this.playerName,
                    authCode: this.authCode,
                }
            );
            await this.$socket.on('amIHostResponse', (data) => {
                    if (data["error"] != false){
                        alert(data["error"]);
                        return;
                    }else{
                        this.isHost = true;
                    }
                });
            }
        },
            
        processTurn(data){
            this.money = data["money"]
            this.bank = data["bank"]
            this.shield = data["shield"]
            this.mirror = data["mirror"]
            var ids = data["ids"]

            for (var i = 0; i < ids.length; i++){
                var tile = this.grid.engine.nodes.find(n => n.id === ids[i]).el
                tile.children[0].className = "old-square" 
            }
            var latestTile = ids[ids.length - 1]
            var tile = this.grid.engine.nodes.find(n => n.id === latestTile).el
            tile.children[0].className = "current-square"
            this.clearAllMessages()
            var events = data["events"]
            for (var i = 0; i < events.length; i++){
                this.addMessage(events[i], ids.length)
            }
        },
        processQuestion(data){
            var questions = data["labels"]
            this.questionBool = true
                this.questionTitle = questions[0]
                if (questions.length > 1) {
                    this.questionSubTitle = questions.slice(1,-0)
                }
                this.optionList = data["options"]

        },
        processEvent(data){
            this.addMessage("this is an event rather than a turn")
            var message = data["events"]
            console.log(message)
            for (var i = 1; i < message.length; i++){
                this.addMessage(message[i])
            }

        },
        async submitResponse(){
            this.questionBool = false;
            if (this.$socket.connected){
                this.$socket.emit('submitResponse',
                    {
                        gameName: this.gameName,
                        playerName: this.playerName,
                        authCode: this.authCode,
                        choice: this.selected,
                });
                await this.$socket.on('submitResponseResponse', (data) => {
                    if (data["error"] != false){
                        alert(data["error"]);
                        return;
                    }
                });
            }
        }
    }
}

</script>