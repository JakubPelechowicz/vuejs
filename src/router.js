import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        alias: "/languages",
        name: "languages",
        component: () => import("./components/LanguagesList")
    },
    {
        path: "/languages/:id",
        name: "language details",
        component: () => import("./components/Language")
    },
    {
        path: "/add",
        name: "add",
        component: () => import("./components/AddLanguage")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;


