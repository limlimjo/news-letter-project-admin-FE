import { Editor } from "@tinymce/tinymce-react";

interface TinyMceTestProps {
  content: string;
  setContent: (value: string) => void;
}

const TinyMceEditor = ({ content, setContent }: TinyMceTestProps) => {
  const apikey = import.meta.env.VITE_EDITOR_API_KEY;

  const handleSave = () => {
    console.log("작성된 HTML:", content);
    alert("콘솔에서 HTML 코드를 확인해보세요!");
  };

  return (
    <div className="py-4">
      <Editor
        apiKey={apikey}
        value={content}
        init={{
          height: 400,
          width: "100%",
          menubar: false,
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
            "bullist numlist outdent indent | removeformat | preview | help | code",
          content_style: `
            body {
                font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                font-size: 16px;
                color: #1f2937; /* gray-800 */
                line-height: 1.25;
                padding: 1rem;
            }

            h1, h2, h3, h4, h5, h6 {
                font-weight: 600;
                line-height: 1.25;
                margin-top: 0.5em;
                margin-bottom: 0.5em;
            }

            h1 { font-size: 2rem; }
            h2 { font-size: 1.5rem; }
            h3 { font-size: 1.25rem; }

            p {
                margin: 0.75em 0;
            }

            ul, ol {
                padding-left: 1.5em;
                margin: 0.5em 0;
            }

            img {
                max-width: 100%;
                border-radius: 0.5rem;
            }

            table {
                border-collapse: collapse;
                width: 100%;
                margin: 1em 0;
            }

            th, td {
                border: 1px solid #d1d5db;
                padding: 0.5rem;
                text-align: left;
            }

            code {
                background: #f3f4f6;
                padding: 0.2rem 0.4rem;
                border-radius: 0.25rem;
            }
            `,
          preview_styles: false,
        }}
        onEditorChange={(newContent) => setContent(newContent)}
      />
    </div>
  );
};

export default TinyMceEditor;
