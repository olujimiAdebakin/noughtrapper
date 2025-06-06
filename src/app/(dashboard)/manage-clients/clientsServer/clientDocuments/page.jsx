import Document from '../../../../../components/Navigation/manage-clients/Document';

async function fetchDocuments() {
	try {
		const res = await fetch(
			' https://enm2jqkwz5.execute-api.us-east-1.amazonaws.com/dev/v1/add-cliemt',
			{
				// cache: 'force cache',
				next: { revalidate: 1800 },
			}
		);

		if (!res.ok) {
			throw new Error('Failed to fetch company documents');
		}

		return res.json();
	} catch (error) {
		console.error('couldnt fetch', error);
		return null;
	}
}

export default async function companyDocuments() {
	const initialData = await fetchDocuments();

	return (
		<>
			<div>
				<Document initialData={initialData || {}} />
			</div>
		</>
	);
}
