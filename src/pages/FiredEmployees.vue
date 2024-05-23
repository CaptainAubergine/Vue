<template>
	<section class="works bg black-background">
		<div class="works-wrapper wp">
			<div class=" works__container">
				<div class="works__left">
					<People v-for="(employee, index) in employees" :key="employee.name" :people="employee" :index="index"
						:is-left="true" :filter-fired="fired" @unFired="unFired">
					</People>
				</div>
				<div class="works__right">
					<People v-for="(employee, index) in employees" :key="employee.name" :people="employee" :index="index"
						:is-left="false" :filter-fired="fired" @unFired="unFired">
					</People>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import People from '../components/People.vue'
export default {
	name: "EmployeeFired",
	components: {
		People,
	},
	props: ['employees', 'fired'],
	methods: {
		unFired(index) {
			this.$set(this.employees[index], 'fired', false);
			console.log('EmployeeList fired: ', this.employees[index].fired);
			// this.$forceUpdate();
		},
	},
	// beforeRouteEnter(to, from, next) {
	// 	next(vm => {
	// 		vm.$forceUpdate();
	// 	}, { flush: true });
	// }
}
</script>