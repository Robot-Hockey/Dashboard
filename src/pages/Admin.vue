<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row">
        <div class="col-12 col-md-8">
          <div class="q-pa-md">
            <q-table
              title="Admins"
              :data="admins"
              :columns="columns"
              row-key="name"
              selection="single"
              :selected.sync="selected"
            />
            <div class="q-mt-md">
              <q-btn @click="onDeleteAdmin()" color="primary" class="block" icon="delete" label="Delete" />
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4 ">
          <div class="q-pa-md">
            <q-form
            @submit="onSubmit"
            @reset="onReset">
              <q-card class="my-card q-pa-md">
                <q-card-section>
                  <div class="text-h6">Create Admin</div>
                </q-card-section>
                <q-card-section>
                  <q-input class="q-pt-md" outlined v-model="name" label="Name" />
                  <q-input class="q-pt-md" outlined type="email" v-model="email" label="Email" />
                  <q-input
                    class="q-mt-md"
                    outlined
                    v-model="password"
                    :type="isPwd ? 'password' : 'text'"
                    label="Password">
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
                  <div>
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

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Register',
  data: () => ({
    name: '',
    email: '',
    password: '',
    isPwd: true,
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
      {
        name: 'email',
        align: 'center',
        label: 'Email',
        field: 'email',
        sortable: true
      }
    ],
    admins: []
  }),
  methods: {
    ...mapActions({
      register: 'user/register',
      getAdmins: 'user/getAdmins',
      deleteAdmin: 'user/deleteAdmin'
    }),
    onSubmit () {
      const data = {
        name: this.name,
        company: sessionStorage.getItem('company_id'),
        email: this.email,
        password: this.password
      }
      this.register({
        data,
        callback: () => {
          this.onReset()
          this.getAdminsList()
        }
      })
    },
    onReset () {
      this.name = ''
      this.email = ''
      this.password = ''
    },
    getAdminsList () {
      const callback = (admins) => {
        this.admins = admins
      }
      this.getAdmins(callback)
    },
    onDeleteAdmin () {
      this.$q.dialog({
        title: 'Delete Admin',
        message: 'Do you wish to delete this admin user?',
        cancel: 'Cancel',
        ok: 'Yes',
        color: 'primary'
      }).onOk(() => {
        const data = {
          user_id: this.selected[0].id
        }
        this.deleteAdmin({
          data,
          callback: () => {
            this.onReset()
            this.getAdminsList()
          }
        })
        this.$router.go()
      })
    }
  },
  beforeMount () {
    this.getAdminsList()
  }
}
</script>

<style>
</style>
