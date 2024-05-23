import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import MainPage from './pages/MainPage.vue';
import EmployeeList from './pages/EmployeeList.vue';
import EmployeePage from './pages/EmployeePage.vue';
import AddEmployee from './pages/AddEmployee.vue';
import FiredEmployees from './pages/FiredEmployees.vue';
import NotFound from './pages/NotFound.vue';
import { employees } from './js/employees.js'

Vue.config.productionTip = false
Vue.use(VueRouter);

const routes = [
	{ path: '/', component: MainPage },
	// { path: '/employee-page/:selectedEmployeeIndex', name: 'EmployeePage', component: EmployeePage, props: (route) => ({ employee: employees[parseInt(route.params.selectedEmployeeIndex)] }), },
	{ path: '/employee-page/:selectedEmployeeIndex', name: 'EmployeePage', component: EmployeePage, props: (route) => ({ employeeIndex: parseInt(route.params.selectedEmployeeIndex), employees: employees }) },
	{ path: '/employee-list', name: 'EmployeeList', component: EmployeeList, props: { employees: employees, fired: false } },
	{ path: '/add-employee', component: AddEmployee, props: { employees: employees } },
	{ path: '/fired-employees', component: FiredEmployees, props: { employees: employees, fired: true } },
	{ path: '/404', component: NotFound },
	{ path: '*', redirect: '/404' },
];

const router = new VueRouter({
	routes,
});

Vue.filter('formatDate', function (value) {
	const date = new Date(value * 1000)
	return (date.toLocaleDateString('ru-RU') != "Invalid Date"
		? date.toLocaleDateString('ru-RU') :
		new Date(value).toLocaleDateString('ru-RU'))
})

new Vue({
	router,
	computed: {
		employees: function () {
			return employees;
		},
	},
	render: h => h(App),
}).$mount('#app')

const html = document.querySelector('.vars');

document.addEventListener('DOMContentLoaded', () => {
	html.style.setProperty('--windowWidth', (window.innerWidth + 'px'));
})

function onResize() {
	html.style.setProperty('--windowWidth', (window.innerWidth + 'px'));
}
window.onresize = onResize;