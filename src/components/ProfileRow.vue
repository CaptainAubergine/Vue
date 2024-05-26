<template>
	<tr>
		<td class="first" @click="redirectToMedexam()">{{ medexam.doctor_name }}</td>
		<td>{{ medexam.date_exam | formatDate }}</td>
		<td v-if="medexam.status" style="color: green;">Пройден</td>
		<td v-if="!medexam.status" style="color: red">Не пройден</td>
	</tr>
</template>
<script>
export default {
	name: "ProfileRow",
	props: ['medexam', 'employee'],
	methods: {
		redirectToMedexam() {
			// console.log("this.medexam.id: ", this.medexam.id, "this.employee.id: ", this.employee.id);
			this.$router.push({ name: 'MedexamPage', params: { idMedexam: this.medexam.id, idEmployee: this.employee.id } });
		}
	}
}
</script>