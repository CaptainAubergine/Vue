<template>
	<section class="works bg black-background">
		<div class="works-wrapper wp">
			<button @click="showFilterEmployeeForm">Фильтр сотрудников</button>
			<people-filter @createFilter="createFilter" :is-showed-filter="isShowedFilter" :titles="titles"
				:countEmployees="employees.length"
				:countFindedEmployees="filteredEmployees != null ? filteredEmployees.length : 0">
			</people-filter>
			<div class=" works__container">
				<div class="works__left">
					<People v-for="(employee, index) in (filteredEmployees != null ? filteredEmployees : employees)"
						:key="employee.name" :people="employee" :index="index" :is-left="true" :filter-fired="fired"
						@setFired="setFired" @clearFilter="clearFilter">
					</People>
				</div>
				<div class="works__right">
					<People v-for="(employee, index) in (filteredEmployees != null ? filteredEmployees : employees)"
						:key="employee.name" :people="employee" :index="index" :is-left="false" :filter-fired="fired"
						@setFired="setFired" @clearFilter="clearFilter">
					</People>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import People from '../components/People.vue'
import PeopleFilter from '../components/PeopleFilter.vue'
export default {
	name: "EmployeeList",
	components: {
		People,
		PeopleFilter,
	},
	data() {
		return {
			titles: this.genTitles(),
			filteredEmployees: null,
			isShowedFilter: false,
		}
	},
	props: ['employees', 'fired'],
	methods: {
		showFilterEmployeeForm() {
			this.isShowedFilter = true;
		},
		genTitles() {
			const uniqueTitles = Array.from(this.employees.reduce((acc, employee) => {
				acc.add(employee.job_title);
				return acc;
			},
				new Set()));
			return uniqueTitles
		},
		createFilter(filter) {
			this.filteredEmployees = this.employees.filter(employee => {
				let matches = (
					(filter.name != null ? employee.name.toLowerCase().includes(filter.name.toLowerCase()) : true) &&
					(filter.birth_date != null ? (this.filterDate(employee.birth_date)).toString().includes(filter.birth_date) : true) &&
					(filter.sex != null ? employee.sex == filter.sex : true) &&
					(filter.organisation != null ? employee.organisation.toLowerCase().includes(filter.organisation) : true) &&
					(filter.job_title != null ? employee.job_title.toLowerCase().includes(filter.job_title.toLowerCase()) : true) &&
					(filter.fired != null ? employee.fired == filter.fired : true)
				);
				return matches
			});
			if (this.filteredEmployees.length == 0) {
				this.filteredEmployees = null;
			}
		},
		filterDate(_date) {
			const date = new Date(_date * 1000)
			console.log(date.toLocaleDateString('ru-RU'));
			return (date.toLocaleDateString('ru-RU') != "Invalid Date" ? date.toLocaleDateString('ru-RU') : new Date(_date).toLocaleDateString('ru-RU'))
		},
		clearFilter() {
			this.filteredEmployees = null;
		},
		setFired(index) {
			this.$set(this.employees[index], 'fired', true);
			console.log('EmployeeList fired: ', this.employees[index].fired);
			this.$forceUpdate();
		},
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$forceUpdate();
		}, { flush: true });
	}
}
</script>



<!-- <script>
import People from '../components/People.vue'
import PeopleFilter from '../components/PeopleFilter.vue'
export default {
	name: "EmployeeList",
	components: {
		People,
		PeopleFilter,
	},
	data() {
		return {
			titles: this.genTitles(),
			filteredEmployees: null
		}
	},
	props: ['employees', 'fired'],
	methods: {
		createQuery(newQuery) {
			this.filteredEmployees = this.employees.filter(employee => {
				let compare = (
					(newQuery.name != null ? employee.name.toLowerCase().includes(newQuery.name.toLowerCase()) : true) &&
					(newQuery.birth_date != null ? (this.filterDate(employee.birth_date)).toString().includes(newQuery.birth_date) : true) &&
					(newQuery.sex != null ? employee.sex == newQuery.sex : true) &&
					(newQuery.organisation != null ? employee.organisation.toLowerCase().includes(newQuery.organisation) : true) &&
					(newQuery.job_title != null ? employee.job_title.toLowerCase().includes(newQuery.job_title.toLowerCase()) : true) &&
					(newQuery.fired != null ? employee.fired == newQuery.fired : true)
				);
				return compare
			});
			if (this.filteredEmployees.length == 0) {
				this.filteredEmployees = null;
			}
		},
		genTitles() {
			const uniqueTitles = Array.from(this.employees.reduce((acc, employee) => {
				acc.add(employee.job_title);
				return acc;
			}, new Set()));
			return uniqueTitles
		},
		getIndexOfEmployee(name) {
			return this.employees.findIndex(employee => employee.name === name);
		},
		setFired(index) {
			this.$set(this.employees[index], 'fired', true);
			this.$forceUpdate();
		},
		clearQuery() {
			this.filteredEmployees = null;
		},
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$forceUpdate();
		});
	}
}
</script> -->