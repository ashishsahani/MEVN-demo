<template>
    <div>
        <div v-if="clientProvider">{{ providerString }}</div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';


export default {
    name: "ProvidersView",
    props: {
        clientProvider: Array
    },
    data: () => {
        return {
            providerString: "",
        }
    },
    computed: {
        ...mapGetters(['providers'])
    },
    watch: {
        // whenever question changes, this function will run
        clientProvider(newVal) {
            let x = newVal.map(i => i.id);
            let filtered = this.providers.filter(i => x.includes(i._id));
            this.providerString = filtered.map(i => i.name).join(',');
        }
    },
    created() {
        if (this.providers.length && this.clientProvider.length) {
            let x = this.clientProvider.map(i => i.id);
            let filtered = this.providers.filter(i => x.includes(i._id));
            this.providerString = filtered.map(i => i.name).join(',');
        }
    }
}
</script>