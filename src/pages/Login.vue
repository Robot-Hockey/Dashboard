<template >
 <div class="fullscreen flex row q-pa-md" style="background: linear-gradient(to bottom left, #2e0080 0% ,#6b0480 100%)"  >
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md fixed-center"
    >
    <h4 style="color: white">Disco Voador</h4>
      <q-input
        outlined
        color="white"
        placeholder="Login"
        v-model="email"
        :dense="true"
      />
      <q-input
        outlined
        color="white"
        type="password"
        placeholder="Senha"
        v-model="password"
        :dense="true"
      />
      <div>
        <q-btn flat label="Entrar" type="entrar" color="white"/>
        <q-btn flat label="Esqueceu sua senha?" type="reset" color="white" class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<style>
</style>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions({ login: 'user/login' }),
    onSubmit () {
      const data = {
        email: this.email,
        password: this.password
      }
      this.login(data)
    },
    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    }
  }
}
</script>
