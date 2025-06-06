import { Card, CardBody, CardHeader } from "@nextui-org/react";

const UserInfo = ({ user }) => {
  return (
    <Card shadow className="w-full p-5">
      <CardHeader className="font-semibold text-lg border-b mb-3">
        <h4 className="mb-3">User's Information</h4>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-2 gap-4">
          <InfoRow 
            label="User ID" 
            value={user.userId}
          />
          <InfoRow label="IP Address" value={user.ipAddress} />
          <InfoRow label="IP Type" value={user.ipType} />
          <InfoRow label="User OS" value={user.os} />
          <InfoRow label="Browser Name" value={user.browser} />
          <InfoRow label="CPU Name" value={user.cpu} />
          <InfoRow label="Browser Version" value={user.browserVersion} />
          <InfoRow label="Language" value={user.language} />
          <InfoRow label="City" value={user.city} />
          <InfoRow label="Country" value={user.country} />
        </div>
      </CardBody>
    </Card>
  );
};

// Reusable row component with separate styling for label and value
const InfoRow = ({ label, value, labelClassName = "", valueClassName = "" }) => (
  <div className="flex flex-col gap-1 p-2">
    <span className={`text-sm font-semibold ${labelClassName}`}>{label}</span>
    <span className={`text-gray-900 bg-gray-100 p-2 ${valueClassName}`}>
      {value}
    </span>
  </div>
);

export default UserInfo;
