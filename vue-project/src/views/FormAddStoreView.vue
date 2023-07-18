<script>
import { mapActions, mapState } from 'pinia';
import { useLaundryStore } from '../stores/laundry';
    export default{
        name: 'FormAdd',
        data(){
            return{
                addForm: {
                    name: '',
                    location: '',
                    imageUrl: ''
                }
            }
        },
        created(){

        },
        computed: {

        },
        methods: {
            ...mapActions(useLaundryStore, ['handleCreateStore'])
        }
    }
</script>


<template>
    <div class="container d-flex flex-column justify-content-center ">
        <form @submit.prevent="handleCreateStore(addForm.name, addForm.location, addForm.imageUrl)">
             <div class="mb-3">
                 <label for="exampleInputEmail1" class="form-label ">Name</label>
                <input type="text" class="form-control" v-model="addForm.name" >
                <div id="emailHelp" class="form-text"></div>
            </div>

            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Image Url</label>
                <input type="text" class="form-control" v-model="addForm.imageUrl" >
            </div>

            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Location</label>
                <input type="text" class="form-control" v-model="addForm.location">
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>