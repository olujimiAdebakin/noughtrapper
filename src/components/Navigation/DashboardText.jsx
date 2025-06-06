

    const extractNameFromEmail = (email) => {
      const username = email?.split("@")[0];
      const namePart = username?.split(/[._]/)[0];
      return namePart
        ? namePart.charAt(0).toUpperCase() + namePart.slice(1).toLowerCase()
        : "User";
};
    
export default function DashboardText({email}){



  const displayName = extractNameFromEmail(email);
  
    return (
      <div className="flex flex-col gap-2">
        <h2 className="text-[18px] font-bold self-stretch text-[#2B3540] tracking-[0.5px]">
          Good Morning, {displayName}! Here’s today’s summary.
        </h2>
        <span className="text-[#5F6D7E] self-stretch text-[13px] font-normal">
          Quick insights into system performance and daily activity.
        </span>
      </div>
    );
}