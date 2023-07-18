import axios from 'axios'
import { defineStore } from 'pinia'

const BASE_URL = 'http://localhost:3000'

export const useLaundryStore =defineStore('laundry', {
    state: () => ({
        stores: [],
        productServices: [],
        detailStore: [],
        editedStore: [],
        userLogin: {},
        myStore: []
    }),
    actions: {

        buttonLogout(){
            localStorage.clear()
            console.log('button logout dipencet<<<<');
            this.router.push('/')
        },

        buttonView(id){
            this.router.push(`/product/${id}`)
        },

        buttonEdit(id){
            this.router.push(`/edit/${id}`)
            this.fetchDetailStore(id)
        },

        buttoneDelete(id){
            console.log('button delete dipencet nih<<<<<<<');
            this.handleDeleteStore(id)
        },

        buttonProduct(idProduct, idStore){
            this.handleCreateTransaction(idProduct, idStore)
        },


        async loginHandler(email, password){
            try {
                // console.log(email, password);
                const { data } = await axios({
                    url: `${BASE_URL}/login`,
                    method: 'POST',
                    data: {
                        email: email,
                        password: password
                    }
                })
                const { access_token } = data
                this.userLogin = data.data
                localStorage.setItem("access_token", access_token)
                this.router.push('/')
                console.log(this.userLogin, 'isi dari userlogin<<<<');
            } catch (error) {
                console.log(error);
            }
        },

        async registerHandler(email, password){
            try {

                const { data } = await axios({
                    url: `${BASE_URL}/register`,
                    method: 'POST',
                    data: {
                        email: email,
                        password: password
                    }
                })
                console.log(data);
                this.router.push('/login')
            } catch (error) {
                console.log(error);
            }
        },

        async fetchStore(){
            try {
                console.log('data ter fetch');
                const access_token = localStorage.getItem("access_token")
                // console.log(access_token, 'access_token didalam fetchstore');
                const { data } = await axios({
                    url: `${BASE_URL}/stores`,
                    method: 'GET',
                    headers: {
                        access_token: access_token
                    }
                })
                // console.log(data, 'isi dari data');
                this.stores = data.data
                console.log(this.stores, 'isi dari this.stores<<<<<<<<>>>>>>>');
                // console.log(data, 'isi dari data<<<<<>>>>>>>');
            } catch (error) {
                console.log(error);
            }
        },

        async fetchProduct(id){
            try {
                const access_token = localStorage.getItem("access_token")
                const { data } = await axios({
                    url: `${BASE_URL}/productService/${id}`,
                    method: 'GET',
                    headers: {
                        access_token: access_token
                    }
                })

                this.productServices = data.data.listProduct
                this.detailStore = data.data.store
            } catch (error) {
                console.log(error);
            }
        },

        async fetchDetailStore(id){
            try {
                const access_token = localStorage.getItem("access_token")
                console.log('data detail satu ke fetch');
                const { data } = await axios({
                    url: `${BASE_URL}/stores/${id}`,
                    method: "GET",
                    headers: {
                        access_token: access_token
                    }
                })

                this.editedStore = data.data

                console.log(this.editedStore, 'hasil dari this.editedStore');
            } catch (error) {
                
            }
        },

        async handleSubmitEdit(name, location, imageUrl){
            try {
                const access_token = localStorage.getItem("access_token")
                console.log(name, location, imageUrl, 'isi dari data didalam handle edit form');
                const { data } = await axios({
                    url: `${BASE_URL}/stores/${this.editedStore.id}`,
                    method: 'PUT',
                    data: {
                        name: name,
                        location: location,
                        imageUrl: imageUrl
                    },
                    headers: {
                        access_token: access_token
                    }
                })

                this.router.push('/')
                console.log(data, 'isi dari data keluaran edit PUT');
            } catch (error) {
                
            }
        },


        async handleDeleteStore(id){
            try {
                console.log('handle delete dipanggil nih <<<<<<<<<');
                const access_token = localStorage.getItem("access_token")

                const { data } = await axios({
                    url: `${BASE_URL}/delete/stores/${id}`,
                    method: 'DELETE',
                    headers: {
                        access_token: access_token
                    }
                })
                console.log(data, 'hasil dari handle delete');
                this.fetchMyStores()

            } catch (error) {
                console.log(error);
            }
        },

        async handleCreateStore(name, location, imageUrl){
            try {
                console.log(name, location, imageUrl, 'isi dari name location imageUrl');
                // console.log('masuk kedalam handlecreateStore');
                const { data } = await axios({
                    url: `${BASE_URL}/stores/create`,
                    method: 'POST',
                    data: {
                        name: name,
                        location: location,
                        imageUrl: imageUrl
                    },
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
                this.router.push('/')
            } catch (error) {
                console.log(error);
            }
        },

        async handleCreateTransaction(idProduct, idStore){
            try {
                console.log(idProduct, idStore, 'isi dari 2 parameter<<<<');
                const access_token = localStorage.getItem("access_token")
                console.log('membuat sebuah transaksi');
                const { data } = await axios({
                    url: `${BASE_URL}/transactions/${idProduct}`,
                    method: 'POST',
                    headers: {
                        access_token: access_token
                    }
                })
                console.log(data, 'keluaran dari back end');
                this.payment(idProduct)
            } catch (error) {
                console.log(error);
            }
        },

        async payment(idProduct){
            try {
                // const { access_token } = localStorage.getItem("access_token")
                console.log(localStorage.access_token, '<<<<<<<<');


                const { data } = await axios({
                    url: `${BASE_URL}/generate-midtrans-token/${idProduct}`,
                    method: "POST",
                    headers: {
                        access_token: localStorage.access_token
                    }
                })

                console.log(data, 'isi dari data<<<<<<');

                window.snap.pay(`${data.data.token}`, {
                    onSuccess: function(result){
                      /* You may add your own implementation here */
                      alert("payment success!"); console.log(result);
                    },
                    onPending: function(result){
                      /* You may add your own implementation here */
                      alert("wating your payment!"); console.log(result);
                    },
                    onError: function(result){
                      /* You may add your own implementation here */
                      alert("payment failed!"); console.log(result);
                    },
                    onClose: function(){
                      /* You may add your own implementation here */
                      alert('you closed the popup without finishing the payment');
                    }
                  });
            } catch (error) {
                console.log(error);
            }
        },


        async fetchMyStores(){
            try {
                const { data } = await axios({
                    url: `${BASE_URL}/mystores`,
                    method: 'GET',
                    headers: {
                        access_token: localStorage.access_token
                    }
                })

                this.myStore = data.data
            } catch (error) {
                console.log(error);
            }
        },

        async handleGoogle(response){
            try {
                // console.log(response);
                const { data } = await axios({
                    url: `${BASE_URL}/googleLogin`,
                    method: 'POST',
                    headers: {
                        google_token: response.credential
                    }
                })

                const { access_token } = data
                this.router.push('/')
            } catch (error) {
                
            }
        }



    }
})