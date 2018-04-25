import Vue from "vue";
import TodoApp from "./components/TodoApp.vue";
import store from "./store";

export interface Todo {
    title: string;
    completed: boolean;
}

const app = new Vue({
    el: '#app',
    store,
    components: {
        TodoApp
    }
});


