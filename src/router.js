import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import ContactUs from '@/components/ContactUs.vue';
import SignUp from "@/components/SignUp.vue";
import LogIn from "@/components/LogIn.vue";

const routes = [
    { path: '/home', component: Home , meta: {requiresAuth: true}}, //meta: {requiresAuth: true}
    { path: '/contacts', component: ContactUs },
    { path: '/signup', component: SignUp },
    { path: '/login', component: LogIn },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('accessToken');
    //here mb token validation
    console.log("st")

    if (to.meta.requiresAuth && !token) {
        console.log("log")
        next('/login');
    } else {
        next();
    }
});

export default router;
