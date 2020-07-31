<template>
    <div class="card w-100">
        <div class="card-body">
            <router-link :to="{name: 'bookable', params: {id:  bookable.id}}">
                <h4 class="card-title">{{ bookable.title }}</h4>
            </router-link>
            <p class="card-text">{{ bookable.description }}</p>
        </div>
    </div>
</template>
<script>
export default {
    props: { 'bookable': Object }
}
</script>
<style>
    .card {
        margin-bottom: 10px;
    }
</style>