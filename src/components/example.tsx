'use client';

import { useEffect, useState } from 'react';

import { LIB_VERSION } from 'electric-sql/version';
import { makeElectricContext, useLiveQuery } from 'electric-sql/react';
import { genUUID, uniqueTabId } from 'electric-sql/util';
import { ElectricDatabase, electrify } from 'electric-sql/wa-sqlite';

import { authToken } from './auth';
import { Electric, Items as ItemType, schema } from '@/generated/client';
import { ExamplePlaceholder } from './example-placeholder';
import { Button } from './button';
import { Item } from './item';
import { cn } from '@/lib/utils';

const { ElectricProvider, useElectric } = makeElectricContext<Electric>();

export const Example = () => {
	const [electric, setElectric] = useState<Electric>();

	useEffect(() => {
		let isMounted = true;

		const init = async () => {
			const config = {
				debug: process.env.NODE_ENV === 'development',
				url: process.env.ELECTRIC_SERVICE
			};

			const { tabId } = uniqueTabId();
			const scopedDbName = `basic-${LIB_VERSION}-${tabId}.db`;

			const conn = await ElectricDatabase.init(scopedDbName);
			const electric = await electrify(conn, schema, config);
			await electric.connect(authToken());

			if (!isMounted) {
				return;
			}

			setElectric(electric);
		};

		init();

		return () => {
			isMounted = false;
		};
	}, []);

	if (electric === undefined) {
		return <ExamplePlaceholder />;
	}

	return (
		<ElectricProvider db={electric}>
			<ExampleComponent />
		</ElectricProvider>
	);
};

const ExampleComponent = () => {
	const { db, isConnected } = useElectric()!;
	const { results } = useLiveQuery(db.items.liveMany());

	useEffect(() => {
		const syncItems = async () => {
			// Resolves when the shape subscription has been established.
			const shape = await db.items.sync();

			// Resolves when the data has been synced into the local database.
			await shape.synced;
		};

		syncItems();
	}, []);

	const addItem = async () => {
		await db.items.create({
			data: {
				value: genUUID()
			}
		});
	};

	const removeItem = async (id: string) => {
		await db.items.delete({ where: { value: id } });
	};

	const clearItems = async () => {
		await db.items.deleteMany();
	};

	const items: ItemType[] = results ?? [];

	return (
		<div className="h-[70lvh] md:h-[50lvh] w-full max-w-md flex flex-col gap-2 text-emerald-950 dark:text-emerald-200">
			<div
				className={cn(
					'fixed left-1/2 -translate-x-1/2 top-2 text-[10px] inline-flex gap-1.5 items-center',
					{ 'animate-pulse': !isConnected }
				)}
			>
				{isConnected ? (
					<>
						<span className="w-2 h-2 bg-emerald-500 border border-emerald-500 rounded-full animate-pulse" />
						<span>connected to the database</span>
					</>
				) : (
					<>
						<span className="w-2 h-2 bg-transparent border border-dashed border-e-neutral-500 rounded-full animate-spin" />
						<span>connecting to the database</span>
					</>
				)}
			</div>

			<div className="flex flex-row items-center justify-between">
				<Button className="rounded-r-none" onClick={addItem}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth={1.5}
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<line x1="15" x2="15" y1="12" y2="18" />
						<line x1="12" x2="18" y1="15" y2="15" />
						<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
						<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
					</svg>
				</Button>
				<Button className="w-fit rounded-l-none !border-l-0" onClick={clearItems}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth={1.5}
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M3 6h18" />
						<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
						<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
						<line x1="10" x2="10" y1="11" y2="17" />
						<line x1="14" x2="14" y1="11" y2="17" />
					</svg>
				</Button>
			</div>

			<div
				tabIndex={-1}
				className="flex flex-col gap-1 overflow-auto no-scrollbar pb-12 p-2"
			>
				{items.map(({ value }: ItemType) => (
					<Item.Root key={value} onClick={() => removeItem(value)}>
						<Item.Content>{value}</Item.Content>
						<Item.Button />
					</Item.Root>
				))}
			</div>
		</div>
	);
};

export default Example;
