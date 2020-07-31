<template>
    <div>
        <h1 v-if="loading">Loading ... </h1>
        <div v-else>
            <div class="row" v-for="row in rows" :key="`row${row}`">
                <div class="col d-flex align-content-stretch" 
                    v-for="(bookable, column) in countRow(row)" :key="`row${row}${column}`">
                    <bookable-list-item :bookable="bookable"></bookable-list-item>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import BookableListItem from "./BookableListItem"

export default {
    components: {
        BookableListItem
    },
    data() {
        return {
            bookables: null,
            columns: 3,
            loading: false
        }
    },
    computed: {
        rows(){
            return this.bookables === null ? 0 : Math.ceil(this.bookables.length / this.columns)
        }
    },
    methods: {
        countRow(row) {
            return this.bookables.slice((row - 1) * this.columns, row * this.columns)
        }
    },
    created(){
        this.loading = true
        axios.get("/api/bookables").then((resp) => {
            this.bookables = resp.data.data
            this.loading = false
        }).catch((err) => console.log(err));
        
    },
}
</script>