<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row">
        <div class="col-12 col-md-8">
          <div class="q-pa-md">
            <q-table
              title="Admins"
              :data="users"
              :columns="columns"
              row-key="name"
            />
          </div>
        </div>
        <div class="col-12 col-md-4 ">
          <div class="q-pa-md">
            <q-card class="my-card q-pa-md">
              <q-card-section>
                <div class="text-h6">Create Admin</div>
              </q-card-section>
              <q-card-section>
                <q-input class="q-pt-md" outlined v-model="name" label="Name" />
                <q-input class="q-pt-md" outlined v-model="email" label="Email" />
                <q-input
                  class="q-mt-sm"
                  outlined
                  v-model="password"
                  :type="isPwd ? 'password' : 'text'"
                  label="Senha">
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </q-card-section>
              <q-separator inset />
              <q-card-section>
                <div class="q-pt-md">
                  <q-btn label="Submit" type="submit" color="primary"/>
                  <q-btn @click="callReset" label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Register',
  data: () => ({
    name: '',
    email: '',
    password: '',
    isPwd: true,
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
      {
        name: 'email',
        align: 'center',
        label: 'Email',
        field: 'email',
        sortable: true
      }
    ],
    users: [
      {
        name: 'User 1',
        email: 'user1@email.com'
      },
      {
        name: 'User 2',
        email: 'user2@email.com'
      }
    ]
  }),
  methods: {
    ...mapActions({ register: 'user/register', getAdmins: 'user/getAdmins' }),
    callRegister () {
      const data = {
        name: this.name,
        company: this.company,
        email: this.email,
        password: this.password
      }
      this.register(data, this.onReset)
    },
    callReset () {
      this.name = ''
      this.email = ''
      this.password = ''
    }
  },
  beforeMount () {
    const changeAdmins = (value) => {
      this.users = value
    }
    this.getAdmins(changeAdmins)
  }
}
</script>

<style>
</style>
