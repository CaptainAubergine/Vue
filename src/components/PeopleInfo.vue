<template>
	<section class="people-info">
		<h1>Информация о сотруднике</h1>
		<div class="grid-wrapper">
			<div class="grid-container">
				<div>
					<p><strong>Имя:</strong></p>
					<p><strong>Дата рождения:</strong></p>
					<p><strong>Должность:</strong></p>
					<p><strong>Пол:</strong></p>
					<p><strong>Организация:</strong></p>
				</div>
				<div>
					<p>{{ employee.name }}</p>
					<p>{{ employee.birth_date }}</p>
					<p>{{ employee.job_title }}</p>
					<p v-if="employee.sex == 0">Мужской</p>
					<p v-else>Женский</p>
					<p>{{ employee.organisation }}</p>
				</div>
			</div>
		</div>
		<img :src="`./img/${employee.img}`">

		<!-- <div>
			<p><strong>Имя:</strong>&nbsp;&nbsp;&nbsp;{{ employee.name }}</p>
			<p><strong>Дата рождения:</strong>&nbsp;&nbsp;&nbsp;{{ employee.birth_date | formatDate }}</p>
			<p><strong>Должность:</strong>&nbsp;&nbsp;&nbsp;{{ employee.job_title }}</p>
			<p v-if="employee.sex == 0"><strong>Пол:</strong>&nbsp;&nbsp;&nbsp;Мужской</p>
			<p v-else><strong>Пол:</strong>&nbsp;&nbsp;Женский</p>
			<p><strong>Организация:</strong>&nbsp;&nbsp;&nbsp;{{ employee.organisation }}</p>
		</div> -->
	</section>
</template>

<script>
import { animateScroll } from '../js/gsap.js'

export default {
	name: 'PeopleInfo',
	props: ['employee'],
	mounted: function () {
		animateScroll();
	}
}
</script>