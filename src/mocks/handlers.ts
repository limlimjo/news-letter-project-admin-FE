// http or rest가 있는데 현재 msw 버전에서는 http를 사용해야함
import { http, HttpResponse } from "msw";

// 콘텐츠 등록/수정/삭제/조회, 구독자 목록 조회 모킹
export const handlers = [
  // 콘텐츠 목록 조회
  http.get("/api/contents", () => {
    return HttpResponse.json([
      { id: 1, title: "첫 번째 콘텐츠", createdAt: "2025-10-07", status: "draft" },
      { id: 2, title: "두 번째 콘텐츠", createdAt: "2025-10-08", status: "published" },
      { id: 3, title: "세 번째 콘텐츠", createdAt: "2025-10-09", status: "draft" },
    ]);
  }),

  // 콘텐츠 상세 조회
  http.get("/api/contents/:id", ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      id,
      title: `${id} 번째 콘텐츠`,
      content: `${id} 번째 콘텐츠 내용입니다.`,
      createdAt: "2025-10-07",
      status: "published",
    });
  }),

  // 콘텐츠 등록
  http.post("/api/contents", async ({ request }) => {
    const newContent = await request.json();
    console.log("새 콘텐츠 등록됨: ", newContent);
    return HttpResponse.json({ message: "등록 성공", data: newContent }, { status: 201 });
  }),

  // 콘텐츠 수정
  http.put("/api/contents/:id", async ({ params, request }) => {
    const { id } = params;
    const updatedContent = await request.json();
    console.log(`${id} 번째 콘텐츠 수정됨: `, updatedContent);
    return HttpResponse.json({ message: "수정 성공", data: updatedContent });
  }),

  // 콘텐츠 삭제
  http.delete("/api/contents/:id", ({ params }) => {
    const { id } = params;
    console.log(`${id} 번째 콘텐츠 삭제됨`);
    return HttpResponse.json({ message: `${id} 번째 콘텐츠 삭제됨` });
  }),

  // 구독자 목록 조회
  http.get("/api/subscribers", () => {
    return HttpResponse.json([
      { id: 1, email: "test1@email.com", subscribedAt: "2025-10-01", status: "subscribed" },
      { id: 2, email: "test2@email.com", subscribedAt: "2025-10-05", status: "unsubscribed" },
      { id: 3, email: "test3@email.com", subscribedAt: "2025-10-10", status: "bounce" },
    ]);
  }),
];
