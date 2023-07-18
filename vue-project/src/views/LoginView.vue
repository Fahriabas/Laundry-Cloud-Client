<script>

import { mapActions } from 'pinia';
import { useLaundryStore } from '../stores/laundry';


    export default{
        name: 'Login',
        data(){
            return {
                email: '',
                password: ''
            }
        },
        created(){
            console.log('ini created login');
        },
        methods:{
            ...mapActions(useLaundryStore, ['loginHandler', 'handleGoogle']),
            callback(response){
                this.handleGoogle(response)
            }
        }
    }
</script>

<template>
    <div class="container d-flex flex-column justify-content-center align-items-center"
    style="height: 100vh"
    >

        <h1>Sign In</h1> 
        <form @submit.prevent="loginHandler(email, password)" >
            <!-- Email input -->
            <div class="form-outline mb-4">
              <input type="email" id="form2Example1" class="form-control" name="email" v-model="email"/>
              <label class="form-label" for="form2Example1">Email address</label>
            </div>
          
            <!-- Password input -->
            <div class="form-outline mb-4">
              <input type="password" id="form2Example2" class="form-control" name="password" v-model="password"/>
              <label class="form-label" for="form2Example2">Password</label>
            </div>
          
          
            <!-- Submit button -->
            <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>
          
            <!-- Register buttons -->
            <div class="text-center">
              <p>Not a member? <a><RouterLink to="/register">click here</RouterLink></a></p>
            </div>
            <GoogleLogin :callback="callback"/>
          </form>
    </div>
</template>