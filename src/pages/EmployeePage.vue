<template>
	<section class="works bg black-background">
		<div v-if="!isEdited" class="works-wrapper wp">
			<p class="employee-page__p">Имя:&nbsp;&nbsp;&nbsp;{{ employee.name }}</p>
			<p class="employee-page__p">Дата рождения:&nbsp;&nbsp;&nbsp;{{ employee.birth_date | formatDate }}</p>
			<p class="employee-page__p">Должность:&nbsp;&nbsp;&nbsp;{{ employee.job_title }}</p>
			<p class="employee-page__p" v-if="employee.sex == 0">Пол:&nbsp;&nbsp;&nbsp;Мужской</p>
			<p class="employee-page__p" v-else="employee.sex == 1">Пол&nbsp;&nbsp;:Женский</p>
			<p class="employee-page__p">Организация:&nbsp;&nbsp;&nbsp;{{ employee.organisation }}</p>
			<img class="employee-page__img" :src="`./img/${employee.img}`">
		</div>
		<PeopleProfile :employee="employee" :isEdited="isEdited" v-else="isEdited" @applyChanges="applyChanges"
			@cancelChanges="cancelChanges"></PeopleProfile>
		<button class="emplPage-button" v-if="!isEdited && !employee.fired" @click="editing">Редактировать</button>
		<button class="emplPage-button" @click="setFired" v-if="!employee.fired && !isEdited">Уволить</button>
		<button class="emplPage-button" @click="unFired" v-if="employee.fired && !isEdited">Восстановить</button>
		<button class="emplPage-button">
			<router-link :to="{ name: 'EmployeeList' }">Вернуться назад</router-link>
		</button>
	</section>
</template>

<script>
import PeopleProfile from '../components/PeopleProfile.vue'
export default {
	name: "EmployeePage",
	props: ['employeeIndex', 'employees'],
	components: {
		PeopleProfile,
	},
	data() {
		return {
			employee: Object,
			isEdited: false,
		}
	},
	created() {
		// console.log(this.employees);
		// console.log(this.employeeIndex);
		this.employee = this.employees[this.employeeIndex]
	},
	methods: {
		editing() {
			this.isEdited = true;
			// console.log(this.employee.birth_date);
			// this.employee.birth_date = (this.formatDate(this.employee.birth_date) != "Invalid Date" ? this.formatDate(this.employee.birth_date) : this.employee.birth_date);
			// console.log(this.employee.birth_date);
		},
		applyChanges(editedEmployee) {
			editedEmployee.birth_date = Math.floor(new Date(editedEmployee.birth_date).getTime() / 1000)
			this.$set(this.employees, this.employeeIndex, editedEmployee)
			this.employee = editedEmployee;
			this.isEdited = false;
			console.log("Employees: ", this.employees, "\nEditedEmployee: ", editedEmployee);
		},
		cancelChanges() {
			this.isEdited = false;
		},
		setFired() {
			this.$set(this.employees[this.employeeIndex], 'fired', true);
			// console.log('EmplPage fired: ', this.employee.fired);
			this.$forceUpdate();
		},
		unFired() {
			this.$set(this.employees[this.employeeIndex], 'fired', false);
			// console.log('EmplPage fired: ', this.employee.fired);
			this.$forceUpdate();
		},
	},
	// beforeRouteEnter(to, from, next) {
	// 	next(vm => {
	// 		vm.$forceUpdate();
	// 	}, { flush: true });
	// }
}
</script>
