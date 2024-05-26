import { ScrollTrigger } from './gsap/ScrollTrigger.min.js';
import { ScrollSmoother } from './gsap/ScrollSmoother.min.js';
import { gsap } from './gsap/gsap.min.js';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function animateScroll() {
	let blinds__itemLeft = gsap.utils.toArray('.blinds__item.left')
	let blinds__itemRight = gsap.utils.toArray('.blinds__item.right')
	let itemsR = gsap.utils.toArray('.works__right .works__item')
	let itemsL = gsap.utils.toArray('.works__left .works__item')
	// console.log(itemsL, itemsR);

	ScrollSmoother.create({
		wrapper: '.main-wrapper',
		content: '.content',
		smooth: 0.75,
		effects: true,
	})

	blinds__itemLeft.forEach(item => {
		gsap.fromTo(item, { x: 0 }, {
			x: -250,
			scrollTrigger: {
				trigger: item,
				start: '-900',
				end: '0',
				scrub: true,
				/*markers: true*/
			}
		})
		gsap.fromTo(item, { x: -250 }, {
			x: 0,
			scrollTrigger: {
				trigger: item,
				start: '100',
				end: '550', // 650
				scrub: true,

			}
		})
	})
	blinds__itemRight.forEach(item => {
		gsap.fromTo(item, { x: 0 }, {
			x: 250,
			scrollTrigger: {
				trigger: item,
				start: '-900',
				end: '0',
				scrub: true
			}
		})
		gsap.fromTo(item, { x: 250 }, {
			x: 0,
			scrollTrigger: {
				trigger: item,
				start: '100',
				end: '550', // 650
				scrub: true
			}
		})
	})

	itemsL.forEach(item => {
		gsap.fromTo(item, { opacity: 0, x: -100, y: -150 }, {
			opacity: 1, x: 0, y: 0,
			scrollTrigger: {
				trigger: item,
				start: '-950',
				end: '-200',
				scrub: true
			}
		})
		gsap.fromTo(item, { opacity: 1, x: 0, y: 0 }, {
			opacity: 0, x: -100, y: -150,
			scrollTrigger: {
				trigger: item,
				start: '100',
				end: '600',
				scrub: true
			}
		})
	})
	itemsR.forEach(item => {
		gsap.fromTo(item, { opacity: 0, x: 100, y: 150 }, {
			opacity: 1, x: 0, y: 0,
			scrollTrigger: {
				trigger: item,
				start: '-1050', //-850
				end: '-100', //-100
				scrub: true
			}
		})
		gsap.fromTo(item, { opacity: 1, x: 0, y: 0 }, {
			opacity: 0, x: 100, y: 150,
			scrollTrigger: {
				trigger: item,
				start: '0', // 200
				end: '750', // 850
				scrub: true
			}
		})
	})
}
