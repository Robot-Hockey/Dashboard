<template >
 <div class="fullscreen flex row q-pa-md" style="background: linear-gradient(to bottom left, #2e0080 0% ,#6b0480 100%)"  >
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md fixed-center"
    >
      <q-card class="q-pa-md">
        <q-card-section>
          <div class="text-h6">Disco Voador</div>
        </q-card-section>
        <q-card-section>
          <q-input
            class="q-mt-sm"
            outlined
            color="purple"
            placeholder="Login"
            v-model="email"
            :dense="true"
          />
          <q-input
            :dense="true"
            class="q-mt-sm"
            outlined
            v-model="password"
            color="purple"
            :type="isPwd ? 'password' : 'text'"
            placeholder="Senha">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="q-mt-md">
            <q-btn flat label="Entrar" type="entrar" color="purple"/>
            <q-btn flat label="Esqueceu sua senha?"  type="reset" color="purple" class="q-ml-sm" />
          </div >
        </q-card-section>
      </q-card>
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
      password: '',
      isPwd: true
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
