<template >
 <div class="fullscreen flex row q-pa-md" style="background: linear-gradient(to right, #00c6ff 0% ,#0073FF 100%)"  >
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md fixed-center">
      <q-card class="q-pa-md">
        <q-card-section>
          <div class="text-h6">Flying Hockey</div>
        </q-card-section>
        <q-card-section>
          <q-input
            class="q-mt-sm"
            outlined
            type="email"
            label="E-mail"
            v-model="email"
          />
          <q-input
            class="q-mt-sm"
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
          <div class="q-mt-md">
            <q-btn flat label="Forgot your password?"  color="blue" type="reset" class="q-ml-sm" />
            <q-btn label="Login" type="submit" color="blue"/>
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
    ...mapActions({
      login: 'user/login'
    }),
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
