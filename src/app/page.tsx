import { ExamplePlaceholder } from '@/components/example-placeholder';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const DynamicExample = dynamic(() => import('@/components/example'), {
	ssr: false,
	loading: () => <ExamplePlaceholder />
});

export default function Home() {
	return (
		<main className="container max-w-2xl mx-auto flex min-h-screen flex-col items-center justify-between gap-8 p-8 lg:p-24 !pb-0">
			<div className="flex-1 relative grid grid-cols-[1fr_50px_1fr] place-items-center before:absolute before:h-[600px] before:w-full sm:before:w-[920px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-emerald-400 before:to-transparent before:blur-3xl before:content-[''] after:absolute after:-z-20 after:h-[320px] after:w-full sm:after:w-[760px] after:left-1/2 after:-translate-x-1/2 after:bg-gradient-conic after:from-emerald-400 after:via-[#00D2A0] after:blur-3xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-emerald-600 before:dark:opacity-40 after:dark:from-emerald-900 after:dark:via-[#00D2A0] after:dark:to-emerald-600/60 after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
				<Image
					className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
					src="/next.svg"
					alt="Next.js Logo"
					width={160}
					height={30}
					priority
				/>

				<Image
					className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
					src="/plus.svg"
					alt="Plus image"
					width={24}
					height={24}
					priority
				/>

				<Image
					className="relative dark:drop-shadow-[0_0_0.4rem_#00D2A050] dark:invert"
					src="/electric-sql.svg"
					alt="Electric SQL Logo"
					width={220}
					height={45}
					priority
				/>
			</div>

			<DynamicExample />
		</main>
	);
}
