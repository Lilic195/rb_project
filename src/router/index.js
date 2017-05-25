import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Students from '@/components/Students';
import AddActivity from '@/components/AddActivity';
import AddPoints from '@/components/AddPoints';
import Delete from '@/components/Delete';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/studenti',
            name: 'Students',
            component: Students
        },
        {
            path: '/dodajaktivnost',
            name: 'AddActivity',
            component: AddActivity
        },
        {
            path: '/dodajbodove',
            name: 'AddPoints',
            component: AddPoints
        },
        {
            path: '/obrisi',
            name: 'Delete',
            component: Delete
        }
    ]
})
