import CommonModal from "@/components/common/modal/CommonModal";
import Button from "@/components/ui/Button";
import ComboBox from "@/components/ui/ComboBox";
import SearchInput from "@/components/ui/SearchInput";
import Table from "@/components/ui/Table";
import URL from "@/constants/url";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type Newsletter = {
  id: number;
  title: string;
  createdAt: string;
  status: "draft" | "published";
};

const NewslettersList = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [tableData, setTableData] = useState<Newsletter[]>([]);

  // modal 상태
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Newsletter | null>(null);

  const options = [
    { value: "all", label: "전체 상태" },
    { value: "published", label: "발송 완료" },
    { value: "unpublished", label: "예약 발송" },
    { value: "draft", label: "임시 저장" },
  ];

  // api 호출
  const fetchData = async () => {
    try {
      const response = await fetch("/api/newsletters");
      const result = await response.json();
      setTableData(result);
    } catch (err) {
      console.error("요청 실패:", err);
    }
  };

  // 모달창 확인 버튼시 삭제 함수
  const deleteNewsletter = async () => {
    if (!selectedRow) return;
    try {
      // 뉴스레터 삭제 API 호출
      const res = await fetch(`/api/newsletters/${selectedRow.id}`, { method: "DELETE" });
      const result = await res.json();
      console.log(result.message);

      // 뉴스레터 삭제후 데이터 갱신
      setTableData((prevData) => prevData.filter((item) => item.id !== selectedRow.id));
      fetchData();

      alert("콘텐츠가 삭제되었습니다.");
    } catch (error) {
      console.error(error);
      alert("콘텐츠 삭제 중 오류가 발생했습니다.");
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
    navigate(URL.ADMIN_NEWSLETTERS_NEW);
  };

  return (
    <div className="bg-gray-100 mt-10 mb-4 ml-5 mr-5 rounded">
      <div className="p-5 flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-semibold">뉴스레터 관리</h3>
          <p className="text-gray-500">이메일로 발송되는 뉴스레터를 관리합니다</p>
        </div>
        <Button
          onClick={handleRegisterBtnClick}
          className="bg-black text-white px-8 py-3 rounded cursor-pointer hover:bg-gray-300 hover:text-black transition"
        >
          <i className="fas fa-plus mr-3"></i>새 뉴스레터 만들기
        </Button>
      </div>
      <div className="p-5 flex justify-between gap-5">
        <SearchInput value={search} onChange={setSearch} placeholder="뉴스레터 제목 검색" />
        <ComboBox value={filter} onChange={setFilter} options={options} />
      </div>
      <div className="p-5">
        <Table
          columns={[
            { key: "title", label: "뉴스레터 제목" },
            {
              key: "status",
              label: "발송 상태",
              render: (value) => {
                const statusMap: Record<string, { label: string; className: string }> = {
                  published: {
                    label: "발송 완료",
                    className: "border border-gray-300 text-black",
                  },
                  unpublished: {
                    label: "예약 발송",
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
            { key: "createdAt", label: "발송 일시" },
            {
              key: "manage",
              label: "작업",
              render: (_value, row) => {
                const isPublished = row.status === "published";

                // 수정 버튼 클릭할 때
                const handleUpdate = () => {
                  console.log("수정 버튼 클릭할 때 기능 구현 예정");
                };

                // 삭제 버튼 클릭할 때
                const handleDelete = () => {
                  setSelectedRow(row);
                  setConfirmOpen(true);
                };

                return (
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={handleUpdate}
                      disabled={isPublished}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium border border-gray-400 
                        ${
                          !isPublished
                            ? "bg-white text-black hover:bg-gray-100 cursor-pointer"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }
                        `}
                    >
                      <i className="fas fa-pencil"></i>
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={isPublished}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium border border-gray-400
                        ${
                          !isPublished
                            ? "bg-white text-black hover:bg-gray-100 cursor-pointer"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }
                        `}
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
      {/* 모달 컴포넌트 */}
      <CommonModal
        isOpen={confirmOpen}
        title="뉴스레터 삭제"
        message={"이 뉴스레터를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."}
        confirmText="삭제"
        cancelText="취소"
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          deleteNewsletter();
          setConfirmOpen(false);
        }}
      />
    </div>
  );
};

export default NewslettersList;
