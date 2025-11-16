import TinyMceEditor from "@/components/TinyMceEditor";
import Button from "@/components/ui/Button";
import CardBox from "@/components/ui/CardBox";
import CommonInput from "@/components/ui/CommonInput";
import "../../editorPreview.css";
import URL from "@/constants/url";
import CODE from "@/constants/code";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

type Props = { mode?: string };

const NewsletterEdit = ({ mode = CODE.MODE_CREATE }: Props) => {
  const navigate = useNavigate();
  const params = useParams();
  const newsletterId = params.id;
  const location = useLocation();
  const passedStatus = location.state?.status;

  const [activeTab, setActiveTab] = useState("editor");
  const [title, setTitle] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"draft" | "published" | "unpublished" | "">(passedStatus ?? "");

  const modifyMode = mode === CODE.MODE_MODIFY;

  // 수정 모드일 경우 기존 데이터 불러오기
  useEffect(() => {
    if (!modifyMode || !newsletterId) return;

    const fetchContent = async () => {
      try {
        const res = await fetch(`/api/newsletters/${newsletterId}`);
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "데이터 로드 실패");
        setTitle(result.title);
        setContent(result.content);
        setReservationDate(result.reservationDate);
        setReservationTime(result.reservationTime);
      } catch (err) {
        console.error("데이터 로드 실패:", err);
        alert("뉴스레터 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [modifyMode, newsletterId]);

  // 뒤로가기 버튼 핸들러
  const handleBackBtnClick = () => {
    navigate(URL.ADMIN_NEWSLETTERS);
  };

  // common 저장 함수
  const saveContent = async (saveStatus: "draft" | "published" | "unpublished") => {
    // 제목 입력 체크
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    // 내용 입력 체크
    const plainText = content
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();
    if (!plainText) {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      console.log("저장 상태:", saveStatus);
      setLoading(true);

      // 예약 발송 선택 시 날짜/시간 입력 체크
      if (saveStatus === "unpublished") {
        if (!reservationDate || !reservationTime) {
          alert("예약 발송을 선택하셨습니다. 예약 날짜와 시간을 입력해주세요.");
          setLoading(false);
          return;
        }
      }

      // 등록/수정 API 호출 분기 처리
      const apiRequest = () => {
        if (modifyMode && newsletterId) {
          const url = `/api/newsletters/${newsletterId}`;
          return { url, method: "PUT" };
        } else {
          const url = "/api/newsletters";
          return { url, method: "POST" };
        }
      };

      const { url, method } = apiRequest();

      type BodyPayload = {
        title: string;
        content: string;
        status: "draft" | "published" | "unpublished";
        reservationDate?: string;
        reservationTime?: string;
      };

      const bodyPayload: BodyPayload = {
        title,
        content,
        status: saveStatus,
      };

      // 예약 발송일 경우 날짜/시간 포함
      if (saveStatus === "unpublished") {
        bodyPayload.reservationDate = reservationDate;
        bodyPayload.reservationTime = reservationTime;
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyPayload),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "저장 실패");
      console.log("저장 결과:", result);
      navigate(URL.ADMIN_NEWSLETTERS);
    } finally {
      setLoading(false);
    }
  };

  // 임시 저장 버튼 핸들러
  const handleDraftSave = () => saveContent("draft");
  // 즉시 발송 버튼 핸들러
  const handlePublish = () => saveContent("published");
  // 예약 설정 버튼 핸들러
  const handleUnpublish = () => saveContent("unpublished");

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
          <h3 className="text-2xl font-semibold">새 뉴스레터 작성</h3>
          <p className="text-gray-500">이메일로 발송되는 뉴스레터를 작성합니다</p>
        </div>
      </div>
      <div className="grid grid-cols-[3fr_1fr] gap-6 p-5">
        <div>
          <CommonInput type="text" className="mb-4" value={title} onChange={setTitle} placeholder="제목을 입력하세요" />
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
              <TinyMceEditor content={content} setContent={setContent} />
            ) : (
              <div className="mt-4 bg-white rounded min-h-[400px] p-4">
                <div className="editor-preview max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <CardBox className="px-5 py-5">
            <div>
              <p className="text-lg font-semibold">발송 설정</p>
              <div className="mt-4">
                <p className="mb-2">발송 옵션</p>
                <div className="flex flex-col gap-3">
                  <label>
                    <input
                      className="mr-2"
                      type="radio"
                      name="status"
                      value="published"
                      checked={status === "published" || status === ""}
                      onChange={() => setStatus("published")}
                    />
                    즉시 발송
                  </label>
                  <label>
                    <input
                      className="mr-2"
                      type="radio"
                      name="status"
                      value="unpublished"
                      checked={status === "unpublished"}
                      onChange={() => setStatus("unpublished")}
                    />
                    예약 발송
                  </label>
                </div>
              </div>
              {/* 예약 옵션 - 예약 발송 선택 시에만 보이게 함 */}
              {status === "unpublished" && (
                <div className="mt-4">
                  <div className="mb-2">
                    <p className="mb-2">예약 날짜</p>
                    <CommonInput type="date" value={reservationDate} onChange={setReservationDate} placeholder="" />
                  </div>
                  <div>
                    <p className="mb-2">예약 시간</p>
                    <CommonInput type="time" value={reservationTime} onChange={setReservationTime} placeholder="" />
                  </div>
                </div>
              )}
            </div>
          </CardBox>
          <CardBox className="px-5 py-5">
            <div>
              <p className="text-lg font-semibold">테스트 발송</p>
              <div className="mt-4">
                <p className="mb-2">이메일 주소</p>
                <CommonInput className="mb-3" value={email} onChange={setEmail} placeholder="test@example.com" />
                <Button className="w-full bg-white text-black border border-gray-300 px-4 py-3 rounded cursor-pointer hover:bg-black hover:text-white transition">
                  <i className="fa fa-paper-plane mr-3"></i>테스트 발송
                </Button>
              </div>
            </div>
          </CardBox>
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleDraftSave}
              disabled={loading}
              className="bg-white text-black border border-gray-300 px-8 py-3 rounded cursor-pointer hover:bg-black hover:text-white transition"
            >
              {loading ? "저장 중..." : "임시 저장"}
            </Button>
            {status === "published" ? (
              <Button
                onClick={handlePublish}
                disabled={loading}
                className="bg-black text-white px-8 py-3 rounded cursor-pointer hover:bg-gray-300 hover:text-black transition"
              >
                {loading ? "처리 중..." : "즉시 발송"}
              </Button>
            ) : (
              <Button
                onClick={handleUnpublish}
                disabled={loading}
                className="bg-black text-white px-8 py-3 rounded cursor-pointer hover:bg-gray-300 hover:text-black transition"
              >
                {loading ? "처리 중..." : "예약 설정"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterEdit;
