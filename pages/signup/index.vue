<template>
    <div class="container">
        <h1 class="text-center text-white">Signup Page</h1>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <form @submit.prevent="createUser">
                    <v-text-field hide-details="auto" label="Email" v-model="user.email"></v-text-field>
                    <v-text-field hide-details="auto" label="Name" class="mt-5" v-model="user.name"></v-text-field>
                    <v-text-field hide-details="auto" label="Password" class="mt-5" v-model="user.password"></v-text-field>
                    <v-btn type="submit" prepend-icon="$vuetify" class="mt-5">
                        Register
                    </v-btn>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/composables/userStore';

const userStore = useUserStore();
const user = ref({ name: '', email: '', password: '' });

const createUser = async () => {
    await userStore.create(user.value.name, user.value.email, user.value.password);
    user.value = { name: '', email: '', password: '' };
};

</script>


<style scoped></style>