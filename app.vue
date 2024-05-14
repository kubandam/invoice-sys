<template>
  <v-app>
    <div class="container mt-4">
      <Navbar />
      <NuxtPage />
    </div>
    <UNotifications 
      :ui="{
        strategy: 'override',
        position: 'top-0 bottom-auto right-0'
      }"/>
  </v-app>
</template>

<script>
import Navbar from '~/components/layout/Navbar'
export default {
  components: { Navbar }
}
</script>
