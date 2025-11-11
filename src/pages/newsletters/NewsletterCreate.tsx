import TinyMceEditor from "@/components/TinyMceEditor";
import Button from "@/components/ui/Button";
import CardBox from "@/components/ui/CardBox";
import CommonInput from "@/components/ui/CommonInput";
import "../../editorPreview.css";
import URL from "@/constants/url";
import { useState } from "react";
import { useNavigate } from "react-router";

const NewsletterCreate = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("editor");
  const [title, setTitle] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  const handleBackBtnClick = () => {
    navigate(URL.ADMIN_NEWSLETTERS);
  };

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
                    <input className="mr-2" type="radio" name="status" value="published" />
                    즉시 발송
                  </label>
                  <label>
                    <input className="mr-2" type="radio" name="status" value="unpublished" />
                    예약 발송
                  </label>
                </div>
              </div>
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
            <Button className="bg-white text-black border border-gray-300 px-8 py-3 rounded cursor-pointer hover:bg-black hover:text-white transition">
              임시 저장
            </Button>
            <Button className="bg-black text-white px-8 py-3 rounded cursor-pointer hover:bg-gray-300 hover:text-black transition">
              예약 설정
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterCreate;
