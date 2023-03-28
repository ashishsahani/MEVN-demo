<template>
    <div>
        <div class="modal" id="createClient" tabindex="-1" aria-labelledby="createClientLabel" aria-hidden="true"
            :class="{ showModal: openNewModal }">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="createClientLabel">Create Client</h5>
                        <button type="button" class="btn-close" @click.prevent="closeModal()" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-grid gap-3">

                        <div class="row">
                            <div class="col-md-3">
                                <label for="c-name" class="form-label fw-bold">Name:</label>
                            </div>
                            <div class="col-md-9">
                                <input type="text" class="form-control" id="c-name" v-model="newClient.name"
                                    :required="true">
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <label for="c-email" class="form-label fw-bold">Email </label>
                            </div>
                            <div class="col-md-9">
                                <input type="email" class="form-control" id="c-email" v-model="newClient.email"
                                    :required="true">
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <label for="c-phone-number" class="form-label fw-bold">Phone Number:</label>
                            </div>
                            <div class="col-md-9">
                                <input type="email" class="form-control" id="c-phone-number" v-model="newClient.phoneNumber"
                                    :required="true">
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <label for="c-providers" class="form-label fw-bold">Providers:</label>
                            </div>
                            <div class="col-md-5">
                                <input type="text" class="form-control" id="c-providers" v-model="newProvider">
                            </div>
                            <div class="col-md-4">
                                <button class="btn btn-default" @click.prevent="createNewProvider"> Add Provider</button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <!-- <label for="c-providers" class="form-label">Providers</label> -->
                            </div>
                            <div class="col-md-9">
                                <div class="row" v-for="(item, index) in providers" :key="index">
                                    <div class="col-md-7">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" :value="{ id: item._id }"
                                                :id="item._id" v-model="newClient.providers">
                                            <label class="form-check-label" :for="item._id">
                                                {{ item.name }}
                                            </label>

                                        </div>
                                    </div>
                                    <div class="col-md-1">
                                        <a href="">
                                            <i class="fa fa-edit" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                    <div class="col-md-1">
                                        <a href="">
                                            <i class="fa fa-trash" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click.prevent="closeModal()">Cancel</button>
                        <button type="button" class="btn btn-primary" @click.prevent="createNewClient">Add Client</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name: "ClientCreate",
    data() {
        return {
            newClient: {
                name: "",
                email: "",
                phoneNumber: "",
                providers: []
            },
            newProvider: ""
        }
    },
    methods: {
        createNewProvider() {
            if (this.newProvider.length > 0) {
                this.$store.dispatch("createNewProvider", this.newProvider);
            }
        },
        createNewClient() {
            //console.log(this.newClient);
            this.$store.dispatch("createNewClient", this.newClient);
        },
        closeModal() {
            this.$store.commit("openCloseNewModal", false);
        }
    },
    computed: {
        ...mapGetters(['providers', 'openNewModal'])
    }
}
</script>
<style>
.showModal {
    display: block !important;
}
</style>
