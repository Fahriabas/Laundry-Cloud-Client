<script>
import { mapActions } from 'pinia';
import { useLaundryStore } from '../stores/laundry';
    export default{
        name: 'Register',
        data(){
            return{
                email: '',
                password: ''
            }
        },
        created(){

        },
        methods: {
            ...mapActions(useLaundryStore, ['registerHandler'])
        }
    }

</script>

<template>
        <div class="container d-flex flex-column justify-content-center align-items-center"
    style="height: 100vh"
    >
        <h1>Register</h1> 
        <form @submit.prevent="registerHandler(email, password)">

            <!-- Email input -->
            <div class="form-outline mb-4">
              <input type="email" id="form2Example1" class="form-control" name="email" v-model="email" />
              <label class="form-label" for="form2Example1">Email address</label>
            </div>
          
            <!-- Password input -->
            <div class="form-outline mb-4">
              <input type="password" id="form2Example2" class="form-control" name="password" v-model="password"/>
              <label class="form-label" for="form2Example2">Password</label>
            </div>
   
            <!-- Submit button -->
            <button type="submit" class="btn btn-primary btn-block mb-4">Register</button>
          
            <!-- Register buttons -->
            <div class="text-center">
              <p>Already a member? <a><RouterLink to="/login">click here</RouterLink></a></p>

            </div>
          </form>
    </div>
</template>