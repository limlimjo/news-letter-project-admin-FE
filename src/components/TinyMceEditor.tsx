import { Editor } from "@tinymce/tinymce-react";

interface TinyMceProps {
  content: string;
  setContent: (value: string) => void;
}

interface TinyMCEBlobInfo {
  blob(): Blob;
  filename(): string;
}

type TinyMCEProgressFn = (percent: number) => void;

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
          images_upload_handler: async (blobInfo: TinyMCEBlobInfo, progress: TinyMCEProgressFn) => {
            const file = blobInfo.blob();
            const filename = blobInfo.filename();
            console.log("file 출력: ", file);

            try {
              // presigned URL 요청 (TODO: 백엔드 API 만들어지면 수정 예정)
              const res = await fetch('/api/presigned-url', {
                method: 'POST',
                body: JSON.stringify({ filename }),
                headers: {
                  'Content-Type': 'application/json'
                }
              });

              if (!res.ok) {
                throw new Error("Image upload failed");
              }

              const { url } = await res.json();
              
              // 실제 파일 업로드
              await fetch(url, {
                method: 'PUT',
                body: file,
                headers: {
                  'Content-Type': file.type
                }
              });
              
              // url 추출
              const s3Url = url.split('?')[0];
              
              return s3Url;
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
