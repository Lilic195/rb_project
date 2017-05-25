<template>
    <div class="container">
        <select class="form-control" v-model="predmet" v-on:change="fetchActivities">
            <option value="" disabled selected hidden>Izaberi predmet</option>
            <option v-for="item in predmeti" :value="item.ID">
                {{ item.Naziv }}
            </option>
        </select>
        <h1>{{aktivnosti.Naziv}}</h1>
        <p>Profesor: {{aktivnosti.Ime}} {{aktivnosti.Prezime}}</p>
        <p>Smer: {{aktivnosti.Smer}}</p>
        <p>Semestar: {{aktivnosti.Semestar}}</p>
        <table class="table">
            <thead>
            <tr>
                <th>Naziv</th>
                <th>Broj bodova</th>
                <th>Uslov</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="aktivnost in aktivnosti.Aktivnost">
                <td>{{aktivnost.Naziv}}</td>
                <td>{{aktivnost.Maks_bodova}}</td>
                <td>{{aktivnost.Uslov}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import $ from 'jquery'
    import config from '../config.json';
    export default {
        name: 'Home',
        data () {
            return {
                predmet: "",
                predmeti: [],
                aktivnosti: []
            }
        },
        created () {
            this.fetchSubjects();
        },
        methods: {
            fetchSubjects () {
                $.ajax(
                    {
                        method: 'GET',
                        dataType: 'json',
                        url: config.url + '/predmeti'
                    })
                    .done((data, err) => {
                        this.predmeti = data
                    })
                    .fail((err) => {
                        console.log(err)
                    })
            },
            fetchActivities () {
                $.ajax(
                    {
                        method: 'GET',
                        dataType: 'json',
                        url: config.url + '/predmet/' + this.predmet
                    })
                    .done((data, err) => {
                        console.log(data);
                        this.aktivnosti = data
                    })
                    .fail((err) => {
                        console.err(err)
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
