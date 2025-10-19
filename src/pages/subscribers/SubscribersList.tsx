import CardBox from "@/components/ui/CardBox";
import ComboBox from "@/components/ui/ComboBox";
import SearchInput from "@/components/ui/SearchInput";
import Table from "@/components/ui/Table";
import { useState } from "react";

const SubscribersList = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const options = [
    { value: "all", label: "전체 상태" },
    { value: "subscribe", label: "구독중" },
    { value: "unsubscribe", label: "구독취소" },
    { value: "return", label: "반송" },
  ];

  return (
    <div className="bg-gray-100 mt-10 mb-4 ml-5 mr-5 rounded">
      <div className="p-5">
        <h3 className="text-2xl font-semibold">구독자 관리</h3>
      </div>
      <div className="grid grid-cols-3 gap-3 p-5">
        <CardBox className="py-[35px]">
          <div className="ml-7">
            <div className="text-gray-500">총 구독자수</div>
            <h4 className="text-2xl font-semibold text-gray-700">4</h4>
          </div>
        </CardBox>
        <CardBox className="py-[35px]">
          <div className="ml-7">
            <div className="text-gray-500">구독 취소</div>
            <h4 className="text-2xl font-semibold text-gray-700">1</h4>
          </div>
        </CardBox>
        <CardBox className="py-[35px]">
          <div className="ml-7">
            <div className="text-gray-500">반송</div>
            <h4 className="text-2xl font-semibold text-gray-700">1</h4>
          </div>
        </CardBox>
      </div>
      <div className="p-5 flex justify-between gap-5">
        <SearchInput value={search} onChange={setSearch} placeholder="이메일 주소 검색" />
        <ComboBox value={filter} onChange={setFilter} options={options} />
      </div>
      <div className="p-5">
        <Table columns={["이메일 주소", "구독일", "구독 상태", "관리"]} data={[]} />
      </div>
    </div>
  );
};

export default SubscribersList;
