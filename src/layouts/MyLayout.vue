<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Air Hockey Dashboard
        </q-toolbar-title>
        <q-btn round dense flat icon="notifications" class="q-mr-md" />
        <q-btn @click="logout()" round dense flat icon="exit_to_app" class="q-mr-xs" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2">
      <q-list>
        <q-item clickable tag="a" href="/#/">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" href="/#/admin">
          <q-item-section avatar>
            <q-icon name="how_to_reg" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Admin</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" href="/#/clients">
          <q-item-section avatar>
            <q-icon name="people_alt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Clients</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" href="/#/tables">
          <q-item-section avatar>
            <q-icon name="widgets" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Tables</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" href="/#/operations">
          <q-item-section avatar>
            <q-icon name="shop" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Operations</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" href="/#/matches">
          <q-item-section avatar>
            <q-icon name="gamepad" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Matches</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" href="/#/rank">
          <q-item-section avatar>
            <q-icon name="emoji_events" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Rank</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import auth from '../services/auth'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    openURL,
    logout () {
      this.$q.dialog({
        title: 'Logging out',
        message: 'Do you wish to logout?',
        cancel: 'Cancel',
        ok: 'Yes',
        color: 'primary'
      }).onOk(() => {
        auth.logout()
        sessionStorage.setItem('company_id', '')
        sessionStorage.setItem('username', '')
        this.$router.go()
      })
    }
  }
}
</script>

<style>
</style>
