<template>
	<section class="filter-form">
		<form @submit.prevent="createFilter">
			<span>
				<p>ФИО:</p>
				<input v-model="filter.name" type="text">
			</span>
			<span>
				<p>Дата:</p>
				<input v-model="filter.birth_date" type="date">
			</span>
			<span>
				<p>Организация:</p>
				<input v-model="filter.organisation" type="text">
			</span>
			<span>
				<p>Должность:</p>
				<select v-model="filter.job_title">
					<option v-for="title in titles" :key="title" :value="title">{{ title }}</option>
				</select>
			</span>
			<span>
				<span class="sex">
					<p>Мужской:</p>
					<input class="checkbox" type="radio" id="name" value="0" v-model="filter.sex">
				</span>
				<span class="sex">
					<p>Женский:</p>
					<input class="checkbox" name="female" type="radio" id="name" value="1" v-model="filter.sex">
				</span>
			</span>
			<span class="buttons">
				<button type="submit">Применить</button>
				<button @click="clearFilter">Отменить</button>
			</span>
			<span>
				<p class="emplCount">
					Количество работников: {{ countFindedEmployees }} из {{ countEmployees }}
				</p>
			</span>
		</form>
	</section>
</template>

<script>

export default {
	props: {
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
			if (this.filter.birth_date != null) {
				this.filter.birth_date = parseInt(this.dateToUnix(this.filter.birth_date))
			}
			this.$emit('createFilter', this.filter);
			// console.log("Filter: ", this.filter);
			this.clearFilter()
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
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$forceUpdate();
		}, { flush: true });
	}
}
</script>