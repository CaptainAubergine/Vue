<template>
	<section class="adding-form" v-if="isShowedAdding">
		<form @submit.prevent="onEmployeeAdded">
			<input v-model="newEmployee.name" type="text" placeholder="Имя" required>
			<select v-model="newEmployee.sex" required>
				<option value="" disabled selected hidden>Выберите пол</option>
				<option value="0">Мужской</option>
				<option value="1">Женский</option>
			</select>
			<input v-model="newEmployee.birth_date" type="date" required>
			<input v-model="newEmployee.organisation" type="text" placeholder="Организация" required>
			<input v-model="newEmployee.job_title" type="text" placeholder="Должность" required>
			<input v-model="newEmployee.img" type="text" placeholder="Изображение" required>
			<select v-model="newEmployee.fired" required>
				<option value="" disabled selected hidden>Статус</option>
				<option value="true">Уволен</option>
				<option value="false">Нет</option>
			</select>

			<button type="submit">Добавить</button>
		</form>
	</section>
</template>

<script>
export default {
	props: {
		isShowedAdding: Boolean,
	},
	data() {
		return {
			newEmployee: {
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
	methods: {
		onEmployeeAdded() {
			// console.log(this.newEmployee);
			this.newEmployee.birth_date = Math.floor(new Date(this.newEmployee.birth_date).getTime() / 1000)
			this.$emit('onEmployeeAdded', this.newEmployee);
			console.log(this.newEmployee);
			this.newEmployee = {};
		},
	}
}
</script>

<style scoped></style>