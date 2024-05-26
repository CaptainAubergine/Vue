<template>
	<section class="people-adding">
		<h1>Добавление нового сотрудника</h1>
		<form @submit.prevent="onEmployeeAdded">
			<span>
				<p>Имя:</p>
				<input v-model="newEmployee.name" type="text" required>
			</span>
			<span>
				<p>Пол:</p>
				<select v-model="newEmployee.sex" required>
					<option value="0">Мужской</option>
					<option value="1">Женский</option>
				</select>
			</span>
			<span>
				<p>Дата рождения:</p>
				<input v-model="newEmployee.birth_date" type="date" required>
			</span>
			<span>
				<p>Организация:</p>
				<input v-model="newEmployee.organisation" type="text" required>
			</span>
			<span>
				<p>Должность:</p>
				<input v-model="newEmployee.job_title" type="text" required>
			</span>
			<span>
				<p>Изображение:</p>
				<input v-model="newEmployee.img" type="text" required>
			</span>
			<span>
				<p>Уволен?</p>
				<select v-model="newEmployee.fired" required>
					<option value="true">Уволен</option>
					<option value="false">Нет</option>
				</select>
			</span>
			<button type="submit">Добавить</button>
		</form>
	</section>
</template>

<script>
import axios from 'axios'
// import { animateScroll } from '../js/gsap.js'

export default {
	name: 'PeopleAdding',
	data() {
		return {
			newEmployee: {
				id: null,
				name: null,
				sex: null,
				birth_date: null,
				organisation: null,
				job_title: null,
				img: null,
				fired: false,
			},
		}
	},
	created() {
		this.generateID()
	},
	methods: {
		generateID() {
			let newID = 0
			axios.get(`http://localhost:3000/employees`)
				.then((response) => {
					const employees = response.data;
					console.log('Get data: ', response.data);
					newID = parseInt(employees[employees.length - 1].id)
					this.newEmployee.id = '' + (newID + 1)
					console.log('id: ', this.newEmployee.id);
				})
		},
		onEmployeeAdded() {
			this.newEmployee.birth_date = Math.floor(new Date(this.newEmployee.birth_date).getTime() / 1000)
			axios.post('http://localhost:3000/employees', this.newEmployee)
			console.log("Added new employee: ", this.newEmployee);
			this.resetForm();
		},
		resetForm() {
			this.newEmployee = {
				name: null,
				birth_date: null,
				sex: 0,
				organisation: null,
				job_title: null,
				fired: false,
				img: null
			};
		}
	},
	// mounted: function () {
	// 	animateScroll();
	// }
}
</script>