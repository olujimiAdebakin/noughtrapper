import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { MdLocationOn } from "react-icons/md";

const UserGeoInfo = ({ user }) => {
  return (
    <Card shadow className="w-full p-5">
      <CardHeader className="font-semibold text-lg border-b mb-3">
        <h4 className="mb-3">User's Geo-Location Information</h4>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-4">
          <InfoRow label="Longitude" value={user.longitude} icon={<MdLocationOn className="text-gray-600" />} />
          <InfoRow label="Latitude" value={user.latitude} icon={<MdLocationOn className="text-gray-600" />} />
        </div>
      </CardBody>
    </Card>
  );
};

// Reusable row component
const InfoRow = ({ label, value, icon }) => (
  <div className="flex flex-col gap-1 p-2">
    <span className="text-sm font-semibold flex items-center gap-2">
      {icon} {label}
    </span>
    <span className="text-gray-900 bg-gray-100 p-2">{value}</span>
  </div>
);

export default UserGeoInfo;
