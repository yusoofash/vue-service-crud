<template>
  <v-card class="flex-grow-1">
    <v-card-title class="grey--text text--darken-1">
      <div v-if="id">Edit Service</div>
      <div v-else>Add Service</div>
    </v-card-title>

    <v-divider></v-divider>

    <form class="pa-3">
      <v-text-field
        v-model="data.officeCode"
        :error-messages="requiredErrors('officeCode', 'Office Code')"
        label="Office Code"
        required
        @input="$v.data.officeCode.$touch()"
        @blur="$v.data.officeCode.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="data.billingCode"
        :error-messages="requiredErrors('billingCode', 'Billing Code')"
        label="Billing Code"
        required
        @input="$v.data.billingCode.$touch()"
        @blur="$v.data.billingCode.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="data.description"
        :error-messages="requiredErrors('description', 'Description')"
        label="Description"
        required
        @input="$v.data.description.$touch()"
        @blur="$v.data.description.$touch()"
      ></v-text-field>

      <v-row>
        <v-col>
          <label class="grey--text text--darken-1">UOM Type</label>
        </v-col>
        <v-col>
          <v-radio-group v-model="data.uomType" row>
            <v-radio label="Days" value="Days"></v-radio>
            <v-radio label="Units" value="Units"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <v-text-field
        v-model="data.baseCharge"
        :error-messages="requiredErrors('baseCharge', 'Base Charge')"
        label="$ Base Charge"
        required
        @input="$v.data.baseCharge.$touch()"
        @blur="$v.data.baseCharge.$touch()"
      ></v-text-field>

      <v-row>
        <v-col>
          <label class="grey--text text--darken-1">Claim Type</label>
        </v-col>
        <v-col>
          <v-radio-group v-model="data.claimType" row>
            <v-radio label="Professional" value="Professional"></v-radio>
            <v-radio label="Institutional" value="Institutional"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <label class="grey--text text--darken-1">Service Type</label>
        </v-col>
        <v-col>
          <v-radio-group v-model="data.serviceType" row>
            <v-radio label="Group" value="Group"></v-radio>
            <v-radio label="Individual" value="Individual"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      <v-card outlined class="container">
        <div class="d-flex">
          Modifiers
          <v-spacer></v-spacer>

          <Modifier :btnPositionList="btnPositionList" :modifierList="modifierList" 
          @onAdd="addModifier" />
        </div>

        <div class="d-flex">
          <v-chip
            v-for="(modifier, index) in data.modifiers"
            :key="index"
            class="mr-2"
            close
            text-color="white"
            :color="getColorFromPosition(modifier.position)"
            @click:close="removeModifier(modifier)"
          >
            <v-avatar
              left
              color="white"
              :style="{ color: getColorFromPosition(modifier.position)  }"
            >{{modifier.position}}</v-avatar>
            {{modifier.code}}
          </v-chip>
        </div>
      </v-card>

      <div class="d-flex mt-2 flex-row-reverse">
        <v-btn outlined color="blue" style="width: 80px" v-if="id" @click="editService()">SAVE</v-btn>
        <v-btn outlined color="blue" style="width: 80px" v-else @click="addService">ADD</v-btn>
        <v-btn outlined color="indigo" class="mr-2" style="width: 80px" to="/">CANCEL</v-btn>
      </div>
    </form>
  </v-card>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, decimal } from "vuelidate/lib/validators";

import Modifier from "./Modifier";

export default {
  name: "AddService",

  components: { Modifier },

  mixins: [validationMixin],

  validations: {
    data: {
      officeCode: { required },
      billingCode: { required },
      description: { required },
      baseCharge: { required, decimal },
      uomType: { required },
      claimType: { required },
      serviceType: { required }
    }
  },

  data() {
    return {
      data: {
        officeCode: "",
        billingCode: "",
        description: "",
        baseCharge: "",
        uomType: "Days",
        claimType: "Professional",
        serviceType: "Individual",
        modifiers: [{ position: 1, code: "AE - EA" }]
      },
      btnPositionList: [
        { position: 1, color: "green" },
        { position: 2, color: "blue" },
        { position: 3, color: "orange" },
        { position: 4, color: "indigo" }
      ],
      modifierList: ["AE - EA", "AB - BA"]
    };
  },

  props: {
    id: String
  },

  methods: {
    requiredErrors(fieldName, label) {
      const errors = [];
      if (!this.$v.data[fieldName].$dirty) return errors;
      !this.$v.data[fieldName].required && errors.push(`${label} is required.`);
      !this.$v.data[fieldName].decimal &&
        this.$v.data[fieldName].decimal === false &&
        errors.push(`${label} must be decimal.`);
      return errors;
    },

    addModifier({ position, code }) {
      this.data.modifiers.push({
        position,
        code
      });
    },
    getColorFromPosition(position) {
      const color = this.btnPositionList?.find(p => p.position === position)
        .color;
      return color;
    },
    removeModifier(modifier) {
      const index = this.data.modifiers.indexOf(modifier);
      this.data.modifiers.splice(index, 1);
    },
    addService() {
      this.$store.commit("service/addService", { ...this.data });
      this.$router.push("/");
    },
    editService() {
      this.$store.commit("service/updateService", {
        ...this.data,
        id: this.id
      });
      this.$router.push("/");
    }
  },

  mounted() {
    const editData = this.id && this.$store.getters["service/serviceById"](this.id);
    if (editData) {
      Object.assign(this.data, editData);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
