<template>
    <div class="bg-pirate">
        <h1 class="title">Admin Panel</h1>
        <h2>This is where we can oversee all the games in progress</h2>
    </div>
</template>
<script>
export default {
    name: 'HostPanel',
    data: function () {
        return {
            //probably don't need this.
            secretcode: localStorage.getItem('authcode'),
            gameName: localStorage.getItem('gamename')
        }
    },
    async mounted () {
        //get a list of games and their states to be displayed
    }
}

</script>
