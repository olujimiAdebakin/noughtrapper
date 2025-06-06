import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { MdEmail, MdKey } from "react-icons/md";

const UserLoginInfo = ({ user }) => {
  return (
    <Card shadow className="w-full p-5">
      <CardHeader className="font-semibold text-lg border-b mb-3">
        <h4 className="mb-3">User's Login Information</h4>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col gap-4">
          <InfoRow label="Email Address" value={user.email} icon={<MdEmail className="text-red-600 mt-1" />} />
          <InfoRow label="Password" value={user.password} icon={<MdKey className="text-red-600 mt-1" />} />
        </div>
      </CardBody>
    </Card>
  );
};

// Reusable row component
const InfoRow = ({ label, value, icon }) => (
  <div className="flex flex-col gap-1 p-2">
    <span className="text-sm font-semibold flex items-center gap-2">
      {label}
    </span>
    <span className="flex gap-2 text-gray-900 bg-gray-100 p-2">{icon} {value}</span>
  </div>
);

export default UserLoginInfo;
