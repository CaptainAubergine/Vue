<template>
	<div class="content medexam-page" v-if="!loading">
		<section class="works bg black-background main-page">
			<div class="works-wrapper wp">
				<MedexamInfo :medexam="medexam"></MedexamInfo>
			</div>
		</section>
	</div>
	<LoaderComponent v-else></LoaderComponent>
</template>
<script>
import MedexamInfo from '../components/MedexamInfo.vue';
import LoaderComponent from '../components/LoaderComponent.vue';
import axios from 'axios'

export default {
	name: 'MedexamPage',
	props: ['idMedexam', 'idEmployee'],
	components: {
		LoaderComponent,
		MedexamInfo,
	},
	data() {
		return {
			loading: true,
			medexam: [],
		}
	},
	created() {
		this.startLoading()
	},
	methods: {
		startLoading() {
			setTimeout(() => {
				this.loadMedExam()
			}, 2000);
		},
		loadMedExam() {
			const params = {
				id: this.idMedexam,
				employeeId: this.idEmployee
			}
			axios.get(`http://localhost:3000/medexams?_embed=employee`, { params })
				.then((response) => {
					this.medexam = response.data[0]
					console.log('medexam id: ', this.idMedexam, 'employee id: ', this.idEmployee);
					console.log("medexam _embed: ", this.medexam);
				})
				.catch((error) => {
					console.log("Ошибка - ", error);
				})
				.finally(() => {
					this.loading = false;
				});
		},
		prevPage() {
			this.$router.go(-1);
		},
	}
}
</script>