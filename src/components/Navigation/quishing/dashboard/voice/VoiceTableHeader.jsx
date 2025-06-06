import SearchComponent from '../../../../reusable/SearchComponent';

export default function VoiceTableHeader() {
	return (
		<>
			<div className='flex justify-between items-center h-[60px] p-[16px] self-stretch bg-white rounded-t-lg'>
				<span className='text-[#4E4E4E] font-medium text-[16px]'>
					Recent User Data from Voice-Activated Quishing
				</span>
				<SearchComponent />
			</div>
		</>
	);
}
