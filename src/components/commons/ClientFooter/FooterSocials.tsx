import { Facebookcon, InstagramIcon, TwitterIcon, YoutubeIcon } from '@/assets/icons/outlined'

export const FooterSocials = () => {
	return (
		<div className='flex-ver justify-between'>
			<Facebookcon
				width={20}
				height={20}
			/>
			<TwitterIcon
				width={20}
				height={20}
			/>
			<InstagramIcon
				width={20}
				height={20}
			/>
			<YoutubeIcon
				width={20}
				height={20}
			/>
		</div>
	)
}
