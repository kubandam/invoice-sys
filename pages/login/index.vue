<template>
    <div class="container">
        <h1 class="text-center text-white">Login Page</h1>
        <div class="row justify-content-center">
            <div class="col-md-6">
              <form @submit.prevent="login">
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="name" id="name" v-model="user.username" required class="form-control">
                </div>
                
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" v-model="user.password" required class="form-control">
                </div>
                
                <button type="submit" class="btn btn-primary mt-3 d-flex justify-content-center w-25 mx-auto">Login</button>
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