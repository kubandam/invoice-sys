<template>
    <div class="container">
        <h1 class="text-center text-white">Login Page</h1>
        <div class="row justify-content-center">
            <div class="col-md-6">
              <form @submit.prevent="login">
                    <v-text-field
                    hide-details="auto"
                    label="Name"
                    v-model="user.username"
                  ></v-text-field>
                  <v-text-field
                  hide-details="auto"
                  label="Password"
                  class="mt-5"
                  v-model="user.password"
                ></v-text-field>
                <v-btn type="submit" prepend-icon="$vuetify" class="mt-5">
                  Login
                </v-btn>
              </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/composables/authStore';

const { authenticateUser } = useAuthStore();

const { authenticated } = storeToRefs(useAuthStore());

const user = ref({
  username: '', 
  password: '',
});
const router = useRouter();

const login = async () => {
  await authenticateUser(user.value);
  if (authenticated) {
    router.push('/users');
  }
};
</script>

<style scoped>

</style>