import Vue from "vue";
import Vuex from "vuex";

import { Todo} from "./index";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        todos: [
            { completed: false, title: 'First todo'},
        ]
    },

    mutations: {
        addTodo(state, { title } ) {
            state.todos.push({
                completed: false,
                title,
            });
        },

        editTodo(state, { todo, value }) {
            todo.title = value;
        },

        toggleTodo(state, { todo }) {
            todo.completed = !todo.completed;
        },

        deleteTodo(state, { todo }) {
            state.todos.splice(state.todos.indexOf(todo), 1);
        },

        toggleAll(state, { completed }) {
            state.todos.forEach((todo) => {
                todo.completed = completed;
            });
        },

        clearCompleted(state) {
            state.todos = state.todos.filter(todo => !todo.completed);
        },
    },

    getters: {
        doneTodosCount(state) {
            return state.todos.filter(todo => todo.completed).length;
        },

        remainingTodosCount(state) {
            return state.todos.filter(todo => !todo.completed).length;
        },

    },

});
