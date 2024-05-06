<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-6 mt-5">
          <form @submit.prevent="createUser">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" class="form-control" id="name" v-model="user.name" placeholder="Enter name">
            </div>
            <div class="form-group mt-3">
              <label for="email">Email address</label>
              <input type="email" class="form-control" id="email" v-model="user.email" placeholder="Enter email">
            </div>
            <button type="submit" class="btn btn-primary mt-3">Submit</button>
          </form>
        </div>
      </div>
      <div class="row justify-content-center mt-3">
        <div class="col-6">
          <div v-for="user in users" :key="user._id" class="d-flex align-items-center justify-content-between mb-2">
            <p>
              <strong>ID:</strong> {{ user._id }}<br>
              <strong>Name:</strong> {{ user.name }}<br>
              <strong>Email:</strong> {{ user.email }}
            </p>
            <button class="btn btn-danger" @click="removeUser(user._id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '@/composables/userStore';
  
  const userStore = useUserStore();
  const users = ref([]);
  const user = ref({ name: '', email: '' });
  
  const createUser = async () => {
    await userStore.create(user.value.name, user.value.email);
    users.value = await userStore.getAll();
    user.value = { name: '', email: '' };
  };
  
  const getUsers = async () => {
    users.value = await userStore.getAll();
  };
  
  const removeUser = async (_id) => {
    await userStore.remove(_id);
    users.value = await userStore.getAll();
  };
  
  onMounted(getUsers);
  </script>
  