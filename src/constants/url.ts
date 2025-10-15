type UrlType = {
  ADMIN_CONTENTS: string;
  ADMIN_CONTENTS_NEW: string;
  ADMIN_CONTENTS_DETAIL: string;
  ADMIN_CONTENTS_EDIT: string;
  ADMIN_SUBSCRIBERS: string;
  ADMIN_DASHBOARD: string;
};

const URL: UrlType = {
  // 콘텐츠 관리
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
