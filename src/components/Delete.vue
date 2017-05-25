<template>
    <div class="container">
        <h3>Obrisi aktivnost</h3>
        <form>
            <select class="form-control" v-model="aktivnost">
                <option value="" disabled selected hidden>Izaberi aktivnost</option>
                <option v-for="item in aktivnosti" :value="item.ID">
                    {{ item.Naziv }}
                </option>
            </select>
            <br/>
            <div class="form-group">
                <input v-on:click="deleteActivity" class="btn btn-submit" type="submit" value="Obrisi aktivnost">
            </div>
        </form>
    </div>
</template>

<script>
    import $ from 'jquery'
    import config from '../config.json';
    export default {
        name: 'Home',
        data () {
            return {
                student: "",
                studenti: [],
                aktivnost: "",
                aktivnosti: []
            }
        },
        created () {
            this.fetchActivities();
        },
        methods: {
            fetchActivities () {
                $.ajax(
                    {
                        method: 'GET',
                        dataType: 'json',
                        url: config.url + '/aktivnosti'
                    })
                    .done((data, err) => {
                        this.aktivnosti = data
                    })
                    .fail((err) => {
                        console.log(err)
                    })
            },
            deleteActivity (e) {
                e.preventDefault();
                $.ajax(
                    {
                        method: 'POST',
                        dataType: 'json',
                        url: config.url + '/delete_aktivnost/' + this.aktivnost,
                        body: {
                            aktivnost_id: this.aktivnost
                        }
                    })
                    .done((data, err) => {
                        console.log(data);
                    })
                    .fail((err) => {
                        console.log(err)
                    })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
