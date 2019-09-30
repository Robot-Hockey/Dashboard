<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row">
        <div class="col-12 col-md-8">
          <div class="q-pa-md">
            <q-table
              title="Clients"
              :data="clients"
              :columns="columns"
              row-key="name"
              selection="single"
              :selected.sync="selected"
            />
            <div class="q-mt-md">
              <q-btn @click="onDeleteClient()" color="primary" class="block" icon="delete" label="Delete" />
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4 ">
          <div class="q-pa-md">
            <q-form
              @submit="onSubmit"
              @reset="onReset"
            >
              <q-card class="my-card q-pa-md">
                <q-card-section>
                  <div class="text-h6">Create Client</div>
                </q-card-section>
                <q-card-section>
                  <q-input
                    class="q-pt-md"
                    outlined
                    v-model="name"
                    label="Name"
                  />
                  <q-input
                    class="q-pt-md"
                    outlined
                    v-model="email"
                    label="Email"
                  />
                </q-card-section>
                <q-separator inset />
                <q-card-section>
                  <div class="q-pt-md">
                    <q-btn
                      label="Submit"
                      type="submit"
                      color="primary"
                    />
                    <q-btn
                      label="Reset"
                      type="reset"
                      color="primary"
                      flat
                      class="q-ml-sm"
                    />
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
  name: 'ClientsPage',
  data () {
    return {
      name: '',
      email: '',
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
        { name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true }
      ],
      clients: []
    }
  },
  methods: {
    ...mapActions({
      register: 'client/register',
      getClients: 'client/getClients',
      deleteClient: 'client/deleteClient'
    }),
    onSubmit () {
      const data = {
        name: this.name,
        company: sessionStorage.getItem('company_id'),
        email: this.email
      }
      this.register({
        data,
        callback: () => {
          this.onReset()
          this.getClientsList()
        }
      })
    },
    onReset () {
      this.name = ''
      this.email = ''
    },
    getClientsList () {
      const callback = (clients) => {
        this.clients = clients
      }
      this.getClients(callback)
    },
    onDeleteClient () {
      this.$q.dialog({
        title: 'Delete Client',
        message: 'Do you wish to delete this client?',
        cancel: 'Cancel',
        ok: 'Yes',
        color: 'primary'
      }).onOk(() => {
        const data = {
          client_id: this.selected[0].id
        }
        this.deleteClient({
          data,
          callback: () => {
            this.onReset()
            this.getClientsList()
          }
        })
        this.$router.go()
      })
    }
  },
  beforeMount () {
    this.getClientsList()
  }
}
</script>
