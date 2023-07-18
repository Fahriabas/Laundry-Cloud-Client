<script>
import { mapActions, mapState } from 'pinia';
import { useLaundryStore } from '../stores/laundry';
    export default{
        name: 'FormEditStore',
        data(){
            return{
                editForm:{
                    name: '',
                    location: '',
                    imageUrl: ''
                }
            }
        },
        async created(){
            await this.fetchDetailStore(this.$route.params.idStore)
            this.editForm.name = this.editedStore.name
            this.editForm.location = this.editedStore.location
            this.editForm.imageUrl = this.editedStore.imageUrl
        },
        computed: {
            ...mapState(useLaundryStore, ['editedStore'])
        },
        methods: {
            ...mapActions(useLaundryStore, ['fetchDetailStore', 'handleSubmitEdit'])
        }
    }
</script>

<template>
    <div class="container d-flex flex-column justify-content-center ">
        <form @submit.prevent="handleSubmitEdit(editForm.name, editForm.location, editForm.imageUrl)">
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label ">Name</label>
    <input type="text" class="form-control" v-model="editForm.name" >
    <div id="emailHelp" class="form-text"></div>
  </div>

  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Image Url</label>
    <input type="text" class="form-control" v-model="editForm.imageUrl" >
  </div>

  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Location</label>
    <input type="text" class="form-control" v-model="editForm.location">
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>


    </div>
 
</template>