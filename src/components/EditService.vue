<template>
  <AddService :id="$route.params.id" />
</template>

<script>
import AddService from './AddService'

export default {
  name: "EditService",
  components: { AddService }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
