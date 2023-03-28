<template>
    <div class="container">
        <div class="row header-box">
            <div class="col-md-10 title-name-box">
                <p class="title-name"> Clients</p>
            </div>
            <div class="col-md-2 new-client-box">
                <button class=" btn btn-light" @click.prevent="openCloseCreateClientModal()"> New Client</button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <table class="table table-bordered table-responsive">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Providers</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="clients.length">
                        <tr v-for="(item, i) in clients" :key="i">
                            <td>{{ item.name }}</td>
                            <td>{{ item.email }}</td>
                            <td>
                                {{ this.displayPhoneNumber(item.phoneNumber) }}
                            </td>
                            <td>
                                <ProvidersView :clientProvider="item.providers" v-if="providers.length" />
                            </td>
                            <td>
                                <button class="btn btn-default" @click.prevent="openEdit(item)">Edit</button>

                                <button class="btn" @click.prevent="deleteClient(item._id)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div>
            <ClientCreate />
            <ClientEdit />
        </div>
    </div>
</template>
<script>
import ProvidersView from './ProvidersView.vue'
import ClientCreate from './ClientCreate.vue'
import ClientEdit from './ClientEdit.vue'
import { mapGetters } from 'vuex'
export default {
    name: 'ClientsVue',
    data: () => {
        return {
            editClient: {},
            openEditForm: false,
            openCreateClientModal: true
        }
    },
    computed: {
        ...mapGetters(['clients', 'providers']),
    },

    components: {
        ProvidersView,
        ClientCreate,
        ClientEdit
    },
    methods: {
        openCloseCreateClientModal() {
            this.$store.commit("openCloseNewModal", true);
        },
        displayPhoneNumber(val) {
            if (val.length) {
                return `${val.slice(0, 3)}-${val.slice(3, 6)}-${val.slice(6)}`
            }
            return "nil";
        },
        openEdit(value) {
            this.$store.commit('setEditClient', value);
            this.$store.commit("openCloseEditModal", true);
        },
        deleteClient(id) {
            this.$store.dispatch("deleteClient", id);
        }
    },
    created() {

        this.$store.dispatch("getClients");
        this.$store.dispatch("getProviders");
    }

}
</script>
<style>
.header-box {
    background-color: lightblue;
    margin-left: 1px !important;
    margin-right: 1px !important;
    margin-top: 5px !important;
    border-radius: 3px !important;
}

.title-name {
    font-size: 30px;
    margin-top: 15px;
}

.title-name-box {
    text-align: left;
    color: blue
}

.new-client-box {
    margin-top: 15px !important;
}
</style>