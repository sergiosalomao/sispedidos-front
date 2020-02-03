<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    if (this.$store.getters['auth/isAuthenticated']) {
      this.$store.dispatch('user/USER_REQUEST');
    }
  },
};
</script>
