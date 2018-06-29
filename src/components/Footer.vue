<template>
  <footer>
      <p>{{copyright}}</p>
  </footer>
</template>

<script>
export default {
    data () {
        return {
        copyright: 'Copyright 2018 Klassifai'
        }
    }
}
</script>

<style>
footer{
    background: #222;
    padding: 6px;
}
p{
    color: white;
    text-align: center;
}
</style>