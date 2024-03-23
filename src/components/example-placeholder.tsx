import { Item } from './item';
import { Skeleton } from './skeleton';

export const ExamplePlaceholder = () => {
	return (
		<div className="h-[70lvh] md:h-[50lvh] w-full max-w-md flex flex-col gap-2 pointer-events-none">
			<div className="flex flex-row items-center justify-between">
				<Skeleton className="w-full h-11" />
			</div>

			<div className="flex flex-col gap-1 overflow-hidden no-scrollbar p-2">
				{Array.from({ length: 20 }).map((_, i) => (
					<Skeleton
						key={i}
						className="w-full h-[38px] min-h-[38px] bg-emerald-300 border-emerald-400 dark:bg-emerald-900 dark:border-emerald-700"
					/>
				))}
			</div>
		</div>
	);
};
