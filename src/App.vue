<template>
	<div class="main-wrapper">
		<Sidebar></Sidebar>
		<div class="content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import { animateScroll } from './js/gsap.js'

export default {
	components: {
		Sidebar,
	},
	methods: {
		incrementIndex: function (index) {
			return index++;
		},
		getGender: function (sex) {
			return (sex === 0 ? 'мужской' : 'женский');
		},
		date: function (_date) {
			const date = new Date(_date * 1000);
			const day = ('0' + date.getDate()).slice(-2);
			const month = ('0' + (date.getMonth() + 1)).slice(-2);
			const year = date.getFullYear();
			return `${day}.${month}.${year}`;
		},
	},
	mounted: function () {
		animateScroll();
	},
};
</script>






<!-- <template>
	<div class="content">
		<section class="works bg black-background">
			<div class="works-wrapper wp">
				<button @click="showAddEmployeeForm">Добавить нового сотрудника</button>
				<people-adding :is-showed-adding="isShowedAdding" @onEmployeeAdded="onEmployeeAdded" />
				<button @click="showFilterEmployeeForm">Фильтр сотрудников</button>
				<people-filter :is-showed-filter="isShowedFilter" @onEmployeeFiltered="onEmployeeFiltered" />
				<div class="works__container">
					<div class="works__left">
						<People v-for="(employee, index) in employees" :key="employee.name" :people="employee" :index="index"
							:is-left="true" />
					</div>
					<div class="works__right">
						<People v-for="(employee, index) in employees" :key="employee.name" :people="employee" :index="index"
							:is-left="false" />
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import People from './components/People.vue'
import PeopleAdding from './components/PeopleAdding.vue'
import PeopleFilter from './components/PeopleFilter.vue'
import { employees } from './js/employees.js'

export default {
	name: 'App',
	components: {
		People,
		PeopleAdding,
		PeopleFilter,
	},
	data() {
		return {
			isShowedAdding: false,
			isShowedFilter: false,
			filteredEmployees: [],
		}
	},
	computed: {
		employees: function () {
			return employees;
		},
		// get: function () {
		// 	return this.filteredEmployees;
		// },
	},
	methods: {
		showAddEmployeeForm() {
			this.isShowedAdding = true;
		},
		showFilterEmployeeForm() {
			this.isShowedFilter = true;
		},
		onEmployeeAdded(newEmployee) {
			this.employees.push(newEmployee);
			// this.isShowedAdding = false;
			// console.log(this.employees);
		},
		onEmployeeFiltered(filter) {			
			const { name, birth_date, sex, organisation, job_title, fired} = filter;
			// console.log("name: ", name, "sex: ", sex, "birth_date: ", birth_date, "organisation: ", organisation, "job_title: ", job_title, "fired: ", fired);
			this.filteredEmployees = this.employees.filter(employee => {

				let matches = true;
				if (name && !employee.name.toLowerCase().includes(name.toLowerCase())) { 
      		matches = false;
      	}
				if (sex.length > 0 && !sex.includes(employee.sex.toString())) { 
					matches = false;
				}
				if (organisation && !employee.organisation.toLowerCase().includes(organisation.toLowerCase())) { 
					matches = false;
				}
				if (birth_date && !employee.birth_date) { 
					matches = false;
				}
				if (job_title && ! employee.job_title.toLowerCase().includes(job_title.toLowerCase())) { 
					matches = false; 
				}
				if (fired && !employee.fired) { 
					matches = false; 
				}
      	return matches; 
			})
			this.employees = this.filteredEmployees;
			console.log(this.filteredEmployees);
		},
	},
}
</script>
<style></style> -->