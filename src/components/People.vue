<template>
	<div :key="people.name" v-if="isLeft && incrementIndex(index) % 2 == 0" class="image works__item"
		:style="{ 'background-image': 'url(./img/' + people.img + ')' }">
		<div class="blinds_container">
			<div class="blinds__item left"></div>
			<div class="blinds__item right"></div>
		</div>
	</div>
	<div :key="people.name" v-else-if="isLeft && incrementIndex(index) % 2 == 1" class="text-block works__item"
		data-lag=".1">
		<h1 class="text-block__h1">{{ people.name }}</h1>
		<div class="text-block__p">
			<p class="left">Дата рождения:</p>
			<p class="right">{{ date(people.birth_date) }}</p>
			<p class="left">Пол:</p>
			<p class="right">{{ getGender(people.sex) }}</p>
			<p class="left">Организация:</p>
			<p class="right">{{ people.organisation }}</p>
			<p class="left">Работа:</p>
			<p class="right">{{ people.job_title }}</p>
			<p v-if="people.fired" class="left">Уволен!!!!</p>
		</div>
	</div>
	<div v-else-if="!isLeft && incrementIndex(index) % 2 == 0" class="text-block works__item" data-lag=".1">
		<h1 class="text-block__h1">{{ people.name }}</h1>
		<div class="text-block__p">
			<p class="left">Дата рождения:</p>
			<p class="right">{{ date(people.birth_date) }}</p>
			<p class="left">Пол:</p>
			<p class="right">{{ getGender(people.sex) }}</p>
			<p class="left">Организация:</p>
			<p class="right">{{ people.organisation }}</p>
			<p class="left">Работа:</p>
			<p class="right">{{ people.job_title }}</p>
			<p v-if="people.fired" class="left">Уволен!!!!!</p>
		</div>
	</div>
	<div v-else-if="!isLeft && incrementIndex(index) % 2 == 1" class="image works__item"
		:style="{ 'background-image': 'url(./img/' + people.img + ')' }">
		<div class="blinds_container">
			<div class="blinds__item left"></div>
			<div class="blinds__item right"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'People',
	props: {
		people: Object,
		index: Number,
		isLeft: Boolean
	},
	methods: {
		incrementIndex: function (index) {
			return index++;
		},
		getGender: function (sex) {
			return (sex === 0 ? 'мужской' : 'женский');
		},
		date: function (_date) {
			const date = new Date(_date * 1000);
			const day = ('0' + date.getDate()).slice(-2);
			const month = ('0' + (date.getMonth() + 1)).slice(-2);
			const year = date.getFullYear();
			return `${day}.${month}.${year}`;
		},
	}
}
</script>

<style scoped></style>