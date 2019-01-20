import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from '@/views/login.vue';
import Home from '@/views/Home.vue';
import {giftRouter} from "@/routers/gift.route";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/login",
            name: "login",
            component: LoginPage
        },
        {
            path: '',
            component: () => import("@/views/Home.vue"),
            children: [
                {
                    path: "",
                    redirect: "main"
                },
                {
                    path: "main",
                    component: () => import("@/views/main/main.vue")
                },
                {
                    path: 'gift',
                    component: {}
                },
            ]
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        },
    ],
});
