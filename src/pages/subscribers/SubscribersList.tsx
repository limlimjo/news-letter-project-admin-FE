import CardBox from "@/components/ui/CardBox";
import ComboBox from "@/components/ui/ComboBox";
import SearchInput from "@/components/ui/SearchInput";
import Table from "@/components/ui/Table";
import { useEffect, useState } from "react";

type Subscriber = {
  id: number;
  email: string;
  subscribedAt: string;
  status: "subscribed" | "unsubscribed" | "return";
};

const SubscribersList = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [tableData, setTableData] = useState<Subscriber[]>([]);

  const options = [
    { value: "all", label: "전체 상태" },
    { value: "subscribed", label: "구독중" },
    { value: "unsubscribed", label: "구독취소" },
    { value: "return", label: "반송" },
  ];

  // api 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/subscribers");
        const result = await response.json();
        setTableData(result);
      } catch (err) {
        console.error("요청 실패:", err);
      }
    };

    fetchData();
  }, []);

  // 검색 + 필터 적용
  const filteredData = tableData.filter((row) => {
    const matchesFilter = filter === "all" || row.status === filter;
    const matchesSearch = row.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // 상태별 카운트
  const subscribedCount = tableData.filter((row) => row.status === "subscribed").length;
  const unsubscribedCount = tableData.filter((row) => row.status === "unsubscribed").length;
  const returnedCount = tableData.filter((row) => row.status === "return").length;

  return (
    <div className="bg-gray-100 mt-10 mb-4 ml-5 mr-5 rounded">
      <div className="p-5">
        <h3 className="text-2xl font-semibold">구독자 관리</h3>
      </div>
      <div className="grid grid-cols-3 gap-3 p-5">
        <CardBox className="py-[35px]">
          <div className="ml-7">
            <div className="text-gray-500">총 구독자수</div>
            <h4 className="text-2xl font-semibold text-gray-700">{subscribedCount}</h4>
          </div>
        </CardBox>
        <CardBox className="py-[35px]">
          <div className="ml-7">
            <div className="text-gray-500">구독 취소</div>
            <h4 className="text-2xl font-semibold text-gray-700">{unsubscribedCount}</h4>
          </div>
        </CardBox>
        <CardBox className="py-[35px]">
          <div className="ml-7">
            <div className="text-gray-500">반송</div>
            <h4 className="text-2xl font-semibold text-gray-700">{returnedCount}</h4>
          </div>
        </CardBox>
      </div>
      <div className="p-5 flex justify-between gap-5">
        <SearchInput value={search} onChange={setSearch} placeholder="이메일 주소 검색" />
        <ComboBox value={filter} onChange={setFilter} options={options} />
      </div>
      <div className="p-5">
        <Table
          columns={[
            { key: "email", label: "이메일 주소" },
            { key: "subscribedAt", label: "구독일" },
            {
              key: "status",
              label: "구독 상태",
              render: (value) => {
                const statusMap: Record<string, { label: string; className: string }> = {
                  subscribed: {
                    label: "구독 중",
                    className: "bg-black text-white",
                  },
                  return: {
                    label: "반송",
                    className: "bg-red-700 text-white",
                  },
                  unsubscribed: {
                    label: "구독 취소",
                    className: "bg-gray-200 text-black",
                  },
                };

                const status = statusMap[value] || {
                  label: "알 수 없음",
                  className: "bg-orange-100 text-black",
                };

                return (
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${status.className}`}>{status.label}</span>
                );
              },
            },
            {
              key: "manage",
              label: "관리",
              render: (value, row) => {
                const isSubscribed = row.status === "subscribed";

                const handleUnsubscribe = async () => {
                  if (!window.confirm(`${row.email}님의 구독을 취소하시겠습니까?`)) return;

                  try {
                    // 구독 취소 API 호출
                    const res = await fetch(`/api/subscribers/${row.id}`, { method: "DELETE" });
                    const result = await res.json();
                    console.log(result.message);

                    // 구독 상태 변경
                    setTableData((prev) =>
                      prev.map((item) => (item.id === row.id ? { ...item, status: "unsubscribed" } : item))
                    );

                    alert("구독이 취소되었습니다.");
                  } catch (error) {
                    console.error(error);
                    alert("구독 취소 중 오류가 발생했습니다.");
                  }
                };

                return (
                  <button
                    onClick={handleUnsubscribe}
                    disabled={!isSubscribed}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium border border-gray-400
          ${
            isSubscribed
              ? "bg-white text-black hover:bg-gray-100 cursor-pointer"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }
        `}
                  >
                    <i className="fas fa-user-xmark"></i>
                  </button>
                );
              },
            },
          ]}
          data={filteredData}
        />
      </div>
    </div>
  );
};

export default SubscribersList;
