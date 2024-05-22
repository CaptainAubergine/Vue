import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import MainPage from './pages/MainPage.vue';
import EmployeeList from './pages/EmployeeList.vue';
import AddEmployee from './pages/AddEmployee.vue';
import FiredEmployees from './pages/FiredEmployees.vue';
import NotFound from './pages/NotFound.vue';
import { employees } from './js/employees.js'

Vue.config.productionTip = false
Vue.use(VueRouter);

const routes = [
	{ path: '/', component: MainPage },
	{ path: '/employee-list', component: EmployeeList, props: { employees: employees, fired: false } },
	{ path: '/add-employee', component: AddEmployee, props: { employees: employees } },
	{ path: '/fired-employees', component: FiredEmployees, props: { employees: employees, fired: true } },
	{ path: '/404', component: NotFound },
	{ path: '*', redirect: '/404' },
];

const router = new VueRouter({
	routes,
});

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