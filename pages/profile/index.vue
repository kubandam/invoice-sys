<template>
  <div class="container">
    <div class="row justify-content-end">
      <h1 class="text-center text-white">Profile</h1>
      <div class="col-md-6">
        <form @submit.prevent="save">
          <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" v-model="user.name"/>
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">Phone Number:</label>
            <input type="text" class="form-control" id="phone" v-model="user.phone" />
          </div>
          <button type="submit" class="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '@/composables/userStore';
  definePageMeta({
    middleware: 'auth'
  })

  const userCookie = useCookie<{
              _id: string;
              name: string;
              email: string;
              phone: string;
            }>("user");

  
  const userStore = useUserStore();
  const user = ref({ name: userCookie.value.name ,phone: userCookie.value.phone });

  const save = async () => {
    await userStore.editProfile(userCookie.value._id, user.value.name, user.value.phone);
  };

</script>
  