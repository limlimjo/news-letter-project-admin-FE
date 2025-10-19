import CardBox from "@/components/ui/CardBox";

const DashboardList = () => {
  return (
    <div className="bg-gray-100 mt-10 mb-4 ml-5 mr-5 rounded">
      <div className="p-5">
        <h3 className="text-2xl font-semibold">통계 대시보드</h3>
      </div>
      <div className="grid grid-cols-2 gap-3 px-5 mb-5">
        <CardBox className="py-[20px]">
          <div className="ml-7">
            <div className="flex justify-between">
              <div className="text-gray-500">총 발송 이메일</div>
              <i className="fas fa-envelope mr-4.5"></i>
            </div>
            <div className="flex flex-col gap-2 mt-10">
              <h4 className="text-2xl font-semibold text-gray-700">1,234</h4>
              <p className="text-gray-400">이번 달</p>
            </div>
          </div>
        </CardBox>
        <CardBox className="py-[20px]">
          <div className="ml-7">
            <div className="flex justify-between">
              <div className="text-gray-500">평균 오픈율</div>
              <i className="fas fa-arrow-trend-up mr-4.5"></i>
            </div>
            <div className="flex flex-col gap-2 mt-10">
              <h4 className="text-2xl font-semibold text-gray-700">42.5%</h4>
              <p className="text-gray-400">전월 대비 +5.2%</p>
            </div>
          </div>
        </CardBox>
      </div>
      <div className="grid grid-cols-2 gap-3 px-5 mb-5">
        <CardBox className="py-[20px]">
          <div className="ml-7">
            <div className="flex justify-between">
              <div className="text-gray-500">평균 클릭률</div>
              <i className="fas fa-chart-column mr-4.5"></i>
            </div>
            <div className="flex flex-col gap-2 mt-10">
              <h4 className="text-2xl font-semibold text-gray-700">18.3%</h4>
              <p className="text-gray-400">전월 대비 +2.1%</p>
            </div>
          </div>
        </CardBox>
        <CardBox className="py-[20px]">
          <div className="ml-7">
            <div className="flex justify-between">
              <div className="text-gray-500">활성 구독자</div>
              <i className="fas fa-users mr-4.5"></i>
            </div>
            <div className="flex flex-col gap-2 mt-10">
              <h4 className="text-2xl font-semibold text-gray-700">856</h4>
              <p className="text-gray-400">전체 구독자의 69%</p>
            </div>
          </div>
        </CardBox>
      </div>
      <div className="grid grid-cols-1 px-5 pb-5">
        <CardBox className="py-[20px]">
          <div className="ml-7">
            <div className="text-gray-700 mb-7">SendGrid 연동 정보</div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between mr-7">
                <p className="text-gray-400">API 상태</p>
                <p className="text-green-500">연결됨</p>
              </div>
              <div className="flex justify-between mr-7">
                <p className="text-gray-400">마지막 동기화</p>
                <p>2024-10-14 09:23:15</p>
              </div>
              <div className="flex justify-between mr-7">
                <p className="text-gray-400">이번 달 발송량</p>
                <p>1,234 / 10,000</p>
              </div>
            </div>
          </div>
        </CardBox>
      </div>
    </div>
  );
};

export default DashboardList;
