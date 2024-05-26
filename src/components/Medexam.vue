<template>
	<section class="medexam">
		<hr>
		<h1>Медосмотры сотрудника</h1>
		<div class="table-container">
			<table>
				<thead>
					<tr>
						<th>Врач</th>
						<th>Дата</th>
						<th>Статус</th>
					</tr>
				</thead>
				<tbody>
					<ProfileRow v-for="medexam in medexams" :key="medexam.id" :medexam="medexam" :employee="employee">
					</ProfileRow>
				</tbody>
			</table>
		</div>
	</section>
</template>

<script>
import ProfileRow from '../components/ProfileRow.vue'

export default {
	name: 'Medexam',
	components: {
		ProfileRow,
	},
	props: ['medexams', 'employee'],
}
</script>