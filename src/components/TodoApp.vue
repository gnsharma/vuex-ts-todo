<template lang="haml">
%section.container
  %header.row
    .col.s12
      %h1 Todos
      %input{"v-on:keyup.enter": 'addTodo', "placeholder": "Add todo", "autofocus": ""}

  %section.row{"v-show": 'todos.length'}
    .row.card-panel
      .col.s3
        %input{"type": 'checkbox', "v-bind:checked": 'allChecked', "v-on:change": 'toggleAllTodos'}
        %strong Toggle All
      .col.s3{"v-for": '(val, key) in filters'}
        %span
          %a.btn.blue{"v-bind:href": '"#/" + key', "v-on:click": 'visibility = key', "v-bind:class": '[ key === visibility ? "green" : "" ]'} {{ key.toUpperCase() }}
    .row.card-panel
      .col.s4
        %span
          %strong {{ remainingCount}} {{remainingCount | pluralize('todo')}} left 
      .col.s4
        %span
          %strong {{doneCount }} {{doneCount | pluralize('todo')}} done 
      .col.s4
        %button.btn.h6.right.red{"v-show": 'todos.length ', "v-on:click": 'clearCompleted'} Clearcompleted
      
  %section.row{"v-show": 'todos.length'}
    %todo-item{"v-for": '(todo, index) in filteredTodos', "v-bind:key": 'index', "v-bind:todo": 'todo'}
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from 'vuex';
import { mapMutations} from 'vuex';

import { Todo } from '../index';
import TodoItem from './TodoItem.vue';

const filters: { [index:string]: any} = {
		all: (todos: Todo[]): Todo[] => todos,
		active: (todos: Todo[]): Todo[] => todos.filter(todo => !todo.completed),
		completed: (todos: Todo[]): Todo[] => todos.filter(todo => todo.completed),
}

export default Vue.extend({
		components: {
				TodoItem,
		},

		data() {
			return {
					visibility: 'all',
					filters: filters,
			};
		},

		computed: {
				todos (): Todo[] {
						return this.$store.state.todos;
				},
				allChecked (): boolean {
					return this.todos.every(todo => todo.completed);
				},
				filteredTodos (): Todo[] {
						return filters[this.visibility](this.todos);
				},
				...mapGetters({
						doneCount: 'doneTodosCount',
						remainingCount: 'remainingTodosCount',
				}),
		},

		methods: {
				addTodo(e: any) {
						const title = e.target.value.trim();
						if (!title) {
								return;
						}
						this.$store.commit('addTodo', {title})
						e.target.value = '';
				},
				...mapMutations([
						'clearCompleted',
				]),
				toggleAllTodos() {
						this.$store.commit('toggleAll', { completed: !this.allChecked});
				},
		},

		filters: {
				pluralize(count: number, value: string): string {
					  if (count === 1) {
								return value;
						} else {
							  return value + 's';
						}
				},
		},

});

</script>

<style>
.container {
	width: 90%;
}
@media screen and (min-width: 601px) {
  .container {
    width: 75%;
	}
}
@media screen and (min-width: 993px) {
  .container {
    width: 50%;
	}
}

</style>
