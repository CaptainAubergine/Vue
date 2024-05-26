<template>
	<section class="medexam-info">
		<h1>Карточка медосмотра сотрудника</h1>
		<div class="grid-wrapper">
			<div class="grid-container">
				<div>
					<p><strong>Имя сотрудника:</strong></p>
					<p><strong>Врач:</strong></p>
					<p><strong>Температура:</strong></p>
					<p><strong>Систолическое давление:</strong></p>
					<p><strong>Диастолическое давление:</strong></p>
					<p><strong>Статус:</strong></p>
				</div>
				<div>
					<p>{{ medexam.employee.name }}</p>
					<p>{{ medexam.doctor_name }}</p>
					<p>{{ medexam.temperature }}</p>
					<p>{{ medexam.pressure_systolic }}</p>
					<p>{{ medexam.pressure_diastolic }}</p>
					<p>{{ medexam.status ? 'Пройден' : 'Не пройден' }}</p>
				</div>
			</div>
		</div>
		<!-- <img :src="`./img/${employee.img}`"> -->
		<button @click="previousPage" class="fired-button">Вернуться назад</button>
	</section>
</template>

<script>
export default {
	name: 'MedexamInfo',
	props: ['medexam'],
	methods: {
		previousPage() {
			this.$router.go(-1);
		}
	}
}
</script>