<template>
	<div v-if="!loading" class="content employee-list-page">
		<section class="works bg black-background">
			<div class="works-wrapper wp">
				<h1 v-if="!fired">Список работающих сотрудников</h1>
				<h1 v-if="fired">Список уволенных сотрудников</h1>
				<people-filter @createFilter="createFilter" :countEmployees="employeesCount" :titles="titles"
					:countFindedEmployees="filteredEmployees != null ? filteredEmployees.length : employees.length">
				</people-filter>
				<hr>
				<button v-if="selectedEmployees.length > 0 && !fired" @click="fireSelectedEmployee"
					class="main-fire">Уволить</button>
				<div class=" works__container">
					<div class="works__left">
						<People v-for="employee in (filteredEmployees != null ? filteredEmployees : employees)" :key="employee.id"
							:people="employee" :id="parseInt(employee.id)" :is-left="true" :filter-fired="fired" @setFired="setFired"
							@unFired="unFired" @clearFilter="clearFilter" @selected="selected" @unselected="unselected">
						</People>
					</div>
					<div class="works__right">
						<People v-for="employee in (filteredEmployees != null ? filteredEmployees : employees)" :key="employee.id"
							:people="employee" :id="parseInt(employee.id)" :is-left="false" :filter-fired="fired" @setFired="setFired"
							@unFired="unFired" @clearFilter="clearFilter" @selected="selected" @unselected="unselected">
						</People>
					</div>
				</div>
				<div class="pagination">
					<button v-for="number in getNumbersPagination" :key="number" @click="next(number)">{{ number
						}}</button>
				</div>
			</div>
		</section>
	</div>
	<LoaderComponent v-else></LoaderComponent>
</template>

<script>
import People from '../components/People.vue'
import PeopleFilter from '../components/PeopleFilter.vue'
import LoaderComponent from '../components/LoaderComponent.vue'
import axios from 'axios'

export default {
	name: 'EmployeeList',
	components: {
		LoaderComponent,
		People,
		PeopleFilter,
	},
	props: ['fired'],
	data() {
		return {
			titles: [],
			filteredEmployees: null,
			selectedEmployees: [],
			employees: [],
			loading: true,
			employeesCount: null,
			currentPage: 1,
			employeesPerPage: 4,
			pagesSummary: null,
			pagesNumber: [],
		}
	},
	created() {
		this.startLoading()
		// this.setNumbersPagination()
	},
	computed: {
		getNumbersPagination() {
			console.log('getNumbersPagination: ', Array.from({ length: this.pagesSummary }, (_, index) => ++index));
			return Array.from({ length: this.pagesSummary }, (_, index) => ++index)

			// const pageNumber = []
			// for (let i = 0; i < this.pagesSummary.length; i++) {
			// 	pageNumber.push(i)
			// }
			// console.log('getNumberPagination: ', pageNumber);
			// return pageNumber
		},
	},
	methods: {
		// setNumbersPagination() {
		// 	this.numbers = Array.from({ length: this.totalPages }, (_, index) => 1 + index)
		// 	console.log('numbers: ', this.numbers);
		// },
		next(number) {
			console.log('current: ', this.currentPage, '\nnum: ', number);
			if (this.currentPage != number) {
				this.selectedEmployees.splice(0, this.selectedEmployees.length)
				this.filteredEmployees = null
				this.currentPage = number
				this.loading = true
				this.loadEmployees()
			}
		},
		selected(id) {
			console.log('Selected id: ', id);
			this.selectedEmployees.push(id)
			console.log('Selected id arr: ', this.selectedEmployees);
		},
		unselected(id) {
			console.log('Unselected id: ', id);
			const selectedEmployeeIndex = this.selectedEmployees.findIndex(item => item === id);
			this.selectedEmployees.splice(selectedEmployeeIndex, 1)
			console.log('Selected id arr: ', this.selectedEmployees);
		},
		fireSelectedEmployee() {
			this.selectedEmployees.forEach(id => {
				this.employees.forEach(employee => {
					console.log('Employee: ', employee);
					if (employee.id == id) {
						if (employee.fired != true) {
							employee.fired = true
							this.saveChanges(id, employee)
						}
					}
				})
			});
			this.selectedEmployees.splice(0, this.selectedEmployees.length)
			console.log('Selected id arr: ', this.selectedEmployees);
		},
		jobTitles(employees) {
			const titles = Array.from(employees.reduce((acc, employee) => {
				acc.add(employee.job_title);
				return acc;
			},
				new Set()));
			return titles
		},
		createFilter(filter) {
			this.filteredEmployees = this.employees.filter(employee => {
				let cuttedEmployeeDate = (employee.birth_date / 100000).toFixed(0)
				if (cuttedEmployeeDate != filter.birth_date) {
					cuttedEmployeeDate -= 1;
				}
				console.log("Employee obj: ", employee, "\nFilter obj: ", filter,);
				let matches = (
					(filter.name != null ? employee.name.toLowerCase().includes(filter.name.toLowerCase()) : true) &&
					(filter.birth_date != null ? cuttedEmployeeDate == filter.birth_date : true) &&
					(filter.sex != null ? employee.sex == filter.sex : true) &&
					(filter.organisation != null ? employee.organisation.toLowerCase().includes(filter.organisation.toLowerCase()) : true) &&
					(filter.job_title != null ? employee.job_title.toLowerCase().includes(filter.job_title.toLowerCase()) : true) &&
					(filter.fired != null ? employee.fired == filter.fired : true)
				);
				return matches
			});
			if (this.filteredEmployees.length == 0) {
				this.filteredEmployees = null;
			}
		},
		clearFilter() {
			this.filteredEmployees = null;
		},
		startLoading() {
			setTimeout(() => {
				this.loadEmployees()
			}, 500);
		},
		loadEmployees() {
			const queryParams = `fired=${this.fired}&_page=${this.currentPage}&_per_page=${this.employeesPerPage}`
			axios.get(`http://localhost:3000/employees?${queryParams}`)
				.then((response) => {
					console.log('response: ', response);
					this.pagesSummary = response.data.pages
					this.employeesCount = response.data.items
					this.pagesNumber = this.getNumbersPagination
					this.employees = response.data.data
					console.log('loaded employees: ', this.employees);
					this.titles = this.jobTitles(this.employees)
				})
				.catch((error) => {
					console.log("Error: ", error);
				})
				.finally(() => {
					this.loading = false;
				});
		},
		saveChanges(id, employee) {
			this.loading = true;
			axios.put(`http://localhost:3000/employees/${id}`, employee)
				.then(() => {
					this.loadEmployees()
				})
				.catch((error) => {
					console.log("Ошибка - ", error);
				})
			console.log('this.employee.id: ', id, '\nthis.employee: ', employee, '\nthis.employee.fired: ', employee.fired);
		},
		setFired(id) {
			this.employees.forEach(employee => {
				if (employee.id == id) {
					employee.fired = true
					this.saveChanges(id, employee)
				}
			})
		},
		unFired(id) {
			this.employees.forEach(employee => {
				if (employee.id == id) {
					employee.fired = false
					this.saveChanges(id, employee)
				}
			})
		},
	}
}
</script>