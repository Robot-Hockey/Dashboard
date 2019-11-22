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
              row-key="more"
            >
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td
                    key="name"
                    :props="props"
                  >
                    {{ props.row.name }}
                  </q-td>
                  <q-td
                    key="email"
                    :props="props"
                  >
                    <q-badge color="green">
                      {{ props.row.email }}
                    </q-badge>
                  </q-td>
                  <q-td
                    key="more"
                    :props="props"
                  >
                    <q-btn
                      color="purple"
                      @click="$router.replace(`/clients/${props.row.id}`)"
                    >
                      show more
                    </q-btn>
                  </q-td>

                  <q-td
                    key="delete"
                    :props="props"
                  >
                    <q-btn
                      color="red"
                      @click="onDeleteClient(props.row.id)"
                    >
                      delete
                    </q-btn>
                  </q-td>
                </q-tr>
              </template>

            </q-table>
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
        { name: 'name', align: 'center', label: 'Name', field: 'name', sortable: true },
        { name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true },
        { name: 'more',
          align: 'center',
          label: 'See more',
          field: row => row.id,
          sortable: false },
        { name: 'delete', align: 'center', label: 'Delete', field: row => row.id, sortable: false }

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
        const mappedData = clients.map(item => ({
          ...item,
          name: item.name || ''
        }))
        this.clients = mappedData
      }
      this.getClients(callback)
    },
    onDeleteClient (id) {
      this.$q.dialog({
        title: 'Delete Client',
        message: 'Do you wish to delete this client?',
        cancel: 'Cancel',
        ok: 'Yes',
        color: 'primary'
      }).onOk(() => {
        const data = {
          client_id: id
        }
        this.deleteClient({
          data,
          callback: () => {
            this.onReset()
            this.getClientsList()
          }
        })
      })
    }
  },
  beforeMount () {
    this.getClientsList()
  }
}
</script>
