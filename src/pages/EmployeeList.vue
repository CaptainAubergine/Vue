<template>
	<section class="works bg black-background">
		<div class="works-wrapper wp">
			<button @click="showFilterEmployeeForm" class="works-wrapper__button">Фильтр сотрудников</button>
			<people-filter @createFilter="createFilter" :is-showed-filter="isShowedFilter" :titles="titles"
				:countEmployees="employees.length"
				:countFindedEmployees="filteredEmployees != null ? filteredEmployees.length : 0">
			</people-filter>
			<button v-if="selectedEmployees.length > 0" @click="fireSelectedEmployee" class="main-fire">Уволить</button>
			<div class=" works__container">
				<div class="works__left">
					<People v-for="(employee, index) in (filteredEmployees != null ? filteredEmployees : employees)"
						:key="employee.name" :people="employee" :index="index" :is-left="true" :filter-fired="fired"
						@setFired="setFired" @clearFilter="clearFilter" @selected="selected" @unselected="unselected">
					</People>
				</div>
				<div class="works__right">
					<People v-for="(employee, index) in (filteredEmployees != null ? filteredEmployees : employees)"
						:key="employee.name" :people="employee" :index="index" :is-left="false" :filter-fired="fired"
						@setFired="setFired" @clearFilter="clearFilter" @selected="selected" @unselected="unselected">
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
			titles: this.jobTitles(),
			filteredEmployees: null,
			selectedEmployees: [],
			isShowedFilter: false,
		}
	},
	props: ['employees', 'fired'],
	methods: {
		selected(index) {
			console.log(index);
			this.selectedEmployees.push(index)
		},
		unselected(index) {
			const selectedEmployeeIndex = this.selectedEmployees.findIndex(item => item === index);
			this.selectedEmployees.splice(selectedEmployeeIndex, 1)
		},
		fireSelectedEmployee() {
			this.selectedEmployees.forEach(item => {
				if (this.employees[item].fired != true) {
					this.$set(this.employees[item], 'fired', true);

				}
			});
			console.log(this.selectedEmployees);
			this.selectedEmployees.splice(0, this.selectedEmployees.length)
		},
		showFilterEmployeeForm() {
			this.isShowedFilter = true;
		},
		jobTitles() {
			const titles = Array.from(this.employees.reduce((acc, employee) => {
				acc.add(employee.job_title);
				return acc;
			},
				new Set()));
			return titles
		},
		createFilter(filter) {
			console.log("Filter date: ", filter.birth_date);
			this.filteredEmployees = this.employees.filter(employee => {
				let cuttedEmployeeDate = (employee.birth_date / 100000).toFixed(0)
				if (cuttedEmployeeDate != filter.birth_date) {
					cuttedEmployeeDate -= 1;
				}
				console.log("Employee date: ", cuttedEmployeeDate);
				let matches = (
					(filter.name != null ? employee.name.toLowerCase().includes(filter.name.toLowerCase()) : true) &&
					(filter.birth_date != null ? cuttedEmployeeDate == filter.birth_date : true) &&
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
		// filterDate(_date) {
		// 	const date = new Date(_date * 1000)
		// 	console.log(date.toLocaleDateString('ru-RU'));
		// 	return (date.toLocaleDateString('ru-RU') != "Invalid Date" ? date.toLocaleDateString('ru-RU') : new Date(_date).toLocaleDateString('ru-RU'))
		// },
		clearFilter() {
			this.filteredEmployees = null;
		},
		setFired(index) {
			this.$set(this.employees[index], 'fired', true);
			console.log('EmployeeList fired: ', this.employees[index].fired);
			// this.$forceUpdate();
		},
	},
	// beforeRouteEnter(to, from, next) {
	// 	next(vm => {
	// 		vm.$forceUpdate();
	// 	}, { flush: true });
	// }
}
</script>