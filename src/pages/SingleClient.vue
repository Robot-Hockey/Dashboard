<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row">
        <div class="col-12 col-md-12 ">
          <div class="q-pa-md">
            <q-card class="my-card q-pa-md">
              <q-card-section>
                <div class="text-h6">Client name: {{client.name}} </div>
                <div class="text-h6">Client email: {{client.email}} </div>
                <div class="text-h6">Credits: {{client.value}} </div>
                <div class="text-h6">Card public id: {{client.public_id}} </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="col-12 col-md-12">
          <div class="q-pa-md">
            <q-table
              title="Operations"
              :data="client.operations"
              :columns="columns"
              row-key="name"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
import { Loading } from 'quasar'
export default {
  data () {
    return {
      client: {},
      columns: [
        { name: 'email', align: 'center', label: 'Value', field: 'value', sortable: true },
        { name: 'date',
          align: 'center',
          label: 'Date',
          field: row => {
            const date = new Date(row.created_at)
            return `${date.getHours()}:${date.getMinutes()} - ${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
          },
          sortable: true }
      ]
    }
  },
  async beforeMount () {
    const { id } = this.$route.params
    Loading.show()
    const callback = (client) => {
      this.client = client
    }
    const cardCB = (card) => {
      this.client = { ...this.client, value: card.value, public_id: card.public_id, card_id: card.id }
    }
    const operationsCB = (operations) => {
      this.client = { ...this.client, operations }
    }
    await this.getClient({ callback, id })
    await this.getCard({ callback: cardCB, id })
    await this.getOperations({ callback: operationsCB, id: this.client.card_id })
    Loading.hide()

    console.log(this.client)
  },
  methods: {
    ...mapActions({
      getClient: 'client/getClient',
      getCard: 'client/getClientCard',
      getOperations: 'client/getClientOperations'
    })
  }
}
</script>
