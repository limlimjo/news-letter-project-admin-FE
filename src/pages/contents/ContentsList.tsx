import Button from "@/components/ui/button";
import ComboBox from "@/components/ui/ComboBox";
import SearchInput from "@/components/ui/SearchInput";
import Table from "@/components/ui/Table";
import { useState } from "react";

const ContentsList = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const options = [
    { value: "all", label: "전체 상태" },
    { value: "published", label: "발행 완료" },
    { value: "unpublished", label: "예약 발행" },
    { value: "draft", label: "임시 저장" },
  ];

  return (
    <div className="bg-gray-100 mt-10 mb-4 ml-5 mr-5 rounded">
      <div className="p-5 flex justify-between items-center">
        <h3 className="text-2xl font-semibold">콘텐츠 관리</h3>
        <Button className="bg-black text-white px-8 py-3 rounded">
          <i className="fas fa-plus mr-3"></i>새 글 등록
        </Button>
      </div>
      <div className="p-5 flex">
        <SearchInput value={search} onChange={setSearch} placeholder="글 제목 및 내용 검색" />
        <ComboBox value={filter} onChange={setFilter} options={options} />
      </div>
      <div className="p-5">
        <Table columns={["글 제목", "발행 상태", "발행 일시", "작업"]} data={[]} />
      </div>
    </div>
  );
};

export default ContentsList;
