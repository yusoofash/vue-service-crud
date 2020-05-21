<template>
  <div style="width:100%">
    <div class="d-flex">
      <h4>List of service:</h4>
      <v-spacer></v-spacer>
      <v-btn class="mb-4" color="primary" to="/add">Add Service</v-btn>
    </div>
    <v-card class="d-flex flex-column">
      <v-card-title class="grey--text text--darken-1">
        Services ({{services.length}})
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          style="max-width: 300px;"
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="services"
        :items-per-page="5"
        :search="search"
        class="elevation-1 ma-2"
        hide-default-footer
        @page-count="pageCount = $event"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn icon :to="'/edit/' + item.id" class="mr-2">
            <v-icon small>mdi-pencil {{item}}</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <div class="text-center pt-2 pb-2">
        <v-pagination v-model="page" :length="pageCount" circle></v-pagination>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ListService",
  data() {
    return {
      search: "",
      page: 1,
      pageCount: 0,
      headers: [
        {
          text: "Office Code",
          value: "officeCode"
        },
        { text: "Description", value: "description" },
        { text: "Billing Code", value: "billingCode" },
        { text: "Base Charge", value: "baseCharge" },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },
  computed: {
    ...mapGetters("service", {
      services: "services"
    })
  },
  methods: {
    ...mapActions({
      deleteService: "service/deleteService"
    }),
    deleteItem(item) {
      confirm("Are you sure?") && this.deleteService(item);
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
