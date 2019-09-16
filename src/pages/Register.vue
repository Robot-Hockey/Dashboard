<template>
  <q-page class="flex flex-center">
      <div class="q-gutter-md">
        <q-form @submit="callRegister" @reset="onReset" class="q-gutter-md fixed-center">
          <q-card class="q-pa-md">
            <q-card-section>
              <p class="text-h4 title">Create new account</p>
            </q-card-section>
            <q-card-section>
              <q-input class="q-mt-sm" v-model="name" :dense="true" outlined placeholder="Name" />
              <q-select class="q-mt-sm" v-model="company" :options="options" :dense="true" outlined label="Company" />
              <q-input class="q-mt-sm" v-model="email" :dense="true" outlined placeholder="E-mail" />
              <q-input type="password" class="q-mt-sm" v-model="password" :dense="true" outlined placeholder="Password" />
              <div class="q-mt-md">
                <q-btn
                  type="submit"
                  class="full-width q-mt-sm"
                  color="indigo-3"
                  text-color="black"
                >Send</q-btn>
              </div>
            </q-card-section>
          </q-card>
        </q-form>
      </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Register',
  data: () => ({
    name: '',
    company: {},
    email: '',
    password: '',
    options: []
  }),
  methods: {
    ...mapActions({ register: 'user/register', getCompanies: 'user/getCompanies' }),
    callRegister () {
      console.log('oi')
      const data = {
        name: this.name,
        company: this.company,
        email: this.email,
        password: this.password
      }
      this.register(data, this.onReset)
    },
    onReset () {
      this.name = ''
      this.company = {}
      this.email = ''
      this.password = ''
    }
  },
  beforeMount () {
    const changeCompanies = (value) => {
      this.options = value
    }
    this.getCompanies(changeCompanies)
  }
}
</script>

<style>
body {
  background: linear-gradient(to bottom left, #2e0080 0%, #6b0480 100%);
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

</style>
