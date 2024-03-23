import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				'animate-pulse rounded-full border border-emerald-500 bg-emerald-400 dark:bg-emerald-800 dark:border-emerald-600',
				className
			)}
			{...props}
		/>
	);
}

export { Skeleton };
