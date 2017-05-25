<template>
    <div class="container">
        <select class="form-control" v-model="student" v-on:change="fetchStudentSubjects">
            <option value="" disabled selected hidden>Izaberi studenta</option>
            <option v-for="item in studenti" :value="item.ID">
                {{ item.Ime }} {{item.Prezime}} {{item.Broj_indeksa}}
            </option>
        </select>
        <select class="form-control" v-model="predmet" v-on:change="fetchActivities">
            <option value="" disabled selected hidden>Izaberi predmet</option>
            <option v-for="item in predmeti" :value="item.ID">
                {{ item.Naziv }}
            </option>
        </select>

        <h3>Ukupno </h3>
        <table class="table">
            <thead>
                <tr>
                    <th>Osvojeni bodovi</th>
                    <th>Ocena</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{aktivnosti.Osvojeni_bodovi}}</td>
                    <td>{{aktivnosti.Ocena}}</td>
                </tr>
            </tbody>
        </table>
        <hr>
        <h3>Aktivnosti</h3>
        <table class="table">
            <thead>
            <tr>
                <th>Naziv</th>
                <th>Broj bodova</th>
                <th>Maksimalno bodova</th>
                <th>Uslov</th>
                <th>Polozio</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="aktivnost in aktivnosti.Aktivnosti">
                <td>{{aktivnost.Naziv}}</td>
                <td>{{aktivnost.Osvojeni_bodovi}}</td>
                <td>{{aktivnost.Maks_bodova}}</td>
                <td>{{aktivnost.Uslov}}</td>
                <td>{{aktivnost.Polozio ? "DA" : "NE"}}</td>
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
                student: "",
                predmet: "",
                studenti: [],
                predmeti: [],
                aktivnosti: []
            }
        },
        created () {
            this.fetchStudent();
        },
        methods: {
            fetchStudent () {
                $.ajax(
                    {
                        method: 'GET',
                        dataType: 'json',
                        url: config.url + '/studenti'
                    })
                    .done((data, err) => {
                        this.studenti = data
                    })
                    .fail((err) => {
                        console.err(err)
                    })
            },
            fetchStudentSubjects () {
                $.ajax(
                    {
                        method: 'GET',
                        dataType: 'json',
                        url: config.url + '/student/' + this.student
                    })
                    .done((data, err) => {
                        this.predmeti = data.Predmeti
                    })
                    .fail((err) => {
                        console.log(err)
                    })
            },
            fetchActivities (e) {
                $.ajax(
                    {
                        method: 'GET',
                        dataType: 'json',
                        url: config.url + '/student_aktivnost/',
                        data: {
                            predmet_id: this.predmet,
                            student_id: this.student
                        }
                    })
                    .done((data, err) => {
                        console.log(data);
                        this.aktivnosti = data
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

    select:first-child{
        margin-bottom: 10px;
    }
</style>
