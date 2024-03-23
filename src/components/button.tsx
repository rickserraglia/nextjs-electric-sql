import { cn } from '@/lib/utils';
import { type ButtonHTMLAttributes } from 'react';

export const Button = ({
	children,
	className,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<button
			className={cn(
				'w-full inline-flex items-center justify-center select-none border border-emerald-600/70 backdrop-blur-2xl dark:border-emerald-600 rounded-full bg-emerald-500/70 h-11 px-8 py-2 dark:bg-emerald-700/60 hover:border-emerald-500 hover:bg-emerald-600/30 hover:dark:border-emerald-700/60 hover:dark:bg-emerald-800/60 transition-colors',
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
};
