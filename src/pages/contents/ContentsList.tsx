import Button from "@/components/ui/Button";
import ComboBox from "@/components/ui/ComboBox";
import SearchInput from "@/components/ui/SearchInput";
import Table from "@/components/ui/Table";
import URL from "@/constants/url";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type Content = {
  id: number;
  title: string;
  createdAt: string;
  status: "draft" | "published";
};

const ContentsList = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [tableData, setTableData] = useState<Content[]>([]);

  const options = [
    { value: "all", label: "전체 상태" },
    { value: "published", label: "발행 완료" },
    { value: "unpublished", label: "예약 발행" },
    { value: "draft", label: "임시 저장" },
  ];

  // api 호출
  const fetchData = async () => {
    try {
      const response = await fetch("/api/contents");
      const result = await response.json();
      setTableData(result);
    } catch (err) {
      console.error("요청 실패:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 검색 + 필터 적용
  const filteredData = tableData.filter((row) => {
    const matchesFilter = filter === "all" || row.status === filter;
    const matchesSearch = row.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // 등록 버튼 클릭할 때
  const handleRegisterBtnClick = () => {
    navigate(URL.ADMIN_CONTENTS_NEW);
  };

  return (
    <div className="bg-gray-100 mt-10 mb-4 ml-5 mr-5 rounded">
      <div className="p-5 flex justify-between items-center">
        <h3 className="text-2xl font-semibold">콘텐츠 관리</h3>
        <Button
          onClick={handleRegisterBtnClick}
          className="bg-black text-white px-8 py-3 rounded cursor-pointer hover:bg-gray-300 hover:text-black transition"
        >
          <i className="fas fa-plus mr-3"></i>새 글 등록
        </Button>
      </div>
      <div className="p-5 flex justify-between gap-5">
        <SearchInput value={search} onChange={setSearch} placeholder="글 제목 및 내용 검색" />
        <ComboBox value={filter} onChange={setFilter} options={options} />
      </div>
      <div className="p-5">
        <Table
          columns={[
            { key: "title", label: "글 제목" },
            {
              key: "status",
              label: "발행 상태",
              render: (value) => {
                const statusMap: Record<string, { label: string; className: string }> = {
                  published: {
                    label: "발행 완료",
                    className: "border border-gray-300 text-black",
                  },
                  unpublished: {
                    label: "예약 발행",
                    className: "bg-black text-white",
                  },
                  draft: {
                    label: "임시 저장",
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
            { key: "createdAt", label: "발행 일시" },
            {
              key: "manage",
              label: "작업",
              render: (_value, row) => {
                // 수정 버튼 클릭할 때
                const handleUpdate = () => {
                  console.log("수정 버튼 클릭할 때 기능 구현 예정");
                };

                // 삭제 버튼 클릭할 때
                const handleDelete = async () => {
                  if (!window.confirm(`${row.id}번째 컨텐츠를 삭제하시겠습니까?`)) return;

                  try {
                    // 콘텐츠 삭제 API 호출
                    const res = await fetch(`/api/contents/${row.id}`, { method: "DELETE" });
                    const result = await res.json();
                    console.log(result.message);

                    // 콘텐츠 삭제후 데이터 갱신
                    setTableData((prevData) => prevData.filter((item) => item.id !== row.id));
                    fetchData();

                    alert("콘텐츠가 삭제되었습니다.");
                  } catch (error) {
                    console.error(error);
                    alert("콘텐츠 삭제 중 오류가 발생했습니다.");
                  }
                };

                return (
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={handleUpdate}
                      className="px-3 py-1.5 rounded-md text-xs font-medium border border-gray-400 bg-white text-black hover:bg-gray-100 cursor-pointer"
                    >
                      <i className="fas fa-pencil"></i>
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-3 py-1.5 rounded-md text-xs font-medium border border-gray-400 bg-white text-black hover:bg-gray-100 cursor-pointer"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
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

export default ContentsList;
