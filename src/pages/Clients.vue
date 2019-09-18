<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row">
        <div class="col-12 col-md-8">
          <div class="q-pa-md">
            <q-table
              title="Clients"
              :data="data"
              :columns="columns"
              row-key="name"
            />
          </div>
        </div>
        <div class="col-12 col-md-4 ">
          <div class="q-pa-md">
            <q-card class="my-card q-pa-md">
              <q-card-section>
                <div class="text-h6">Create Client</div>
              </q-card-section>
              <q-card-section>
                <q-input class="q-pt-md" outlined v-model="text" label="Name" />
                <q-input class="q-pt-md" outlined v-model="text" label="Email" />
              </q-card-section>
              <q-separator inset />
              <q-card-section>
                <div class="q-pt-md">
                  <q-btn label="Submit" type="submit" color="primary"/>
                  <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
              </q-card-section>
            </q-card>
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
  name: 'ClientsPage',
  data () {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true }
      ],
      data: []
    }
  },
  methods: {
    ...mapActions({ getClients: 'client/getClients' })
  },
  beforeMount () {
    const callback = (data) => {
      this.data = data
    }
    this.getClients(callback)
  }
}
</script>
