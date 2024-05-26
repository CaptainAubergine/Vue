<template>
	<div class="sidebar">
		<ul>
			<li><router-link :to="{ name: 'MainPage' }">Главная</router-link></li>
			<li><router-link :to="{ name: 'EmployeeList' }">Список сотрудников</router-link></li>
			<li><router-link :to="{ name: 'AddEmployee' }">Добавить сотрудника</router-link></li>
			<li><router-link :to="{ name: 'FiredEmployees' }">Уволенные сотрудники</router-link></li>
			<li><router-link :to="{ name: 'MedexamList' }">Медосмотры</router-link></li>
			<li><router-link :to="{ name: 'NotFound' }">404</router-link></li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'Sidebar',
}
</script>