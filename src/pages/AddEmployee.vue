<template>
	<div class="content add-employee-page">
		<section class="works bg black-background">
			<div class="works-wrapper wp">
				<people-adding></people-adding>
			</div>
		</section>
	</div>
</template>

<script>
import PeopleAdding from "../components/PeopleAdding.vue"

export default {
	name: 'AddEmployee',
	components: {
		PeopleAdding
	}
}
</script>