<template>
  <div class="container pb-5">
    <div class="row justify-content-end">
      <h1 class="text-center text-white">Profile</h1>
      <div class="row m-0 p-0">
        <div class="col-md-6">
          <h3>Main Information</h3>
          <form @submit.prevent="saveUser" class="text-center">
            <v-text-field v-model="user.name" hide-details="auto" label="Name" class="mt-3" required></v-text-field>
            <v-text-field v-model="user.phone" label="Phone Number" class="mt-3"
              :rules="[phoneValidation]"></v-text-field>
            <v-btn color="success" variant="outlined" type="submit" size="large" class="mt-3">
              Save
            </v-btn>
          </form>
        </div>
        <div class="col-6">
          <h3>Company Information</h3>
          <form @submit.prevent="saveCompany" class="text-center">
            <v-text-field v-model="company.ico" label="ICO" class="mt-3" required></v-text-field>
            <v-text-field v-model="company.dic" label="DIC" class="mt-3" required></v-text-field>
            <v-text-field v-model="company.icdph" label="ICDPH (optional)" class="mt-3"></v-text-field>
            <v-text-field v-model="company.address" label="Address" class="mt-3" required></v-text-field>
            <v-text-field v-model="company.zip" label="ZIP" class="mt-3" required></v-text-field>
            <v-text-field v-model="company.town" label="Town" class="mt-3" required></v-text-field>
            <v-text-field v-model="company.country" label="Country" class="mt-3" required></v-text-field>
            <v-btn color="success" variant="outlined" type="submit" size="large" class="mt-3">
              Save
            </v-btn>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
const toast = useToast();

definePageMeta({
  middleware: 'auth'
});

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

interface Company {
  _id?: string;
  user_id: string;
  ico: string;
  dic: string;
  icdph?: string;
  address: string;
  zip: string;
  town: string;
  country: string;
}

const phoneRegex = /^\+\d{12}$/;
const userCookie = useCookie<User>('user');

const userStore = useUserStore();
const companyStore = useCompanyStore();
const user = ref({
  name: userCookie.value?.name ?? '',
  phone: userCookie.value?.phone ?? ''
});
const company = ref<Company>({
  user_id: userCookie.value._id,
  ico: '',
  dic: '',
  icdph: '',
  address: '',
  zip: '',
  town: '',
  country: ''
});

const phoneValidation = (value: string) => {
  return phoneRegex.test(value) || 'Phone number must be in the format +000000000000';
};

const saveUser  = async () => {
  if (!phoneRegex.test(user.value.phone)) {
    toast.add({ title: 'Error', description: 'Invalid phone number format', color: 'red' });
    return;
  }
  if (userCookie.value) {
    try {
      await userStore.editProfile(userCookie.value._id, user.value.name, user.value.phone);
      toast.add({ title: 'Success', description: 'Profile updated successfully', color: 'green' });
    } catch (error) {
      toast.add({ title: 'Error', description: 'Failed to update profile', color: 'red' });
    }
  }
};

const saveCompany = async () => {
  try {
    await companyStore.createOrUpdateCompany(company.value);
  } catch (error) {
  }
};
</script>
