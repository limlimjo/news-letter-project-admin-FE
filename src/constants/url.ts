type UrlType = {
  ADMIN_NEWSLETTERS: string;
  ADMIN_NEWSLETTERS_DETAIL: string;
  ADMIN_NEWSLETTERS_CREATE: string;
  ADMIN_NEWSLETTERS_MODIFY: string;
  ADMIN_CONTENTS: string;
  ADMIN_CONTENTS_DETAIL: string;
  ADMIN_CONTENTS_CREATE: string;
  ADMIN_CONTENTS_MODIFY: string;
  ADMIN_SUBSCRIBERS: string;
  ADMIN_DASHBOARD: string;
};

const URL: UrlType = {
  // 뉴스레터 관리
  ADMIN_NEWSLETTERS: "/newsletters",
  ADMIN_NEWSLETTERS_CREATE: "/newsletters/create",
  ADMIN_NEWSLETTERS_DETAIL: "/newsletters/:id",
  ADMIN_NEWSLETTERS_MODIFY: "/newsletters/:id/modify",
  // 웹 콘텐츠 관리
  ADMIN_CONTENTS: "/contents",
  ADMIN_CONTENTS_CREATE: "/contents/create",
  ADMIN_CONTENTS_DETAIL: "/contents/:id",
  ADMIN_CONTENTS_MODIFY: "/contents/:id/modify",
  // 구독자 관리
  ADMIN_SUBSCRIBERS: "/subscribers",
  // 통계 대시보드
  ADMIN_DASHBOARD: "/dashboard",
};

export default URL;
