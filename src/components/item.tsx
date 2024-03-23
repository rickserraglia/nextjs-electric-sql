import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, HTMLAttributes } from 'react';

const ItemRoot = ({
	children,
	className,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<button
			className={cn(
				'group inline-flex gap-4 items-center justify-between rounded-full border border-emerald-600/50 bg-emerald-500/30 dark:bg-emerald-800/40 px-3 py-2 pl-5 transition-colors hover:border-emerald-500/40 hover:bg-emerald-200/20 hover:dark:bg-emerald-900/20 hover:dark:border-emerald-700/40 select-none font-mono text-sm',
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
};

const ItemContent = ({ children, className, ...props }: HTMLAttributes<HTMLElement>) => {
	return (
		<code className={cn('truncate', className)} {...props}>
			{children}
		</code>
	);
};

const ItemButton = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => {
	return (
		<span
			className={cn(
				'opacity-100 has-hover:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-[colors_opacity] text-emerald-700',
				className
			)}
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="12"
				height="12"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<path d="M18 6 6 18" />
				<path d="m6 6 12 12" />
			</svg>
		</span>
	);
};

export const Item = {
	Root: ItemRoot,
	Content: ItemContent,
	Button: ItemButton
};
