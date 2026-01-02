import CommonModal from "@/components/common/modal/CommonModal";
import Button from "@/components/ui/Button";
import ComboBox from "@/components/ui/ComboBox";
import Pagination from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";
import Table from "@/components/ui/Table";
import URL from "@/constants/url";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type Content = {
  postId: number;
  title: string;
  publishedAt: string;
  statusBcode: "PUBLISHED" | "DRAFT";
};

type PaginationInfo = {
  currentPageNo: number;
  pageSize: number;
  totalRecordCount: number;
  recordCountPerPage: number;
};

const ContentsList = () => {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [page, setPage] = useState(0);
  const [tableData, setTableData] = useState<Content[]>([]);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    currentPageNo: 1,
    pageSize: 10,
    totalRecordCount: 0,
    recordCountPerPage: 0,
  });

  // modal 상태
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Content | null>(null);

  const options = [
    { value: "ALL", label: "전체 상태" },
    { value: "PUBLISHED", label: "발행 완료" },
    { value: "DRAFT", label: "임시 저장" },
  ];

  // 검색 api 호출
  const fetchData = async () => {
    try {
      const params = new URLSearchParams({
        title: search || "",
        statusBcode: filter || "",
        page: String(page),
        size: "5",
      });

      const res = await fetch(`/api/api/v1/admin/post/list?${params.toString()}`,  {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();

        setTableData(data.items);
        setPaginationInfo({
          currentPageNo: data.page + 1,
          pageSize: 5,
          totalRecordCount: data.totalElements,
          recordCountPerPage: data.size,
        });
      } else {
        alert("웹 콘텐츠 정보 조회에 실패했습니다.");
        return false;
      }

    } catch (err) {
      console.error("요청 실패:", err);
      alert("웹 콘텐츠 정보 조회 중 오류가 발생했습니다.");
    }
  };

  // 모달창 확인 버튼시 삭제 함수
  const deleteContent = async () => {
    if (!selectedRow) return;
    try {
      // 콘텐츠 삭제 API 호출
      const res = await fetch(`/api/api/v1/admin/post/delete/${selectedRow.postId}`, { 
        method: "DELETE" 
      });

      if (res.ok) {
        // 콘텐츠 삭제후 데이터 갱신
        setTableData((prevData) => prevData.filter((item) => item.postId !== selectedRow.postId));
        fetchData();
        alert("콘텐츠가 삭제되었습니다.");
      } else {
        alert("콘텐츠 삭제에 실패하였습니다.");
        return;
      }

    } catch (error) {
      console.error(error);
      alert("콘텐츠 삭제 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search, filter]);

  // 등록 버튼 클릭할 때
  const handleRegisterBtnClick = () => {
    navigate(URL.ADMIN_CONTENTS_CREATE);
  };

  return (
    <div className="h-full bg-gray-100 mt-10 mb-4 ml-5 mr-5 rounded">
      <div className="p-5 flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-semibold">웹 콘텐츠 관리</h3>
          <p className="text-gray-500">웹 사이트에 개별 아티클로 게시되는 콘텐츠를 관리합니다</p>
        </div>
        <Button
          onClick={handleRegisterBtnClick}
          className="bg-black text-white px-8 py-3 rounded cursor-pointer hover:bg-gray-300 hover:text-black transition"
        >
          <i className="fas fa-plus mr-3"></i>새 글 등록
        </Button>
      </div>
      <div className="p-5 flex justify-between gap-5">
        <SearchInput 
          value={searchInput} 
          onChange={setSearchInput}
          onEnter={() => {
            setSearch(searchInput);
            setPage(0);
          }}
          placeholder="글 제목 검색" 
        />
        <ComboBox 
          value={filter} 
          onChange={(value) => {
            setFilter(value);
            setPage(0);
          }}
          options={options} 
        />
      </div>
      <div className="p-5">
        <Table
          columns={[
            { key: "title", label: "글 제목" },
            {
              key: "statusBcode",
              label: "발행 상태",
              render: (value) => {
                const statusMap: Record<string, { label: string; className: string }> = {
                  PUBLISHED: {
                    label: "발행 완료",
                    className: "border border-gray-300 text-black",
                  },
                  DRAFT: {
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
            { 
              key: "publishedAt", 
              label: "발행 일시",
              render: (value: string) => {
                if (!value) return "-";

                const date = new Date(value);

                return (
                  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
                );
              }
            },
            {
              key: "manage",
              label: "작업",
              render: (_value, row) => {
                // 수정 버튼 클릭할 때
                const handleUpdate = () => {
                  console.log("_value 출력: ", _value);
                  console.log("row 출력: ", row);
                  const path = URL.ADMIN_CONTENTS_MODIFY.replace(":id", String(row.postId));
                  navigate(path, { state: { status: row.statusBcode } });
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
                      className="px-3 py-1.5 rounded-md text-xs font-medium border border-gray-400 bg-white text-black hover:bg-gray-100 cursor-pointer"
                    >
                      <i className="fas fa-pencil"></i>
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-3 py-1.5 rounded-md text-xs font-medium border border-gray-400 bg-white text-black hover:bg-gray-100 cursor-pointer"
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                );
              },
            },
          ]}
          data={tableData}
        />
      </div>
      {/* 모달 컴포넌트 */}
      <CommonModal
        isOpen={confirmOpen}
        title="웹 콘텐츠 삭제"
        message={
          selectedRow && selectedRow.statusBcode == "PUBLISHED"
            ? "이 글은 현재 웹페이지에 게시 중이며, 삭제하면 웹페이지에서 해당 글이 사라집니다. 삭제하시겠습니까?"
            : "이 글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        }
        confirmText="삭제"
        cancelText="취소"
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          deleteContent();
          setConfirmOpen(false);
        }}
      />
      {tableData.length === 0 ? (
       ""
      ) : (
        <Pagination pagination={paginationInfo} moveToPage={(passedPage) => {
          setPage(passedPage - 1);
        }} />
      )}
    </div>
  );
};

export default ContentsList;
