import { useStateContext } from '../../providers/contextProvider';
import { Input } from '@nextui-org/react';
import Image from 'next/image';
import { CiSearch } from 'react-icons/ci';
import { IoMdClose } from 'react-icons/io';

export default function SearchComponent() {
	const { isSearchVisible, toggleSearchBar } = useStateContext();
	return (
		<>
			<div className='flex items-center gap-3'>
				{/* Toggle between Search and Close Icon */}
				<button onClick={toggleSearchBar}>
					{isSearchVisible ? (
						<IoMdClose color='gray' size={24} />
					) : (
						<Image
							src='/search.png'
							alt='Search'
							width={24}
							height={24}
						/>
					)}
				</button>

				{/* Search Bar */}
				{isSearchVisible && (
					<div className='hidden sm:block max-w-full sm:w-[22.8rem] h-[2rem]'>
						<Input
							classNames={{
								base: 'w-full h-full',
								mainWrapper: 'h-full',
								input: 'text-sm',
								inputWrapper:
									'h-full font-normal text-default-500 bg-white border-[1px] border-gray-400 dark:bg-default-500/20',
							}}
							placeholder='Type to search...'
							size='sm'
							startContent={<CiSearch size={18} />}
							type='search'
						/>
					</div>
				)}
			</div>
		</>
	);
}
