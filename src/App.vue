<template>
	<div class="content">
		<section class="works bg black-background">
			<div class="works-wrapper wp">
				<div class="works__container">
					<div class="works__left">
						<People v-for="(employee, index) in employees" :key="employee.name" :people="employee" :index="index"
							:is-left="true" />
					</div>
					<div class="works__right">
						<People v-for="(employee, index) in employees" :key="employee.name" :people="employee" :index="index"
							:is-left="false" />
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import People from './components/People.vue'
import { employees } from './js/employees.js'
import { animateScroll } from './js/gsap.js'

export default {
	name: 'App',
	components: {
		People
	},
	computed: {
		employees: function () {
			return employees;
		},
	},
	mounted: function () {
		animateScroll()
	}
}
</script>

<style></style>