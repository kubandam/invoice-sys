<template>
  <v-app>
    <div class="container mt-4">
      <Navbar />
      <NuxtPage />
    </div>
  </v-app>
</template>

<script>
import Navbar from '~/components/layout/Navbar'
export default {
  components: { Navbar }
}
</script>
