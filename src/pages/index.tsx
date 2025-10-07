import { useEffect } from "react";

function App() {
  // msw가 제대로 동작하는지 확인하기 위한 fetch 예제
  useEffect(() => {
    fetch("/api/contents")
      .then((res) => res.json())
      .then((data) => {
        console.log("Mock API 응답:", data);
      })
      .catch((err) => console.error("요청 실패:", err));
  }, []);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <h1>MSW 테스트 중...</h1>
    </div>
  );
}

export default App;
