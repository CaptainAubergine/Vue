<template>
	<section class="filter-form" v-if="isShowedFilter">
		<form @submit.prevent="createFilter">
			<input v-model="filter.name" type="text" placeholder="ФИО">
			<input v-model="filter.birth_date" type="date" placeholder="Дата рождения">
			<span>
				<input class="checkbox" name="male" type="radio" id="name" value="0" v-model="filter.sex">
				<label for="male">Мужской</label>
				<input class="checkbox" name="female" type="radio" id="name" value="1" v-model="filter.sex">
				<label for="female">Женский</label>
			</span>
			<input v-model="filter.organisation" type="text" placeholder="Организация">
			<select v-model="filter.job_title">
				<option value="true" disabled selected hidden>Должность</option>
				<option v-for="title in titles" :key="title" :value="title">{{ title }}</option>
			</select>
			<!-- <span>
				<label for="fired">Уволен</label>
				<input v-model="filter.fired" type="checkbox" value="false" name="fired">
			</span> -->
			<button type="submit">Применить</button>
			<button @click="clearFilter">Отменить</button>
			<span class="emplCount">
				Количество работников {{ countFindedEmployees }} из {{ countEmployees }}
			</span>
		</form>
	</section>
</template>

<script>
export default {
	props: {
		isShowedFilter: Boolean,
		titles: [],
		countEmployees: null,
		countFindedEmployees: null
	},
	data() {
		return {
			filter: {
				name: null,
				sex: null,
				birth_date: null,
				organisation: null,
				job_title: null,
				fired: null,
			},
		}
	},
	methods: {
		dateToUnix(value) {
			const date = Math.floor(new Date(value).getTime() / 100000000).toFixed(0)
			return date
		},
		createFilter() {
			this.filter.birth_date = this.dateToUnix(this.filter.birth_date)
			this.$emit('createFilter', this.filter);
			console.log("Filter: ", this.filter);
		},
		clearFilter() {
			this.$emit("clearFilter")
			this.filter = {
				name: null,
				sex: null,
				birth_date: null,
				organisation: null,
				job_title: null,
				fired: null,
			}
		}
	},
}
</script>