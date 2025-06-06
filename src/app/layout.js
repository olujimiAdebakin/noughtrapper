import { IBM_Plex_Sans } from 'next/font/google';
import './globals.css';
import { NextUI } from '../providers/NextUI';
import { ContextProvider } from '../providers/contextProvider';
import { Providers } from './provider';
import { Toaster } from 'react-hot-toast';
// import { Providers } from './provider';

const ibmPlexSans = IBM_Plex_Sans({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
});
export const metadata = {
	title: 'Noughtaegis',
	icons: '/nought.png',
	description:
		'Noughtaegis is a leading cybersecurity and managed IT services provider, specializing in securing your digital infrastructure and supporting business growth with advanced technology solutions.',
	keywords:
		'cybersecurity, managed IT services, business technology solutions, IT support, Noughtaegis, noughtaegis',
	metadataBase: new URL('https://www.noughtaegis.com'),

	openGraph: {
		type: 'website',
		locale: 'en_US',
		title: 'Noughtaegis',
		description:
			'Noughtaegis provides expert cybersecurity and managed IT services to protect your digital infrastructure.',
		url: '/',
		siteName: 'noughtaegis',
		images: [
			{
				url: '/nought.png',
				width: 1200,
				height: 630,
				alt: 'Noughtaegis Cybersecurity and IT Services',
			},
		],
	},

	twitter: {
		card: 'summary_large_image',
		site: '@noughtaegis',
		creator: '@noughtaegis',
		title: 'Noughtaegis',
		description:
			'Expert cybersecurity and IT services to secure your digital future with Noughtaegis.',
		images: ['/nought.png'],
	},

	robots: {
		index: true,
		follow: true,
	},

	verification: {
		google: 'your-google-verification-code',
	},
};

export const viewport = 'width=device-width, initial-scale=1';

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={`${ibmPlexSans.className} antialiased`}>
				<NextUI>
					<ContextProvider>
						<Providers>
							<Toaster
								position='top-right'
								reverseOrder={false}
								toastOptions={{
									duration: 6000,
									style: {
										borderRadius: '8px',
										background: '#333',
										color: '#fff',
									},
								}}
							/>
							{children}
						</Providers>
					</ContextProvider>
				</NextUI>
			</body>
		</html>
	);
}
