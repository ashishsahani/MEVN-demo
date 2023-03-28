import axios from "axios";
import { createStore } from "vuex";
let backendBaseUrl = "";
if (process.env.NODE_ENV === "production") {
  backendBaseUrl = "/api";
} else {
  backendBaseUrl = "http://localhost:3000/api";
}
// Create a new store instance.
const store = createStore({
  state() {
    return {
      editClient: {},
      providers: [],
      isLoading: false,
      clients: [],
      openNewModal: false,
      openEditModal: false,
    };
  },
  getters: {
    openNewModal(state) {
      return state.openNewModal;
    },
    openEditModal(state) {
      return state.openEditModal;
    },
    providers(state) {
      return state.providers;
    },
    editClient(state) {
      return state.editClient;
    },
    clients(state) {
      return state.clients;
    },
    newClient(state) {
      return state.newClient;
    },
  },
  mutations: {
    openCloseNewModal(state, payload) {
      state.openNewModal = payload;
    },
    openCloseEditModal(state, payload) {
      state.openEditModal = payload;
    },
    setEditClient(state, payload) {
      payload["providers"] = payload.providers.map((i) => ({ id: i.id }));
      state.editClient = payload;
    },
    resetEditClient(state) {
      state.editClient = {};
    },
    setProviders(state, payload) {
      state.providers = payload;
    },
    setClients(state, payload) {
      state.clients = payload;
    },
    removeClient(state, payload) {
      state.clients = state.clients.filter((i) => i["_id"] !== payload);
    },
    addProvider(state, payload) {
      state.providers.push(payload);
    },
    addClient(state, payload) {
      state.clients.push(payload);
    },
    updateClient(state, payload) {
      const c = state.clients;
      const indexOfU = c.findIndex((i) => i._id === payload._id);
      console.log(indexOfU);
      c[indexOfU] = payload;
      state.clients = Array.from(c);
    },
  },
  actions: {
    getProviders: ({ commit }) => {
      axios
        .get(`${backendBaseUrl}/providers`)
        .then((response) => {
          commit("setProviders", response.data);
        })
        .catch((errorResponse) => {
          alert(errorResponse.message);
        });
    },
    getClients: ({ commit }) => {
      axios
        .get(`${backendBaseUrl}/clients`)
        .then((response) => {
          commit("setClients", response.data);
        })
        .catch((errorResponse) => {
          alert(errorResponse.message);
        });
    },
    deleteClient: ({ commit }, payload) => {
      axios
        .delete(`${backendBaseUrl}/clients/${payload}`)
        //eslint-disable-next-line
        .then((response) => {
          commit("removeClient", payload);
        })
        .catch((errorResponse) => {
          alert(errorResponse.message);
        });
    },
    createNewProvider: ({ commit }, payload) => {
      axios
        .post(`${backendBaseUrl}/providers`, { name: payload })
        .then((response) => {
          commit("addProvider", response.data);
        })
        .catch((errorResponse) => {
          alert(errorResponse.message);
        });
    },
    createNewClient: ({ commit }, payload) => {
      //console.log(payload);
      axios
        .post(`${backendBaseUrl}/clients`, payload)
        .then((response) => {
          commit("addClient", response.data);
          commit("openCloseNewModal", false);
        })
        .catch((errorResponse) => {
          if (errorResponse.response.data) {
            console.log(errorResponse.response.data);
          }
          alert(errorResponse.message);
        });
    },
    editClient: ({ commit }, payload) => {
      //console.log(payload);
      const { _id, ...updatedBody } = payload;
      axios
        .patch(`${backendBaseUrl}/clients/${_id}`, updatedBody)
        .then((response) => {
          commit("updateClient", response.data);
          commit("openCloseEditModal", false);
        })
        .catch((errorResponse) => {
          if (errorResponse.response.data) {
            console.log(errorResponse.response.data);
          }
          alert(errorResponse.message);
        });
    },
  },
});

export default store;
