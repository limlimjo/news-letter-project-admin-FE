import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RootLayout from "./pages/layout"; // 레이아웃 컴포넌트
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import ContentEdit from "./pages/contents/ContentEdit";
import ContentsList from "./pages/contents/ContentsList";
import SubscribersList from "./pages/subscribers/SubscribersList";
import DashboardList from "./pages/dashboard/DashboardList";
import URL from "./constants/url";
import NewslettersList from "./pages/newsletters/NewslettersList";
import NewsletterEdit from "./pages/newsletters/NewsletterEdit";
import CODE from "./constants/code";

// msw 시작
async function initMocks() {
  const { worker } = await import("./mocks/browser");
  await worker.start({
    serviceWorker: { url: "/mockServiceWorker.js" },
  });
}

async function init() {
  if (import.meta.env.MODE === "development" || import.meta.env.VITE_USE_MOCK === "true") {
    await initMocks();
  }

  createRoot(document.getElementById("root")!).render(
    // <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<Navigate to={URL.ADMIN_CONTENTS} replace />} />
            <Route path={URL.ADMIN_CONTENTS} element={<ContentsList />} />
            <Route path={URL.ADMIN_CONTENTS_CREATE} element={<ContentEdit mode={CODE.MODE_CREATE} />} />
            <Route path={URL.ADMIN_CONTENTS_MODIFY} element={<ContentEdit mode={CODE.MODE_MODIFY} />} />
            <Route path={URL.ADMIN_NEWSLETTERS} element={<NewslettersList />} />
            <Route path={URL.ADMIN_NEWSLETTERS_CREATE} element={<NewsletterEdit mode={CODE.MODE_CREATE} />} />
            <Route path={URL.ADMIN_NEWSLETTERS_MODIFY} element={<NewsletterEdit mode={CODE.MODE_MODIFY} />} />
            <Route path={URL.ADMIN_SUBSCRIBERS} element={<SubscribersList />} />
            <Route path={URL.ADMIN_DASHBOARD} element={<DashboardList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    // </StrictMode>
  );
}

init();
