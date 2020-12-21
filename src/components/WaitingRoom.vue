<template>
    <div class="bg-pirate">
        <h1 class="title">Please wait</h1>
        <h2> in this page players should be able to see who is in the game.</h2>
        <h2>your secret code is: {{secretcode}}</h2>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            secretcode: localStorage.getItem('authcode'),
        }
    }
}

</script>
