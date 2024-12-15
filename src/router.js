import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import ContactUs from '@/components/ContactUs.vue';
import SignUp from "@/components/SignUp.vue";
import LogIn from "@/components/LogIn.vue";
import AddPost from "@/components/AddPost.vue";
import PostPage from "@/components/PostPage.vue";

const routes = [
    { path: '/', component: Home , meta: {requiresAuth: true}}, //meta: {requiresAuth: true}
    { path: '/:id', component: PostPage , props: true , meta: {requiresAuth: true}},
    { path: '/contacts', component: ContactUs },
    { path: '/signup', component: SignUp },
    { path: '/login', component: LogIn },
    {path: '/addpost', component: AddPost , meta: {requiresAuth: true}},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    //here mb token validation

    if (to.meta.requiresAuth && !token) {
        console.log("page requires logging in");
        next('/login');
    } else {
        next();
    }
});

export default router;
