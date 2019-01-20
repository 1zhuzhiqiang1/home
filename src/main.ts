import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {CacheUtils} from "@/utils/cache-utils";

Vue.use(ElementUI);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    console.log(to.path);
    console.log(from.path);
    if (to.path != "/login" && CacheUtils.getToken() == null) {
        console.log("跳转到首页");
        next({path: "/login", replace: true});
    }
    else{
        console.log("继续执行");
        next();
    }
});

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
