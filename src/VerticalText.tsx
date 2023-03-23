import React from 'react';
import {
	AbsoluteFill,
	random,
	Sequence,
	useCurrentFrame,
	interpolate,
} from 'remotion';

type Props = {
	text: string;
	fontSize?: number;
	from: number;
	to: number;
	x: number;
	y: number;
	disappear?: number;
};

const VerticalText: React.FC<Props> = ({
	text,
	fontSize = 39,
	from,
	to,
	x,
	y,
	disappear,
}) => {
	const current = useCurrentFrame();
	const textArray = Array.from(text);
	const currentEndIndex = interpolate(
		current,
		[from, to],
		[0, textArray.length]
	);
	const r = random(current - (current % 3));
	const duration = to - from;
	const opacities = textArray.map((_, i) =>
		interpolate(
			current,
			[
				from + (i * duration) / textArray.length,
				from + ((i + 1) * duration) / textArray.length,
			],
			[0, 1]
		)
	);
	return (
		<AbsoluteFill>
			<Sequence
				name={textArray.slice(0, 6).join('')}
				from={from}
				durationInFrames={disappear ? disappear - from : 4096}
				style={{
					top: `${1080 - y}px`,
					left: x,
					width: 'min-content',
					height: 'min-content',
					display: 'flex',
					flexDirection: 'row',
					writingMode: 'vertical-lr',
					fontSize: `${fontSize}px`,
					overflow: 'hidden',
				}}
			>
				{textArray.slice(0, currentEndIndex).map((char, index) => (
					<div
						style={{
							width: 'min-content',
							height: 'min-content',
							letterSpacing: '0.2em',
							margin: 0,
						}}
					>
						{char}
					</div>
				))}
				{currentEndIndex < textArray.length && (
					<div
						style={{
							opacity: opacities[~~currentEndIndex],
						}}
					>
						{textArray[~~(r * textArray.length)]}
					</div>
				)}
			</Sequence>
		</AbsoluteFill>
	);
};

export default VerticalText;
