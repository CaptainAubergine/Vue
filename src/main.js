import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import MainPage from './pages/MainPage.vue';
import EmployeeList from './pages/EmployeeList.vue';
import EmployeePage from './pages/EmployeePage.vue';
import AddEmployee from './pages/AddEmployee.vue';
import NotFound from './pages/NotFound.vue';
import MedexamPage from './pages/MedexamPage.vue'
import MedexamList from './pages/MedexamList.vue'

Vue.config.productionTip = false
Vue.use(VueRouter);

Vue.filter('formatDate', function (value) {
	const date = new Date(value * 1000)
	return (date.toLocaleDateString('ru-RU') != "Invalid Date"
		? date.toLocaleDateString('ru-RU') :
		new Date(value).toLocaleDateString('ru-RU'))
})

const routes = [
	{ path: '/', name: 'MainPage', component: MainPage },
	{ path: '/employee-page/:id', name: 'EmployeePage', component: EmployeePage, props: (route) => ({ id: parseInt(route.params.id) }) },
	{ path: '/employee-list', name: 'EmployeeList', component: EmployeeList, props: { fired: false } },
	{ path: '/add-employee', name: 'AddEmployee', component: AddEmployee },
	{ path: '/fired-employees', name: 'FiredEmployees', component: { ...EmployeeList }, props: { fired: true } },
	{ path: '/medexam-page', name: 'MedexamPage', component: MedexamPage, props: (route) => ({ idMedexam: parseInt(route.params.idMedexam), idEmployee: parseInt(route.params.idEmployee) }) },
	{ path: '/medexam-list', name: 'MedexamList', component: MedexamList },
	{ path: '/404', name: 'NotFound', component: NotFound },
	{ path: '*', redirect: '/404' },
];

const router = new VueRouter({
	routes,
});

new Vue({
	router,
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