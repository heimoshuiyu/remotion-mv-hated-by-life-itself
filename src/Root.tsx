import {Composition} from 'remotion';
import {MovingLyrics} from './MovingLyrics';

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				// You can take the "id" to render a video:
				// npx remotion render src/index.ts <id> out/video.mp4
				id="MovingLyrics"
				component={MovingLyrics}
				durationInFrames={16408}
				fps={59.94}
				width={1920}
				height={1080}
			/>
		</>
	);
};
