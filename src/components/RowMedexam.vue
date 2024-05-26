<template>
	<tr>
		<td class="first" @click="toMedexamPage">{{ medexam.doctor_name }}</td>
		<td class="second" @click="toEmployeePage">{{ medexam.employee.name }}</td>
		<td>{{ medexam.date_exam | formatDate }}</td>
		<td v-if="medexam.status" style="color: green;">Пройден</td>
		<td v-else style="color: red;">Не пройден</td>
	</tr>
</template>

<script>
import { animateScroll } from '../js/gsap.js'

export default {
	name: 'RowMedexam',
	props: ['medexam'],
	methods: {
		toEmployeePage() {
			this.$router.push({ name: 'EmployeePage', params: { id: this.medexam.employee.id } });
		},
		toMedexamPage() {
			this.$router.push({ name: 'MedexamPage', params: { idMedexam: this.medexam.id, idEmployee: this.medexam.employee.id } });
		}
	},
	mounted: function () {
		animateScroll();
	}
}
</script>