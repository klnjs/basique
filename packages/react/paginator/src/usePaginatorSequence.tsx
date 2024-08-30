import { useMemo } from 'react'

export type SequenceRange = [start: number, end: number]

export const createSequence = (...ranges: SequenceRange[]) =>
	ranges.reduce<number[]>((acc, range, index, items) => {
		const [start, end] = range

		if (index > 0) {
			const previous = items[index - 1].at(-1) as number
			const gap = start - previous

			if (gap === 2) {
				acc.push(previous + 1)
			} else if (gap > 2) {
				acc.push(NaN)
			}
		}

		for (let i = start; i <= end; i++) {
			acc.push(i)
		}

		return acc
	}, [])

export const usePaginatorSequence = (...ranges: SequenceRange[]) =>
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useMemo(() => createSequence(...ranges), ranges.flat())
