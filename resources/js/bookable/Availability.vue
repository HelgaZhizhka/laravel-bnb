<template>
    <div>
        <h6 class="text-uppercase text-secondary font-weight-bolder">
            Check Avaibility
            <span v-if="noAvailability" class="text-danger">NOT AVAILABLE</span>
            <span v-if="hasAvailability" class="text-success">AVAILABLE</span>
            </h6>
        <div class="form-row mb-2">
            <div class="form-group col-md-6">
                <label for="from">From</label>
                <input 
                type="text" 
                name="from" 
                class="form-control form-control-sm" 
                placeholder="Start date" 
                v-model="from"
                @keyup.enter="check" 
                :class="[{'is-invalid': errorFor('from')}]">
            </div>
            <div class="form-group col-md-6">
                <label for="to">To</label>
                <input 
                type="text" 
                name="to" 
                class="form-control form-control-sm" 
                placeholder="End date" 
                v-model="to"
                @keyup.enter="check" 
                :class="[{'is-invalid': errorFor('to')}]">
            </div>
        </div>
        <button class="btn btn-secondary btn-block" @click="check" :disabled="loading">
            <span v-if="!loading">Check!</span>
            <span v-if="loading">
                <i class="fas fa-circle-notch fa-spin"></i> Checking...
            </span>
        </button>
    </div>
</template>
<script>
export default {
    props: ['bookableId'],
    data() {
        return {
            from: null,
            to: null,
            loading: false,
            status: null,
            errors: null
        }
    },
    methods: {
        check() {
            this.loading = true
            this.errors = null
            axios.get(`/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`)
            .then( resp => this.status = resp.status)
            .catch(err => {
                if (422 === err.response.status) {
                    this.errors = err.response.data.errors
                }
                this.status = err.response.status
            })
            .then(() => this.loading = false);
        },
        errorFor(field) {
            this.hasErrors && this.errors[field] ? this.errors[field] : null
        }
    },
    computed: {
        hasErrors() {
            return 422 === this.status && this.errors !== null
        },
        hasAvailability() {
            return 200 === this.status
        },
        noAvailability() {
            return 404 === this.status
        }
    }
}
</script>
<style scoped>
    label {
        font-size: .7rem;
        text-transform: uppercase;
        color: grey;
        font-weight: bolder;
    }
</style>