<template>
	<div v-if="!loading" class="content employee-page">
		<section class="works bg black-background">
			<div class="works-wrapper wp">
				<PeopleInfo v-if="!isEdited" :employee="employee"></PeopleInfo>
				<PeopleProfile v-if="isEdited" :employee="employee" @applyChanges="applyChanges" @cancelChanges="cancelChanges">
				</PeopleProfile>
				<button v-if="!isEdited && !employee.fired" @click="editing">Редактировать</button>
				<button @click="setFired" v-if="!employee.fired && !isEdited">Уволить</button>
				<button @click="unFired" v-if="employee.fired && !isEdited">Восстановить</button>
				<button @click="previousPage">Вернуться назад
					<!-- <router-link :to="{ name: 'EmployeeList' }">Вернуться назад</router-link> -->
				</button>
				<Medexam v-if="!isEdited && medexams.length > 0" :medexams="medexams" :employee="employee"></Medexam>
			</div>
		</section>
	</div>
	<LoaderComponent v-else :loading="loading"></LoaderComponent>
</template>

<script>
import PeopleProfile from '../components/PeopleProfile.vue'
import LoaderComponent from '../components/LoaderComponent.vue'
import PeopleInfo from '../components/PeopleInfo.vue'
import Medexam from '../components/Medexam.vue'
import axios from 'axios'

export default {
	name: "EmployeePage",
	props: ['id'],
	components: {
		PeopleProfile,
		LoaderComponent,
		PeopleInfo,
		Medexam,
	},
	data() {
		return {
			employee: Object,
			isEdited: false,
			loading: true,
			medexams: [],
			editingEmployee: {
				name: null,
				birth_date: null,
				sex: null,
				organisation: null,
				job_title: null,
				img: null
			}
		}
	},
	created() {
		this.startLoading()
	},
	methods: {
		previousPage() {
			this.$router.go(-1);
		},
		startLoading() {
			setTimeout(() => {
				this.loadMedExams()
				this.loadEmployees()
			}, 500);
		},
		loadEmployees() {
			const params = {
				id: this.id
			}
			// console.log('params: ', params)
			axios.get(`http://localhost:3000/employees`, { params })
				.then((response) => {
					this.employee = response.data[0]
				})
				.catch((error) => {
					console.log("Ошибка - ", error);
				})
				.finally(() => {
					this.loading = false;
				});
		},
		editing() {
			this.isEdited = true
		},
		applyChanges(editedEmployee) {
			editedEmployee.birth_date = Math.floor(new Date(editedEmployee.birth_date).getTime() / 1000)
			this.employee = editedEmployee;
			this.isEdited = false;
			this.saveChanges()
			console.log("Employees: ", this.employee, "\nEditedEmployee: ", editedEmployee);
		},
		cancelChanges() {
			this.isEdited = false;
		},
		setFired() {
			this.employee.fired = true
			this.saveChanges()
			this.$forceUpdate();
		},
		saveChanges() {
			this.loading = true;
			axios.put(`http://localhost:3000/employees/${this.employee.id}`, this.employee)
				.then(() => {
					this.loadEmployees()
				})
				.catch((error) => {
					console.log("Ошибка - ", error);
				})
			console.log('this.employee.id: ', this.employee.id, '\nthis.employee: ', this.employee);
		},
		unFired() {
			this.employee.fired = false
			this.saveChanges()
			// console.log('EmplPage fired: ', this.employee.fired);
			this.$forceUpdate();
		},
		loadMedExams() {
			const params = {
				employeeId: this.id
			}
			axios.get(`http://localhost:3000/medexams`, { params })
				.then((response) => {
					this.medexams = response.data
					console.log("This employee medexams: ", this.medexams);
				})
				.catch((error) => {
					console.log("Ошибка - ", error);
				})
				.finally(() => {
					this.loading = false;
				});
		}
	}
}
</script>
