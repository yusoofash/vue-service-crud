<template>
  <v-dialog v-model="dialog" persistent max-width="340">
    <template v-slot:activator="{ on }">
      <v-btn icon>
        <v-icon color="blue" v-on="on">mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Add Modifier</v-card-title>
      <v-divider></v-divider>
      <v-col class="d-flex align-center" cols="12">
        <v-combobox :items="modifierList" v-model="modifier" label="Code"></v-combobox>
        <v-btn icon @click="addModifierToPredefinedList">
          <v-icon color="blue">mdi-plus</v-icon>
        </v-btn>
      </v-col>

      <v-col class="d-flex flex-column pt-0">
        <p class="grey--text text--darken-1">Position of Modifier</p>
        <v-col class="d-flex pa-0">
          <v-btn
            v-for="btn in btnPositionList"
            :key="btn.position"
            :color="btn.color"
            v-bind="{ outlined: btnPosition !== btn.position }"
            class="mr-2"
            style="min-width: 0px; width: 30px;height: 30px"
            @click="btnPosition = btn.position"
          >{{ btn.position }}</v-btn>
        </v-col>
      </v-col>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" outlined @click="dialog = false">CANCEL</v-btn>
        <v-btn color="indigo" outlined @click="dialog = false; addModifier()">ADD</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Modifier",

  props: {
    btnPositionList: Array,
    modifierList: Array,
  },

  data() {
    return {
      dialog: false,
      btnPosition: 1,
      modifier: "AE - EA",
    };
  },

  methods: {
    addModifier() {
      this.$emit("onAdd", {
          position: this.btnPosition,
          code: this.modifier
      });
    },

    addModifierToPredefinedList() {
      this.modifierList.push(this.modifier);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
