<script lang="ts">
	import type { CoreProps } from '@klnjs/svelte-core'
	import { getSpinnerContext } from './SpinnerContext'

	type $$Props = CoreProps<
		SVGCircleElement,
		{
			arc?: number
			angle?: number
			easing?: string
			duration?: number
			cap?: 'butt' | 'round' | 'square'
		}
	>

	const context = getSpinnerContext()

	let ref: $$Props['ref']
	let easing: $$Props['easing']
	let arcProp = 25
	let angle = 0
	let cap: $$Props['cap'] = 'round'
	let duration = 1

	$: ({ radius, center, circumference, width } = $context)
	$: arc = (circumference * arcProp) / 100
	$: rotate = -90 + angle

	export { ref, arcProp as arc, easing, angle, cap, duration }
</script>

<circle
	bind:this="{ref}"
	r="{radius}"
	cx="{center}"
	cy="{center}"
	transform="{`rotate(${rotate} ${center} ${center})`}"
	fill="none"
	stroke="currentColor"
	stroke-width="{width}"
	stroke-linecap="{cap}"
	stroke-dasharray="{`${arc},${circumference}`}"
	{...$$restProps}
>
	<animateTransform
		attributeName="transform"
		dur="{`${duration}s`}"
		calcMode="spline"
		keySplines="{easing}"
		type="rotate"
		values="{`${rotate} ${center} ${center};${rotate + 360} ${center} ${center}`}"
		repeatCount="indefinite"
	></animateTransform>
</circle>
