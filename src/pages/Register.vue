<template>
  <div class="q-pa-md main">
    <div class="q-gutter-md">
      <p class="text-h4 title">Create new account</p>
      <q-input color="indigo-3" v-model="name" :dense="true" outlined placeholder="Name" />
      <q-select v-model="company" :options="options" :dense="true" outlined label="Company" />
      <q-input v-model="email" :dense="true" outlined placeholder="E-mail" />
      <q-input v-model="password" :dense="true" outlined placeholder="Password" />
      <q-btn @click="callRegister()" class="full-width" color="indigo-3" text-color="black">Send</q-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Register',
  data: () => ({
    name: '',
    company: '',
    email: '',
    password: '',
    options: ['moura tiltolandia', 'joooj negócios'] // delete after
  }),
  methods: {
    ...mapActions({ register: 'user/register' }),
    callRegister () {
      const data = {
        name: this.name,
        company: this.company,
        email: this.email,
        password: this.password
      }
      this.register(data)
    }
  }
}
</script>

<style>
body {
  background: linear-gradient(to bottom left, #2e0080 0%, #6b0480 100%);
}
input {
  color: white;
}
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.title {
  color: white;
}
</style>

<style lang="stylus">
.q-field__native {
  color: white;
}

.q-field__label {
  color: white;
}
</style>
