<template>
	<section class="works bg black-background">
		<div class="works-wrapper wp">
			<button @click="showAddEmployeeForm">Добавить нового сотрудника</button>
			<people-adding :is-showed-adding="isShowedAdding" @onEmployeeAdded="onEmployeeAdded" />
		</div>
	</section>
</template>

<script>
import PeopleAdding from "../components/PeopleAdding.vue"
export default {
	components: {
		PeopleAdding
	},
	data() {
		return {
			isShowedAdding: false,
		}
	},
	props: ['employees'],
	methods: {
		showAddEmployeeForm() {
			this.isShowedAdding = true;
		},
		onEmployeeAdded(newEmployee) {
			this.employees.push(newEmployee);
			// this.isShowedAdding = false;
			// console.log(this.employees);
		},
	}
}
</script>