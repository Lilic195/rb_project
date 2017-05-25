<template>
    <div id="app">
        <nav class="navbar">
            <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Predispitne aktivnosti</a>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">

                        <li>
                            <router-link to="/">Home</router-link>
                        </li>
                        <li>
                            <router-link to="studenti">Studenti</router-link>
                        </li>
                        <li>
                            <router-link to="dodajaktivnost">Dodaj aktivnost</router-link>
                        </li>
                        <li>
                            <router-link to="dodajbodove">Dodaj bodove</router-link>
                        </li>
                        <li>
                            <router-link to="obrisi">Obrisi</router-link>
                        </li>
                    </ul>
                </div><!-- /.navbar-collapse -->
            </div><!-- /.container-fluid -->
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .router-link-exact-active {
        font-weight: bold;
    }

    .navbar {
        background: #880000;
    }

    .navbar a {
        color: #fff;
    }

    .navbar a:hover{
        background: #fff !important;
    }
    .navbar a.navbar-brand:hover{
        background: none !important;
        color: #fff;
    }
</style>
