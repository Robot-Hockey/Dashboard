<template>
  <q-page class="flex flex-center">
    {{authToken}}
    {{company_id}}
    {{username}}
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'HomePage',
  data: () => ({
    authToken: sessionStorage.getItem('auth-token'),
    company_id: sessionStorage.getItem('company_id'),
    username: sessionStorage.getItem('username')
  })
}
</script>
