<template lang="haml">
.card-panel
  %div
    %input{"type": 'checkbox', "id": 'checkbox', "v-bind:checked": 'todo.completed', "v-on:click": 'toggleTodo'}
    %strong{"v-on:dblclick": 'editing = true'} {{ todo.title }}
    %button.red.lighten-1.btn.right{"v-on:click": 'deleteTodo'} Delete
  %input{"v-show": 'editing', "v-focus": 'editing', "v-bind:value": 'todo.title', "@keyup.enter": 'doneEdit', "@keyup.esc": 'cancelEdit', "@blur": 'doneEdit'}
</template>

<script lang="ts">
import Vue from "vue";

import { Todo } from '../index';

export default Vue.extend({
		props: ['todo'],

		data() {
				return {
						editing: false,	
				};
		},

		directives: {
			focus (el, { value }) {
						if (value) {
								el.focus();
						}
				},
		},

		methods: {
				toggleTodo() {
					console.log("inside toggletodo");
					this.$store.commit('toggleTodo', { todo: this.todo });
				},
				deleteTodo() {
						this.$store.commit('deleteTodo', { todo: this.todo });
				},
				doneEdit(e: any) {
						const value = e.target.value.trim();
						const { todo } = this;
						
						if (!value) {
								this.deleteTodo()
						} else if (this.editing) {
								this.$store.commit('editTodo', { todo, value });
								this.editing = false;
						}
				},
				cancelEdit(e: any) {
						e.target.value = this.todo.title;
						this.editing = false;
				},
		},

});

</script>

<style>
[type="checkbox"]:not(:checked), [type="checkbox"]:checked {
    position: relative;
    opacity: 100;
    pointer-events: auto;
}
</style>
