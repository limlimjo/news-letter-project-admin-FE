type UrlType = {
  ADMIN_NEWSLETTERS: string;
  ADMIN_NEWSLETTERS_NEW: string;
  ADMIN_NEWSLETTERS_DETAIL: string;
  ADMIN_NEWSLETTERS_EDIT: string;
  ADMIN_CONTENTS: string;
  ADMIN_CONTENTS_NEW: string;
  ADMIN_CONTENTS_DETAIL: string;
  ADMIN_CONTENTS_EDIT: string;
  ADMIN_SUBSCRIBERS: string;
  ADMIN_DASHBOARD: string;
};

const URL: UrlType = {
  // 뉴스레터 관리
  ADMIN_NEWSLETTERS: "/newsletters",
  ADMIN_NEWSLETTERS_NEW: "/newsletters/new",
  ADMIN_NEWSLETTERS_DETAIL: "/newsletters/:id",
  ADMIN_NEWSLETTERS_EDIT: "/newsletters/:id/edit",
  // 웹 콘텐츠 관리
  ADMIN_CONTENTS: "/contents",
  ADMIN_CONTENTS_NEW: "/contents/new",
  ADMIN_CONTENTS_DETAIL: "/contents/:id",
  ADMIN_CONTENTS_EDIT: "/contents/:id/edit",
  // 구독자 관리
  ADMIN_SUBSCRIBERS: "/subscribers",
  // 통계 대시보드
  ADMIN_DASHBOARD: "/dashboard",
};

export default URL;
