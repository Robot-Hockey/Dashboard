<template>
  <q-page class="flex flex-center">
    tokenjoj:
    {{authToken}}
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'HomePage',
  data: () => ({
    authToken: sessionStorage.getItem('auth-token')
  })
}
</script>
