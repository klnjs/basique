<script lang="ts">
	import type { CoreProps } from '@klnjs/svelte-core'
	import { getSpinnerContext } from './SpinnerContext'

	type $$Props = CoreProps<SVGCircleElement>

	const context = getSpinnerContext()

	let ref: $$Props['ref']

	$:({ radius, center, width } = $context);

	export { ref }
</script>

<circle
	bind:this="{ref}"
	r={radius}
	cx={center}
	cy={center}
	fill="none"
	stroke="currentColor"
	stroke-width={width}
	{...$$restProps}
/>

