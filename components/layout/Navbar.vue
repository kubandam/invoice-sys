<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <nuxt-link class="navbar-brand mb-0 h1" to="/">Invoice sys</nuxt-link>
      <div class="d-flex">
        <nuxt-link v-if="!authenticated" class="navbar-brand mb-0 h1" to="/signup">Register</nuxt-link>
        <nuxt-link v-if="!authenticated" class="navbar-brand mb-0 h1" to="/login">Login</nuxt-link>
        <nuxt-link v-if="authenticated" class="navbar-brand mb-0 h1" to="/" @click="logout">Logout</nuxt-link>
        <nuxt-link v-if="authenticated" class="navbar-brand mb-0 h1" to="/profile">Profile</nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '@/composables/authStore'; // import the auth store we just created

const router = useRouter();

const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const logout = () => {
  logUserOut();
  router.push('/');
};
</script>

<style lang="scss" scoped>

</style>