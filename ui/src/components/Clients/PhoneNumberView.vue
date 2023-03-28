<template>
    <div>
        {{ number }}
    </div>
</template>
<script>
export default {
    name: "PhoneNumberView",
    props: {
        number: {
            type: String,
        }
    },
    computed: {
    }
}
</script>