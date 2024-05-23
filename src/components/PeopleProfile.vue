<template>
	<section class="profile-form">
		<div class="works-wrapper wp employee-page">
			<input v-model="editedEmployee.name" type="text" placeholder="Имя" required>
			<input v-model="editedEmployee.birth_date" type="date" required>
			<input v-model="editedEmployee.job_title" type="text" required>
			<input v-model="editedEmployee.organisation" type="text" required>
			<input v-model="editedEmployee.img" type="text" required>
			<img class="employee-page__img" :src="`./img/${editedEmployee.img}`">
		</div>
		<button class=" emplPage-button" @click="applyChanges">Применить</button>
		<button class="emplPage-button" @click="cancelChanges">Отменить</button>
	</section>
</template>

<script>
export default {
	props: ['employee'],
	data() {
		return {
			editedEmployee: {
				name: null,
				birth_date: null,
				organisation: null,
				job_title: null,
				img: null,
				fired: false,
			},
		}
	},
	created() {
		this.editing()
	},
	methods: {
		editing() {
			console.log("Date before: ", this.employee.birth_date);
			this.editedEmployee.name = this.employee.name
			this.editedEmployee.birth_date = (this.formatDate(this.employee.birth_date) != "Invalid Date" ? this.formatDate(this.employee.birth_date) : this.employee.birth_date);
			this.editedEmployee.sex = this.employee.sex
			this.editedEmployee.organisation = this.employee.organisation
			this.editedEmployee.job_title = this.employee.job_title
			this.editedEmployee.img = this.employee.img
			console.log("Date after: ", this.editedEmployee.birth_date);
		},
		formatDate(value) {
			const date = new Date(value * 1000);
			const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
			const formattedDate = date.toLocaleDateString('en-CA', options).replace(/\//g, '-');
			return formattedDate
		},
		applyChanges() {
			this.$emit("applyChanges", this.editedEmployee)
			this.clear()
		},
		cancelChanges() {
			this.$emit("cancelChanges")
			this.clear()
		},
		clear() {
			this.editedEmployee = {
				name: null,
				birth_date: null,
				organisation: null,
				job_title: null,
				img: null,
			}
		},
	}
}
</script>