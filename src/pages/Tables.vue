<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row">
        <div class="col-12 col-md-8">
          <div class="q-pa-md">
            <q-table
              title="Tables"
              :data="tables"
              :columns="columns"
              row-key="name"
              selection="single"
              :selected.sync="selected"
            />
            <div class="q-mt-md">
              <q-btn @click="onDeleteTable()" color="primary" class="block" icon="delete" label="Delete" />
            </div>
            <!-- <div class="q-mt-md">
              Selected: {{ JSON.stringify(selected[0].id) }}
            </div> -->
          </div>
        </div>
        <div class="col-12 col-md-4 ">
          <div class="q-pa-md">
            <q-form
            @submit="onSubmit"
            @reset="onReset">
              <q-card class="my-card q-pa-md">
                <q-card-section>
                  <div class="text-h6">Create Table</div>
                </q-card-section>
                <q-card-section>
                  <q-input class="q-pt-md" outlined v-model="name" label="Name" />
                  <div class="q-pt-md">
                    <q-input
                      v-model="description"
                      outlined
                      label="Description"
                      type="textarea"
                    />
                  </div>
                </q-card-section>
                <q-separator inset />
                <q-card-section>
                  <div class="q-pt-md">
                    <q-btn label="Submit" type="submit" color="primary"/>
                    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                  </div>
                </q-card-section>
              </q-card>
            </q-form>
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
  name: 'TablesPage',
  data () {
    return {
      name: '',
      description: '',
      selected: [],
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
        { name: 'description',
          align: 'center',
          label: 'Description',
          field: 'description',
          sortable: false
        }
      ],
      tables: []
    }
  },
  methods: {
    ...mapActions({
      register: 'table/register',
      getClients: 'table/getTables',
      deleteTable: 'table/deleteTable'
    }),
    onSubmit () {
      const data = {
        name: this.name,
        description: this.description,
        company: sessionStorage.getItem('company_id')
      }
      this.register({
        data,
        callback: () => {
          this.onReset()
          this.getTablesList()
        }
      })
    },
    onReset () {
      this.name = ''
      this.description = ''
    },
    getTablesList () {
      const callback = (tables) => {
        this.tables = tables
      }
      this.getClients(callback)
    },
    onDeleteTable () {
      const data = {
        table_id: this.selected[0].id
      }
      this.deleteTable({
        data,
        callback: () => {
          this.onReset()
          this.getTablesList()
        }
      })
    }
  },
  beforeMount () {
    this.getTablesList()
  }
}
</script>
