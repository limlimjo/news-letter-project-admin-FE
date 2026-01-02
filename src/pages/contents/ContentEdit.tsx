import TinyMceEditor from "@/components/TinyMceEditor";
import Button from "@/components/ui/Button";
import CommonInput from "@/components/ui/CommonInput";
import "../../editorPreview.css";
import URL from "@/constants/url";
import CODE from "@/constants/code";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

type Props = { mode?: string };

type ContentDeail = {
  title: string;
  contentHtml: string;
  statusBcode: "DRAFT" | "PUBLISHED";
  createdAt: string;
  publishedAt: string;
  email: string;
};

const ContentEdit = ({ mode = CODE.MODE_CREATE }: Props) => {
  const navigate = useNavigate();
  const params = useParams();
  const contentId = params.id;
  const location = useLocation();
  const passedStatus = location.state?.status;

  const [activeTab, setActiveTab] = useState("editor");
  const [contentDetail, setContentDetail] = useState<ContentDeail>({
    title: "",
    contentHtml: "",
    statusBcode: "DRAFT",
    createdAt: "",
    publishedAt: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, _setStatus] = useState<"DRAFT" | "PUBLISHED" | "">(passedStatus ?? "");
  const modifyMode = mode === CODE.MODE_MODIFY;

  // 수정 모드일 경우 기존 데이터 불러오기
  useEffect(() => {
    if (!modifyMode || !contentId) return;

    const fetchContent = async () => {
      try {
        const res = await fetch(`/api/api/v1/admin/post/detail/${contentId}`, {
          method: "GET",
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "데이터 로드 실패");
        setContentDetail(result.postInfoDto);
      } catch (err) {
        console.error("데이터 로드 실패:", err);
        alert("콘텐츠 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [modifyMode, contentId]);

  // 뒤로가기 버튼 핸들러
  const handleBackBtnClick = () => {
    navigate(URL.ADMIN_CONTENTS);
  };

  // common 저장 함수
  const saveContent = async (saveStatus: "DRAFT" | "PUBLISHED") => {
    // 제목 입력 체크
    if (!contentDetail.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    // 내용 입력 체크
    const plainText = contentDetail.contentHtml
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();
    if (!plainText) {
      alert("내용을 입력해주세요.");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      // 등록/수정 API 호출 분기 처리
      const apiRequest = () => {
        // 수정일 때
        if (modifyMode && contentId) {
          let url = '';
          // 발행
          if (saveStatus === "PUBLISHED") {
            url = '/api/api/v1/admin/post/update/publish';
          }
          // 임시저장
          else if (saveStatus === "DRAFT") {
            url = '/api/api/v1/admin/post/update/redraft';
          }
          type BodyModifyJson = {
            postId: number;
            title: string;
            contentHtml: string;
            statusBcode: "DRAFT" | "PUBLISHED";
          };

          const bodyJson: BodyModifyJson = {
            postId: Number(contentId),
            title: contentDetail.title,
            contentHtml: contentDetail.contentHtml,
            statusBcode: saveStatus,
          };

          return { url, method: "PATCH", bodyJson };
        // 등록일 때
        } else {
          let url = '';
          // 발행
          if (saveStatus === "PUBLISHED") {
            url = '/api/api/v1/admin/post/publish';
          }
          // 임시저장
          else if (saveStatus === "DRAFT") {
            url = '/api/api/v1/admin/post/draft';
          }

          type BodySaveJson = {
            adminId: number;
            title: string;
            contentHtml: string;
            statusBcode: "DRAFT" | "PUBLISHED";
          };

          const bodyJson: BodySaveJson = {
            adminId: 1,
            title: contentDetail.title,
            contentHtml: contentDetail.contentHtml,
            statusBcode: saveStatus,
          };

          return { url, method: "POST", bodyJson };
        }
      };

      const { url, method, bodyJson } = apiRequest();

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyJson),
      });

      if (res.ok) {
        const result = await res.text();
        alert(result);
        navigate(URL.ADMIN_CONTENTS);
      } else {
        alert("저장에 실패하였습니다.");
        return false;
      }
    } catch (err) {
      console.error("저장 실패:", err);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 임시 저장 버튼 핸들러
  const handleDraftSave = () => saveContent("DRAFT");
  // 웹에 발행/변경사항 저장 버튼 핸들러
  const handlePublish = () => saveContent("PUBLISHED");

  return (
    <div className="bg-gray-100 mt-10 mb-4 ml-5 mr-5 rounded">
      <div className="p-5 flex items-center gap-4">
        <button
          onClick={handleBackBtnClick}
          className="flex p-2 items-center bg-white border border-gray-400 rounded-md cursor-pointer"
        >
          <i className="fa fa-arrow-left"></i>
        </button>
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-semibold">{!modifyMode ? "새 웹 콘텐츠 작성" : "웹 콘텐츠 수정"}</h3>
          <p className="text-gray-500">웹 사이트에 개별 아티클로 게시됩니다</p>
        </div>
      </div>
      <div className="grid grid-cols-[3fr_1fr] gap-6 p-5">
        <div>
          <CommonInput type="text" className="mb-4" value={contentDetail.title} onChange={value => setContentDetail(prev => ({...prev, title: value}))} placeholder="제목을 입력하세요" />
          <div className="flex w-full bg-gray-200 rounded-full p-1">
            <button
              onClick={() => setActiveTab("editor")}
              className={`flex-1 text-sm font-medium py-2 rounded-full transition
          ${activeTab === "editor" ? "bg-white shadow text-black" : "text-gray-500"}`}
            >
              에디터
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex-1 text-sm font-medium py-2 rounded-full transition
          ${activeTab === "preview" ? "bg-white shadow text-black" : "text-gray-500"}`}
            >
              실시간 미리보기
            </button>
          </div>
          <div className="max-w-3xl mx-auto">
            {activeTab === "editor" ? (
              <TinyMceEditor content={contentDetail.contentHtml} setContent={html => setContentDetail(prev => ({...prev, contentHtml: html}))} />
            ) : (
              <div className="mt-4 bg-white rounded p-4">
                <div className="editor-preview max-w-none h-full" dangerouslySetInnerHTML={{ __html: contentDetail.contentHtml }} />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {/* status가 임시저장(draft)일 때는 임시 저장 버튼과 웹에 발행 버튼 표시 */}
          {(status === "DRAFT" || status === "") && (
            <>
              <Button
                onClick={handleDraftSave}
                disabled={loading}
                className="bg-white text-black border border-gray-300 px-8 py-3 rounded cursor-pointer hover:bg-gray-300 transition"
              >
                {loading ? "저장 중..." : "임시 저장"}
              </Button>
              <Button
                onClick={handlePublish}
                disabled={loading}
                className="bg-black text-white px-8 py-3 rounded cursor-pointer hover:bg-gray-300 hover:text-black transition"
              >
                {loading ? "처리 중..." : "웹에 발행"}
              </Button>
            </>
          )}
          {/* status가 발행완료(published)일 때는 변경사항 저장 버튼 표시 */}
          {status === "PUBLISHED" && (
            <Button
              onClick={handlePublish}
              disabled={loading}
              className="bg-black text-white px-8 py-3 rounded cursor-pointer hover:bg-gray-300 hover:text-black transition"
            >
              {loading ? "처리 중..." : "변경사항 저장"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentEdit;
