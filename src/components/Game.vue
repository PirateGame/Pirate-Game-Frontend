<template>
    <div class="bg-gamepage">
        <h2 class="tooltip-wrap">The Pirate Game
            <div class="tooltip-content board-holder"> Your name: {{playerName}} <br> Game name: {{gameName}} <br> Ship: {{ship}} <br> Captain: {{captain}} </div>
        </h2>
        <div class="board-holder">
            <div :class="['grid-stack grid-stack-' + gridWidth]"></div>
        </div>
        <div class="right-bar">
            <div class="flex-vertical-container" style="height:100%; margin:0">
                <div class="flex-child">
                    <div class="flex-container" style="margin:0">
                        <h2 class="flex-child"> Game log </h2>
                        <div v-show="isHost" class="flex-child" style="flex-grow:2">
                            <input type="button" value="Host Controls" style="color: white; text-decoration: none;" class="big-button bg-blue">
                        </div>
                    </div>
                </div>
                <div class="flex-child">
                    <div class="flex-container">
                        <div class="flex-child" style="margin:0">
                            <h2 style="margin:0"> Stash: {{money}}</h2>
                        </div>
                        <div class="flex-child" style="margin:0">
                            <h2 style="margin:0"> Chest: {{bank}}</h2>
                        </div>
                    </div>
                </div>
                <div class="flex-child">
                    <div class="flex-container">
                        <div class="flex-child" style="margin:0">
                            <h2 style="margin:0"> Mirror: {{mirror}}</h2>
                        </div>
                        <div class="flex-child" style="margin:0">
                            <h2 style="margin:0"> Shield: {{shield}}</h2>
                        </div>
                    </div>
                </div>
                <div class="flex-child" style="flex-grow:10">
                    <div class="gameLog" id="chat">
                        <div class="message-dark">
                            <h3> Welcome to the Pirate Game </h3>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="board-holder question" v-show="questionBool">s
            <div class="question-box">
                <br>
                <h3> {{questionTitle}} </h3>
                <h3 v-for="line in questionSubTitle" v-bind:value="line" v-bind:key="line">
                    {{line}}
                </h3>
                <div class="flex-vertical-box" style="height:70%">
                    <div class="flex-child">
                        <select v-model="selected">
                            <option v-for="option in optionList" v-bind:value="option" v-bind:key="option">
                                {{ option }}
                            </option>
                        </select>
                    </div>
                    <div class="flex-child" style="text-align: center">
                        <input type="button" value="Submit" style="color: white; text-decoration: none;" class="big-button bg-blue" @click="submitResponse">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Game',
    data: function () {
        return {
            authCode: this.$store.state.authCode,
            gameName: this.$store.state.gameName,
            playerName: this.$store.state.playerName,
            gridWidth: this.$store.state.gridWidth,
            gridHeight: this.$store.state.gridHeight,
            ship: this.$store.state.ship,
            captain: this.$store.state.captain,
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

        console.log(this.gridWidth)

        
        this.grid = GridStack.init({
            column: this.gridWidth,
            row: this.gridHeight,
            cellHeight: 90,
            disableDrag: true,
            staticGrid: true,
            disableOneColumnMode: true,
        });
        
        await this.getBoard()

        this.$socket.on("turn", (data) => {
            this.processTurn(data)
        });

        this.$socket.on("Event", (data) => {
            this.processEvent(data)
        });

        this.$socket.on("End", (data) => {
            router.push("/Leaderboard")
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
            this.questionBool = false

            for (var i = 0; i < ids.length; i++){
                var tile = this.grid.engine.nodes.find(n => n.id === ids[i]).el
                tile.children[0].className = "old-square" 
            }
            var latestID = ids[ids.length - 1]
            var latestTile = this.grid.engine.nodes.find(n => n.id === latestID).el
            latestTile.children[0].className = "current-square"
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