import React from "react";
import { BarChartInteractive } from "./_components/bar-chart-interactive";
import { getSchedulesInRecentThreeMonths } from "@/lib/schedules";
import { ChartConfig } from "@/components/ui/chart";
import { BarChartStackedLegend } from "./_components/bar-chart-stacked-legend";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Schedule = {
  id: string;
  studentId: string;
  start: Date;
  end: Date;
  meal: boolean;
  attendance: boolean;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type ScheduleCountByDate = {
  date: string;
  count: number;
  presentCount: number;
  absentCount: number;
};

type TotalCount = {
  count: number;
  presentCount: number;
  absentCount: number;
};

type Props = {};

const AdminCustomerPage = async (props: Props) => {
  const fn1 = (arg: Schedule[]): ScheduleCountByDate[] => {
    return [
      {
        date: "2022-01-01",
        count: 0,
        presentCount: 0,
        absentCount: 0,
      },
    ];
  };

  const fn2 = (arg: ScheduleCountByDate[]): TotalCount => {
    return {
      count: 0,
      presentCount: 0,
      absentCount: 0,
    };
  };

  const schedules = await getSchedulesInRecentThreeMonths();
  const scheduleCountByDate = fn1(schedules);
  const total = fn2(scheduleCountByDate);

  return (
    <div>
      <h1 className="text-[20px] font-bold text-[#000] bg-[#F4F4F4] border-[#E0E0E0] border-[1px] rounded-lg p-4 mb-[40px]">
        メトリクス
      </h1>

      <Tabs defaultValue="scheduleCount">
        <TabsList>
          <TabsTrigger value="scheduleCount">予定の数</TabsTrigger>
          <TabsTrigger value="attendanceCount">出欠の数</TabsTrigger>
        </TabsList>
        <TabsContent value="scheduleCount">
          <BarChartInteractive
            title="日毎の予定の数"
            description="直近3ヶ月の予定の数を表示しています。"
            data={scheduleCountByDate}
            total={total}
            config={
              {
                count: {
                  label: "予定の数",
                  color: "hsl(var(--chart-1))",
                },
              } satisfies ChartConfig
            }
          />
        </TabsContent>
        <TabsContent value="attendanceCount">
          <BarChartStackedLegend
            title="日毎の出欠の数"
            description="直近3ヶ月の出欠の数を表示しています。"
            data={scheduleCountByDate}
            total={total}
            config={
              {
                presentCount: {
                  label: "出席の数",
                  color: "hsl(var(--chart-2))",
                },
                absentCount: {
                  label: "欠席の数",
                  color: "hsl(var(--chart-3))",
                },
              } satisfies ChartConfig
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminCustomerPage;
