<template>
    <div class="container">
        <h1 class="text-center text-white">Signup Page</h1>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form @submit.prevent="createUser">
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" v-model="user.email" required class="form-control">
                    </div>
                    
                    <div class="form-group">
                        <label for="password">Name:</label>
                        <input type="name" id="name" v-model="user.name" required class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" id="password" v-model="user.password" required class="form-control">
                    </div>
                    
                    <button type="submit" class="btn btn-primary mt-3 d-flex justify-content-center w-25 mx-auto">Register</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '@/composables/userStore';
  
  const userStore = useUserStore();
  const user = ref({ name: '', email: '' ,password: ''});
  
  const createUser = async () => {
    await userStore.create(user.value.name, user.value.email, user.value.password);
    user.value = { name: '', email: '' ,password: ''};
  };
  
</script>
  

<style scoped>
</style>