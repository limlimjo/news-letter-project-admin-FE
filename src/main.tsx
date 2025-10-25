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
import DashboardList from "./pages/dashboard/DashboardList";
import URL from "./constants/url";

// msw 시작
async function initMocks() {
  const { worker } = await import("./mocks/browser");
  await worker.start({
    serviceWorker: { url: "/mockServiceWorker.js" },
  });
}

if (process.env.NODE_ENV === "development" || process.env.REACT_APP_USE_MOCK === "true") {
  initMocks();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<App />} />
          <Route path={URL.ADMIN_CONTENTS} element={<ContentsList />} />
          <Route path={URL.ADMIN_CONTENTS_NEW} element={<ContentCreate />} />
          <Route path={URL.ADMIN_CONTENTS_DETAIL} element={<ContentsDetail />} />
          <Route path={URL.ADMIN_CONTENTS_EDIT} element={<ContentEdit />} />
          <Route path={URL.ADMIN_SUBSCRIBERS} element={<SubscribersList />} />
          <Route path={URL.ADMIN_DASHBOARD} element={<DashboardList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
