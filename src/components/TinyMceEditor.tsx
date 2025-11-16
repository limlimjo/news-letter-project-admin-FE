import { Editor } from "@tinymce/tinymce-react";

interface TinyMceProps {
  content: string;
  setContent: (value: string) => void;
}

const TinyMceEditor = ({ content, setContent }: TinyMceProps) => {
  const apikey = import.meta.env.VITE_EDITOR_API_KEY;

  return (
    <div className="py-4">
      <Editor
        apiKey={apikey}
        value={content}
        onEditorChange={(newContent) => setContent(newContent)}
        init={{
          height: 610,
          width: "100%",
          menubar: false,
          preview_styles: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | bold italic underline | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | image | code",

          // 이미지 업로드 핸들러 추가
          images_upload_handler: async (blobInfo, progress) => {
            const file = blobInfo.blob();
            console.log("file 출력: ", file);
            console.log("blobInfo 출력: ", blobInfo);
            console.log("progress 출력: ", progress);

            const formData = new FormData();
            formData.append("file", file);

            try {
              // TODO: 백엔드 이미지 업로드 API 호출 예정 (현재는 임시 URL)
              const res = await fetch("/api/upload/images", {
                method: "POST",
                body: formData,
              });

              if (!res.ok) {
                throw new Error("Image upload failed");
              }

              const data = await res.json();
              console.log("업로드 응답 데이터: ", data);

              // 서버에서 url 반환
              return data.url;
            } catch (error) {
              console.error(error);
              throw error;
            }
          },
        }}
      />
    </div>
  );
};

export default TinyMceEditor;
