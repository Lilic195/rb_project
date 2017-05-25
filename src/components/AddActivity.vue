<template>
    <div class="container">
        <h3>Dodaj aktivnost</h3>
        <form id="aktivnost">
            <select class="form-control" v-model="predmet" required>
                <option value="" disabled selected hidden>Izaberi predmet</option>
                <option v-for="item in predmeti" :value="item.ID">
                    {{ item.Naziv }}
                </option>
            </select>
            <br/>
            <div class="form-group">
                <input type="text" v-model="naziv" class="form-control" name="naziv" placeholder="Naziv aktivnosti" required>
            </div>
            <div class="form-group">
                <input type="number" v-model="bodovi" class="form-control" name="bodovi" placeholder="Bodovi" required>
            </div>
            <div class="form-group">
                <input type="number" v-model="uslov" class="form-control" name="uslov" placeholder="Uslov" required>
            </div>
            <p id="message"></p>
            <div class="form-group">
                <input v-on:click="addActivity" class="btn btn-submit" type="submit" value="Dodaj aktivnost">
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
                naziv: "",
                bodovi: null,
                uslov: null
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
            addActivity (e) {
                e.preventDefault();
                $.ajax(
                    {
                        method: 'POST',
                        dataType: 'json',
                        url: config.url + '/aktivnost',
                        data: {
                            predmet_id: this.predmet,
                            naziv: this.naziv,
                            bodovi: this.bodovi,
                            uslov: this.uslov
                        }
                    })
                    .done((data, err) => {
                        console.log(data);
                        document.getElementById("message").innerHTML = "Uspesno dodato!";
                        document.getElementById("aktivnost").reset();
                    })
                    .fail((err) => {
                        document.getElementById("message").innerHTML = "Greska prilikom dodavanja!";
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
