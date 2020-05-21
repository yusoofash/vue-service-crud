<template>
  <v-app>
    <v-container style="max-width: 800px">
      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "App",
}
</script>
