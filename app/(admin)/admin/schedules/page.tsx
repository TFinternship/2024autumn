import { getSchedulesWithStudentAndFacilityAndSchool } from "@/lib/schedules";
import React from "react";
import DataTableSection from "./_components/data-table-section";

type Props = {};

const AdminSchedulePage = async (props: Props) => {
  const schedules = await getSchedulesWithStudentAndFacilityAndSchool();

  return (
    <div>
      <h1 className="text-[20px] font-bold text-[#000] bg-[#F4F4F4] border-[#E0E0E0] border-[1px] rounded-lg p-4 mb-[40px]">
        予定管理
      </h1>

      <DataTableSection schedules={schedules} />
    </div>
  );
};

export default AdminSchedulePage;
