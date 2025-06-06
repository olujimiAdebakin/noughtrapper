
// // export default function Content({ router }) {
// //   const searchParams = useSearchParams();
// //   const showForm = searchParams.get("AddClients") === "true";

// //   const [clients, setClients] = useState(null);

// //   useEffect(() => {

// //     setClients([]);
// //   }, []);

// //   if (showForm) {
// //     return <ClientsForm />;
// //   }

// //   return (
// //     <div className="pt-[24px] px-[16px] bg-[#F9FBFD] h-screen">
// //       <div className="flex justify-between items-center">
// //         <div>
// //           <h1 className="text-[#384554] text-[18px] font-semibold w-[521px]">
// //             Partnered Companies Overview
// //           </h1>
// //           <span className="text-[#48596D] text-[13px] font-normal mt-[5px]">
// //             Track and manage companies collaborating with us to enhance
// //             cybersecurity awareness and resilience.
// //           </span>
// //         </div>
// //         {/* <buton
// //           href={"/"}
// //           className="flex h-[40px] py-[10px] px-[16px] justify-center items-center bg-[#FD3842] rounded-md gap-[4px] text-[#fff] text-[16px] font-medium"
// //           onClick={() => router.push("?AddClients=true")}
// //         >
// //           Create Clients
// //         </buton> */}

// //         <ClientsModal/>

// //       </div>
// //       <ManageHeader />
// //       <div className="mt-12">
// //         {clients === null ? (
// //           <p className="text-[#48596D] text-[14px] font-medium text-center">
// //             Loading...
// //           </p>
// //         ) : clients.length === 0 ? (
// //           <div>
// //             <DummClient />

// //           </div>
// //         ) : (
// //           <ClientsTable />
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import ClientsCard from "@/components/Navigation/manage-clients/ClientsCard";
// import ClientsForm from "@/components/Navigation/manage-clients/ClientsForm";
// import ClientsTable from "@/components/Navigation/manage-clients/ClientsTable";
// import DummClient from "@/components/Navigation/manage-clients/DummClient";
// import ManageHeader from "@/components/Navigation/manage-clients/ManageHeader";
// import ClientsModal from "@/components/reusable/ClientsModal";
// import dotenv from "dotenv";
// dotenv.config({ path: ".env.local" });

// async function fetchClients() {
//   const baseUrl = process.env.API_GATEWAY_URL || "URL_NOT_SET";
//   const endpoint = "/v1/list-clients";
//   const fullUrl = `${baseUrl}${endpoint}`;
//   console.log("Fetching from:", fullUrl);

//   try {
//     const response = await fetch(fullUrl, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         cache: "no-cache",
//       },
//     });

//     console.log("Response status:", response.status, response.statusText);

//     if (!response.ok) {
//       const errorText = await response.text(); // Capture the raw response body
//       throw new Error(
//         `Failed to fetch clients: ${response.status} ${response.statusText} - ${errorText}`
//       );
//     }

//     const result = await response.json();
//     console.log("API response:", result);
//     return result.data || [];
//   } catch (error) {
//     console.error("Error fetching clients:", error.message);
//     return {
//       error: `Unable to retrieve client data: ${error.message}`,
//       data: [],
//     };
//   }
// }

// // Main content component
// function Content() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const showForm = searchParams.get("AddClients") === "true";
//   const [clients, setClients] = useState(null);

//   useEffect(() => {

//     setClients([]);
//   }, []);

//   if (showForm) {
//     return <ClientsForm />;
//   }

//   const clientsData = await fetchClients();
//   const error = clientsData.error || null;
//   const clients = error
//     ? []
//     : (clientsData.data || clientsData).filter(
//         (client) => client && client.clientId && client.clientName
//       );

//   console.log("Filtered clients:", clients);

//   return (
//     <div className="pt-[24px] px-[16px] bg-[#F9FBFD] h-screen">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-[#384554] text-[18px] font-semibold w-[521px]">
//             Partnered Companies Overview
//           </h1>
//           <span className="text-[#48596D] text-[13px] font-normal mt-[5px]">
//             Track and manage companies collaborating with us to enhance
//             cybersecurity awareness and resilience.
//           </span>
//         </div>
//         <ClientsModal />
//       </div>
//       <ManageHeader />
//       <div className="mt-12">
//         {error ? (
//           <p className="text-red-500 text-[14px] font-medium text-center">
//             {error}
//           </p>
//         ) : clients.length === 0 ? (
//           <DummClient />
//         ) : (
//           <ClientsTable clients={clients} />
//         )}
//       </div>
//     </div>
//   );
// }


// app/manage-clients/page.jsx
// No "use client" - this is a Server Component by default
import ClientsForm from '../../../components/Navigation/manage-clients/ClientsForm';
import ClientsTable from '../../../components/Navigation/manage-clients/ClientsTable';
import DummClient from '../../../components/Navigation/manage-clients/DummClient';
import ManageHeader from '../../../components/Navigation/manage-clients/ManageHeader';
import ClientsModal from '../../../components/reusable/ClientsModal';

async function fetchClients() {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;
	const endpoint =`/v1/list-clients`;

	try {
		const response = await fetch(`${baseUrl}${endpoint}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
                'api-key': process.env.API_KEY
			},
		});

		if (!response.ok) {
			throw new Error('Failed to fetch clients');
		}

		const result = await response.json();
		return result.data || [];
	} catch (error) {
		console.error('Error fetching clients:', error);
		return { error: 'Unable to retrieve client data', data: [] };
	}
}

// Server Component
export default async function ManageClientsPage({ searchParams }) {
	const params = await searchParams;
	const showForm = params?.AddClients === 'true';

	if (showForm) {
		return <ClientsForm />;
	}
	//    const clientsData = await fetchClients();
	// const error = clientsData.error || null;
	// //  const clientsData = await fetchClients();
	//  const clients = (clientsData.data || clientsData).filter(
	//    (client) => client && client.clientId && client.clientName
	//  );

	const clientsData = await fetchClients();

	// Check if there's an error in the response
	const error = clientsData.error || null;
	const clients = error
		? []
		: (clientsData.data || clientsData).filter(
				(client) => client && client.clientId && client.clientName
		  );

	console.log('Filtered clients:', clients);

	return (
		<div className='pt-[24px] px-[16px] bg-[#F9FBFD] h-screen'>
			<div className='flex justify-between items-center'>
				<div>
					<h1 className='text-[#384554] text-[18px] font-semibold w-[521px]'>
						Partnered Companies Overview
					</h1>
					<span className='text-[#48596D] text-[13px] font-normal mt-[5px]'>
						Track and manage companies collaborating with us to
						enhance cybersecurity awareness and resilience.
					</span>
				</div>
				<ClientsModal />
			</div>
			<ManageHeader />
			<div className='mt-12'>
				{error ? (
					<p className='text-red-500 text-[14px] font-medium text-center'>
						{error}
					</p>
				) : clients.length === 0 ? (
					<DummClient />
				) : (
					<ClientsTable clients={clients} />
				)}
			</div>
		</div>
	);
}
