<template>
	<div v-if="!loading" class="content medexam-list-page">
		<section class="works bg black-background">
			<div class="works-wrapper wp">
				<section class="medexam-list"></section>
				<h1>Список медосмотров</h1>
				<div class="table-container">
					<table>
						<thead>
							<tr>
								<th>Врач</th>
								<th>Сотрудник</th>
								<th>Дата</th>
								<th>Статус</th>
							</tr>
						</thead>
						<tbody>
							<RowMedexam v-for="medexam in medexams" :key="medexam.id" :medexam="medexam"></RowMedexam>
						</tbody>
					</table>
				</div>
			</div>
			<div class="pagination">
				<button v-for="number in getNumbersPagination" :key="number" @click="next(number)">{{ number }}</button>
			</div>
		</section>
	</div>
	<LoaderComponent v-else></LoaderComponent>
</template>

<script>
import axios from 'axios';
import RowMedexam from '../components/RowMedexam.vue'
import LoaderComponent from '../components/LoaderComponent.vue';

export default {
	name: "MedexamList",
	components: {
		RowMedexam,
		LoaderComponent,
	},
	data() {
		return {
			medexams: [],
			loading: true,
			pagesNumber: [],
			currentPage: 1,
			medexamsPerPage: 7,
			pagesSummary: 0,
		}
	},
	created() {
		this.startLoading()
	},
	computed: {
		getNumbersPagination() {
			console.log('getNumbersPagination: ', Array.from({ length: this.pagesSummary }, (_, index) => ++index));
			return Array.from({ length: this.pagesSummary }, (_, index) => 1 + index)
		}
	},
	methods: {
		startLoading() {
			setTimeout(() => {
				this.loadMedExam()
			}, 2000);
		},
		next(number) {
			console.log('current: ', this.currentPage, '\nnum: ', number);
			if (this.currentPage != number) {
				this.currentPage = number
				this.loading = true
				this.loadMedExam()
			}
		},
		loadMedExam() {
			axios.get(`http://localhost:3000/medexams?_embed=employee&_page=${this.currentPage}&_per_page=${this.medexamsPerPage}`)
				.then((response) => {
					this.pagesSummary = response.data.pages
					this.pagesNumber = this.numbers
					this.medexams = response.data.data
					console.log('loaded medexams: ', this.employees);
				})
				.catch((error) => {
					console.log("Ошибка - ", error);
				})
				.finally(() => {
					this.loading = false;
				});
		}
	}
}
</script>