import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages"; // 메인 페이지 컴포넌트
import RootLayout from "./pages/layout"; // 레이아웃 컴포넌트
import { BrowserRouter, Route, Routes } from "react-router";
import ContentCreate from "./pages/contents/ContentCreate";
import ContentsDetail from "./pages/contents/ContentsDetail";
import ContentEdit from "./pages/contents/ContentEdit";
import ContentsList from "./pages/contents/ContentsList";
import SubscribersList from "./pages/subscribers/SubscribersList";

// 개발 환경에서만 msw 시작
if (process.env.NODE_ENV === "development") {
  const { worker } = await import("./mocks/browser");
  await worker.start();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<App />} />
          <Route path="/contents/new" element={<ContentCreate />} />
          <Route path="/contents/:id" element={<ContentsDetail />} />
          <Route path="/contents/:id/edit" element={<ContentEdit />} />
          <Route path="/contents" element={<ContentsList />} />
          <Route path="/subscribers" element={<SubscribersList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
