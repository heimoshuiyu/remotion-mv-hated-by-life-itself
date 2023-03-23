import {staticFile, Audio, Img} from 'remotion';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import VerticalText from './VerticalText';

import lyrics from './lyrics';

export const MovingLyrics: React.FC = () => {
	const current = useCurrentFrame();
	const beginMoveFrame = 2374;
	const moveSpeed = 0.7;
	const moveShift = (current - beginMoveFrame) * moveSpeed;

	// A <AbsoluteFill> is just a absolutely positioned <div>!
	return (
		<AbsoluteFill>
			<Sequence name="background">
				<Img src={staticFile('bg.jpg')} />
			</Sequence>
			<Sequence>
				{lyrics.map((lyric) => (
					<VerticalText
						text={lyric.content}
						from={lyric.from}
						to={lyric.to}
						x={lyric.x}
						y={
							current < beginMoveFrame
								? lyric.y
								: lyric.y +
								  moveShift -
								  (lyric.from < beginMoveFrame
										? 0
										: (lyric.from - beginMoveFrame) * moveSpeed)
						}
						fontSize={lyric.fontSize}
						disappear={lyric.disappear}
					/>
				))}
			</Sequence>
			<Audio src={staticFile('music.webm')} />
		</AbsoluteFill>
	);
};
