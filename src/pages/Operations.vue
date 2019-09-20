<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row">
        <div class="col-12 col-md-8">
          <div class="q-pa-md">
            <q-table
              title="Operations"
              :data="operations"
              :columns="columns"
              row-key="name"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'OperationsPage',
  data: () => ({
    columns: [
      {
        name: 'card_id',
        required: true,
        label: 'Card id',
        align: 'left',
        field: 'card_id',
        sortable: true
      },
      { name: 'value', align: 'center', label: 'Value', field: 'value', sortable: true }
    ],
    operations: []
  }),
  methods: {
    ...mapActions({ getOperations: 'operation/getOperations' }),
    getOperationsList () {
      const callback = (operations) => {
        this.operations = operations
      }
      this.getOperations(callback)
    }
  },
  beforeMount () {
    this.getOperationsList()
  }
}
</script>
