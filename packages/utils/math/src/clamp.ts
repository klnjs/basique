export const clamp = (value: number, lower: number, upper: number) =>
	Math.min(Math.max(value, lower), upper)
