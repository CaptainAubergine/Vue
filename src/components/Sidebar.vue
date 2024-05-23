<template>
	<div class="sidebar">
		<ul>
			<li><router-link to="/">Главная</router-link></li>
			<li><router-link :to="{ name: 'EmployeeList' }">Список сотрудников</router-link></li>
			<li><router-link to="/add-employee">Добавить сотрудника</router-link></li>
			<li><router-link to="/fired-employees">Уволенные сотрудники</router-link></li>
			<li><router-link to="/404">404</router-link></li>
		</ul>
	</div>
</template>