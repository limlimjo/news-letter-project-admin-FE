import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RootLayout from "./pages/layout"; // 레이아웃 컴포넌트
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import ContentCreate from "./pages/contents/ContentCreate";
import ContentDetail from "./pages/contents/ContentDetail";
import ContentEdit from "./pages/contents/ContentEdit";
import ContentsList from "./pages/contents/ContentsList";
import SubscribersList from "./pages/subscribers/SubscribersList";
import DashboardList from "./pages/dashboard/DashboardList";
import URL from "./constants/url";
import NewslettersList from "./pages/newsletters/NewslettersList";
import NewsletterCreate from "./pages/newsletters/NewsletterCreate";
import NewsletterDetail from "./pages/newsletters/NewsletterDetail";
import NewsletterEdit from "./pages/newsletters/NewsletterEdit";

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
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<Navigate to={URL.ADMIN_CONTENTS} replace />} />
            <Route path={URL.ADMIN_CONTENTS} element={<ContentsList />} />
            <Route path={URL.ADMIN_CONTENTS_NEW} element={<ContentCreate />} />
            <Route path={URL.ADMIN_CONTENTS_DETAIL} element={<ContentDetail />} />
            <Route path={URL.ADMIN_CONTENTS_EDIT} element={<ContentEdit />} />
            <Route path={URL.ADMIN_NEWSLETTERS} element={<NewslettersList />} />
            <Route path={URL.ADMIN_NEWSLETTERS_NEW} element={<NewsletterCreate />} />
            <Route path={URL.ADMIN_NEWSLETTERS_DETAIL} element={<NewsletterDetail />} />
            <Route path={URL.ADMIN_NEWSLETTERS_EDIT} element={<NewsletterEdit />} />
            <Route path={URL.ADMIN_SUBSCRIBERS} element={<SubscribersList />} />
            <Route path={URL.ADMIN_DASHBOARD} element={<DashboardList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

init();
