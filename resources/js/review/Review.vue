<template>
    <div>
        <div v-if=loading>
            Loading ...
        </div>
        <div v-else>
            <div v-if="alreadyReviewed">
                <h3>You`ve already left a review for this booking!</h3>
            </div>
            <div v-else>
                <div class="form-group">
                    <label class="text-muted">Select rating (1 is worst - 6 is best) </label>
                    <star-rating class="fa-3x" v-model="review.rating"></star-rating>
                </div>
                <div class="form-group">
                    <label for="content" class="text-muted">Describe your expirience with</label>
                    <textarea name="content" cols="30" rows="10" class="form-control" v-model="review.content"></textarea>
                </div>
                <button class="btn btn-lg btn-lg btn-primary btn-block">Submit</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            review: {
                rating: 5,
                content: null
            },
            existingReview: null,
            loading: false
        }
    },
    methods: {
        onRatingChanged(rating){
            console.log(rating)
        }
    },
    created(){
        this.loading = true
        axios
            .get(`/api/reviews/${this.$route.params.id}`)
            .then(response => (this.existingReview = response.data.data))
            .catch( err => {
                
            })
            .then(() => this.loading = false)
    },
    computed: {
        alreadyReviewed() {
            return this.existingReview !== null
        }
    }
}
</script>