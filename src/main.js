import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
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