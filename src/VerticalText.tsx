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
	const currentEndIndex = ~~(
		(textArray.length * (current - from)) /
		(to - from)
	);
	const r = random(current - (current % 2));
	const opacity = interpolate(current, [from, from + 8], [0, 1]);
	return (
		<AbsoluteFill>
			<Sequence
				name={textArray.slice(0, 6).join('')}
				from={from}
				durationInFrames={disappear ? disappear - from : 4096}
				style={{
					opacity,
					top: `${1080 - y}px`,
					left: x,
					letterSpacing: '0.2em',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-end',
					width: 'min-content',
					fontSize: `${fontSize}px`,
					writingMode: 'vertical-lr',
					overflow: 'hidden',
				}}
			>
				{textArray.slice(0, currentEndIndex).join('')}
				{currentEndIndex < text.length && textArray[~~(r * textArray.length)]}
			</Sequence>
		</AbsoluteFill>
	);
};

export default VerticalText;
