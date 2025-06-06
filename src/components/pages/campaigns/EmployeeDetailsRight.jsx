
import EmployeeInfo from "./EmployeeInfo";

export default function EmployeeDetailsRight({ employee }) {
    return (
      <div className="border rounded-md p-4">
        <h2 className="text-lg font-semibold border-b-1 mb-4 pb-3">Employee's Information</h2>

        <EmployeeInfo employee={employee}/>

      </div>
    );
  }
  