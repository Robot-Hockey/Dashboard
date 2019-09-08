<template >
 <div class="fullscreen flex row q-pa-md" style="background: linear-gradient(to bottom left, #2e0080 0% ,#6b0480 100%)"  >
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md fixed-center"
    >
    <h4 style="color: white">Disco Voador</h4>
      <q-input rounded
        outlined
        bg-color="white"
        color="purple"
        label="Login"
        v-model="email"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Insira o login do administrador']"
      />
      <q-input rounded
        outlined
        bg-color="white"
        color="purple"
        type="password"
        label="Senha"
        v-model="password"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Insira a senha do administrador']"
      />
      <div>
        <q-btn flat rounded label="Entrar" type="entrar" color="white"/>
        <q-btn flat rounded label="Esqueceu sua senha?" type="reset" color="white" class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<style>
</style>

<script>
export default {
  data () {
    return {
      email: null,
      password: null,
      accept: false
    }
  },

  methods: {
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'You need to accept the license and terms first'
        })
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Submitted'
        })
      }
    },
    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    }
  }
}
</script>
