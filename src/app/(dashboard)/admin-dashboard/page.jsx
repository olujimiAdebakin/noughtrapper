// app/dashboard/page.jsx (or wherever Dashboard is located)
import { cookies } from "next/headers"; // Server-side cookie access
import DashboardCard from "../../../components/Navigation/DashboardCard";
import DashboardChart from "../../../components/Navigation/DashboardChart";
import DashboardOs from "../../../components/Navigation/DashboardOs";
import CampaignTable from "../../../components/Navigation/DashboardTable";
import DashboardText from "../../../components/Navigation/DashboardText";
import OverView from "../../../components/reusable/OverView";
import DashboardtableHeader from "../../../components/Navigation/DashboardtableHeader";

export default async function Dashboard() {
  const cookieStore = await cookies(); // Get cookies on server
  const email = cookieStore.get("email")?.value || null; // Read email cookie

  return (
    <div className="bg-[#F9FBFD]">
      <div className="px-4 py-4 gap-2">
        <DashboardText email={email} />
        <OverView />
        <div className="mt-4">
          <DashboardCard />
        </div>
        <div className="mt-4">
          <DashboardChart />
        </div>
        <div className="mt-4">
          <DashboardOs />
        </div>
        <div className="mt-4">
          <DashboardtableHeader />
          <CampaignTable />
        </div>
      </div>
    </div>
  );
}
