<template>
    <div class="container">
        <h3>Dodaj bodove</h3>
        <form id="bodovi">
            <select class="form-control" v-model="predmet" v-on:change="fetchActivities" required>
                <option value="" disabled selected hidden>Izaberi predmet</option>
                <option v-for="item in predmeti" :value="item.ID">
                    {{ item.Naziv }}
                </option>
            </select>
            <br/>
            <select class="form-control" v-model="aktivnost" required>
                <option value="" disabled selected hidden>Izaberi aktivnost</option>
                <option v-for="item in aktivnosti.Aktivnost" :value="item">
                    {{ item.Naziv }}
                </option>
            </select>
            <br/>
            <select class="form-control" v-model="student" required>
                <option value="" disabled selected hidden>Izaberi studenta</option>
                <option v-for="item in studenti" :value="item.ID">
                    {{ item.Ime }} {{item.Prezime}} {{item.Broj_indeksa}}
                </option>
            </select>
            <br/>
            <div class="form-group">
                <input type="number" v-model="bodovi" class="form-control" name="bodovi" placeholder="Bodovi" required>
            </div>
            <p id="message"></p>
            <div class="form-group">
                <input v-on:click="addPoints" class="btn btn-submit" type="submit" value="Dodaj aktivnost">
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
                predmet: "",
                predmeti: [],
                aktivnosti: [],
                aktivnost: "",
                student: "",
                studenti: [],
                naziv: "",
                bodovi: null,
                uslov: null
            }
        },
        created () {
            this.fetchSubjects();
        },
        methods: {
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
                    });
                $.ajax(
                    {
                        method: 'GET',
                        dataType: 'json',
                        url: config.url + '/predmet_student/' + this.predmet
                    })
                    .done((data, err) => {
                        this.studenti = data
                    })
                    .fail((err) => {
                        console.log(err)
                    })
            },
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
            addPoints (e) {
                e.preventDefault();
                console.log(this.bodovi, this.aktivnost.uslov);
                $.ajax(
                    {
                        method: 'POST',
                        dataType: 'json',
                        url: config.url + '/student_aktivnost',
                        data: {
                            aktivnost_id: this.aktivnost.ID ,
                            student_id: this.student,
                            bodovi: this.bodovi,
                            polozio:  1*this.bodovi >= 1*this.aktivnost.Uslov
                        }
                    })
                    .done((data, err) => {
                        console.log(data);
                        document.getElementById("bodovi").reset();
                        document.getElementById("message").innerHTML = "Uspesno dodato!";
                    })
                    .fail((err) => {
                        console.log(err)
                        document.getElementById("message").innerHTML = "Greska prilikom dodavanja";
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
