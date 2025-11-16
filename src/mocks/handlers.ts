// http or rest가 있는데 현재 msw 버전에서는 http를 사용해야함
import { http, HttpResponse } from "msw";

// 간단한 메모리 스토어 (mock용)
// 1. 이미지 업로드용 스토어
const imageStore: { id: string; url: string; name?: string }[] = [];
let nextImageId = 1;
// 2. 웹 콘텐츠 스토어
const contentsStore: {
  id: number;
  title: string;
  content: string;
  status: "draft" | "published" | string;
  createdAt: string;
  updatedAt?: string;
}[] = [
  {
    id: 1,
    title: "첫 번째 콘텐츠",
    content: "<h2>🧾 토스, 금융 데이터로 HR 시장 정조준</h2>",
    createdAt: "2025-10-07",
    status: "published",
  },
  {
    id: 2,
    title: "두 번째 콘텐츠",
    content: "<h2>🧾 토스, 금융 데이터로 HR 시장 정조준</h2>",
    createdAt: "2025-10-08",
    status: "draft",
  },
  {
    id: 3,
    title: "세 번째 콘텐츠",
    content: "<h2>🧾 토스, 금융 데이터로 HR 시장 정조준</h2>",
    createdAt: "2025-10-09",
    status: "draft",
  },
  {
    id: 4,
    title: "네 번째 콘텐츠",
    content: "<h2>🧾 토스, 금융 데이터로 HR 시장 정조준</h2>",
    createdAt: "2025-10-10",
    status: "published",
  },
];
let nextContentId = contentsStore.length + 1;

// 3. 뉴스레터 스토어
const newslettersStore: {
  id: number;
  title: string;
  content: string;
  status: "draft" | "unpublished" | "published" | string;
  createdAt: string;
  updatedAt?: string;
  reservationDate?: string;
  reservationTime?: string;
}[] = [
  {
    id: 1,
    title: "첫 번째 뉴스레터",
    content: "<h2>🧾 토스, 금융 데이터로 HR 시장 정조준</h2>",
    createdAt: "2025-10-07",
    status: "published",
    reservationDate: "",
    reservationTime: "",
  },
  {
    id: 2,
    title: "두 번째 뉴스레터",
    content: "<h2>🧾 토스, 금융 데이터로 HR 시장 정조준</h2>",
    createdAt: "2025-10-08",
    status: "unpublished",
    reservationDate: "2025-11-20",
    reservationTime: "15:30",
  },
  {
    id: 3,
    title: "세 번째 뉴스레터",
    content: "<h2>🧾 토스, 금융 데이터로 HR 시장 정조준</h2>",
    createdAt: "2025-10-09",
    status: "draft",
    reservationDate: "",
    reservationTime: "",
  },
  {
    id: 4,
    title: "네 번째 뉴스레터",
    content: "<h2>🧾 토스, 금융 데이터로 HR 시장 정조준</h2>",
    createdAt: "2025-10-10",
    status: "published",
    reservationDate: "",
    reservationTime: "",
  },
];
let nextNewsletterId = newslettersStore.length + 1;

// 콘텐츠 등록/수정/삭제/조회, 구독자 목록 조회 모킹
export const handlers = [
  // 웹 콘텐츠 목록 조회
  http.get("/api/contents", () => {
    const list = contentsStore;
    console.log("콘텐츠 목록 조회: ", list);
    return HttpResponse.json(list);
  }),

  // 웹 콘텐츠 상세 조회
  http.get("/api/contents/:id", ({ params }) => {
    const { id } = params;
    const item = contentsStore.find((c) => String(c.id) === String(id));
    if (!item) return HttpResponse.json({ message: "해당되는 콘텐츠가 없습니다." }, { status: 404 });
    return HttpResponse.json(item);
  }),

  // 웹 콘텐츠 등록
  http.post("/api/contents", async ({ request }) => {
    const body = await request.json();
    const id = nextContentId++;
    const status = body.status || "draft";
    const now = new Date().toISOString().split("T")[0];
    const newItem = {
      id,
      title: body.title || "",
      content: body.content || "",
      status,
      createdAt: now,
      updatedAt: now,
    };
    contentsStore.push(newItem);
    console.log("새 콘텐츠 등록됨: ", newItem);
    return HttpResponse.json(
      { message: status == "draft" ? "임시저장 성공" : "등록 성공", data: newItem },
      { status: 201 }
    );
  }),

  // 웹 콘텐츠 수정
  http.put("/api/contents/:id", async ({ params, request }) => {
    const { id } = params;
    const body = await request.json();
    const idx = contentsStore.findIndex((c) => String(c.id) === String(id));
    if (idx === -1) {
      return HttpResponse.json({ message: "해당되는 콘텐츠가 없습니다." }, { status: 404 });
    }

    const now = new Date().toISOString().split("T")[0];
    const existingContent = contentsStore[idx];
    const updatedContent = {
      ...existingContent,
      title: body.title ?? existingContent.title,
      content: body.content ?? existingContent.content,
      status: body.status ?? existingContent.status,
      updatedAt: now,
    };

    contentsStore[idx] = updatedContent;
    console.log(`${id} 번째 콘텐츠 수정됨: `, updatedContent);
    return HttpResponse.json({ message: "수정 성공", data: updatedContent });
  }),

  // 웹 콘텐츠 삭제
  http.delete("/api/contents/:id", ({ params }) => {
    const { id } = params;
    const idx = contentsStore.findIndex((c) => String(c.id) === String(id));
    if (idx === -1) {
      return HttpResponse.json({ message: "해당되는 콘텐츠가 없습니다." }, { status: 404 });
    }
    const removedContent = contentsStore.splice(idx, 1)[0];
    console.log(`${id} 번째 콘텐츠 삭제됨 `, removedContent);
    return HttpResponse.json({ message: `${id} 번째 콘텐츠 삭제됨`, data: removedContent });
  }),

  // 뉴스레터 목록 조회
  http.get("/api/newsletters", () => {
    const list = newslettersStore;
    console.log("뉴스레터 목록 조회: ", list);
    return HttpResponse.json(list);
  }),

  // 뉴스레터 상세 조회
  http.get("/api/newsletters/:id", ({ params }) => {
    const { id } = params;
    const item = newslettersStore.find((c) => String(c.id) === String(id));
    if (!item) return HttpResponse.json({ message: "해당되는 콘텐츠가 없습니다." }, { status: 404 });
    return HttpResponse.json(item);
  }),

  // 뉴스레터 등록
  http.post("/api/newsletters", async ({ request }) => {
    const body = await request.json();
    const id = nextNewsletterId++;
    const status = body.status || "draft";
    const now = new Date().toISOString().split("T")[0];
    const newItem = {
      id,
      title: body.title || "",
      content: body.content || "",
      status,
      reservationDate: body.reservationDate || "",
      reservationTime: body.reservationTime || "",
      createdAt: now,
      updatedAt: now,
    };
    newslettersStore.push(newItem);
    console.log("새 콘텐츠 등록됨: ", newItem);
    return HttpResponse.json(
      { message: status == "draft" ? "임시저장 성공" : "발송 성공", data: newItem },
      { status: 201 }
    );
  }),

  // 뉴스레터 수정
  http.put("/api/newsletters/:id", async ({ params, request }) => {
    const { id } = params;
    const body = await request.json();
    const idx = newslettersStore.findIndex((c) => String(c.id) === String(id));
    if (idx === -1) {
      return HttpResponse.json({ message: "해당되는 뉴스레터가 없습니다." }, { status: 404 });
    }

    const now = new Date().toISOString().split("T")[0];
    const existingNewsletter = newslettersStore[idx];
    const updatedNewsletter = {
      ...existingNewsletter,
      title: body.title ?? existingNewsletter.title,
      content: body.content ?? existingNewsletter.content,
      status: body.status ?? existingNewsletter.status,
      reservationDate: body.reservationDate ?? existingNewsletter.reservationDate,
      reservationTime: body.reservationTime ?? existingNewsletter.reservationTime,
      updatedAt: now,
    };

    newslettersStore[idx] = updatedNewsletter;
    console.log(`${id} 번째 뉴스레터 수정됨: `, updatedNewsletter);
    return HttpResponse.json({ message: "수정 성공", data: updatedNewsletter });
  }),

  // 뉴스레터 삭제
  http.delete("/api/newsletters/:id", ({ params }) => {
    const { id } = params;
    const idx = newslettersStore.findIndex((c) => String(c.id) === String(id));
    if (idx === -1) {
      return HttpResponse.json({ message: "해당되는 뉴스레터가 없습니다." }, { status: 404 });
    }
    const removedNewsletter = newslettersStore.splice(idx, 1)[0];
    console.log(`${id} 번째 뉴스레터 삭제됨 `, removedNewsletter);
    return HttpResponse.json({ message: `${id} 번째 뉴스레터 삭제됨`, data: removedNewsletter });
  }),

  // 이미지 업로드 (백엔드에서 업로드할 때 사용하는 API)
  // http.post("/api/upload/images", async ({ request }) => {
  //   let filename = "unknown";

  //   try {
  //     const form = await request.formData();
  //     const file = form.get("file");
  //     if (file && (file as any).name) filename = (file as any).name;
  //     console.log("업로드된 파일명: ", filename);
  //   } catch {
  //     console.log("파일 업로드 실패");
  //   }
  //   const id = `img_${nextImageId++}`;
  //   console.log("id 출력: ", id);
  //   const url = `http://localhost:5173/mock-images/${id}.png`; // mock URL
  //   imageStore.push({ id, url, name: filename });
  //   console.log("imageStore 출력: ", imageStore);

  //   return HttpResponse.json({ id, url, name: filename }, { status: 201 });
  // }),

  // 이미지 업로드: 바이너리를 메모리에 저장하고 리턴은 상대 URL로 (로컬용)
  http.post("/api/upload/images", async ({ request }) => {
    let filename = "unknown";
    let mime = "application/octet-stream";
    let buffer = new Uint8Array();

    try {
      // 브라우저에서 formData로 보냈을 때
      const form = await request.formData();
      const file = form.get("file") as File | null;
      if (file) {
        filename = (file as any).name ?? filename;
        mime = (file as any).type || mime;
        const ab = await (file as File).arrayBuffer();
        buffer = new Uint8Array(ab);
      } else {
        // formData에서 못받으면 바디를 arrayBuffer로 시도
        const ab = await request.arrayBuffer();
        buffer = new Uint8Array(ab);
      }
    } catch (e) {
      // fallback 처리
      try {
        const ab = await request.arrayBuffer();
        buffer = new Uint8Array(ab);
      } catch {
        console.error("이미지 업로드 처리 실패", e);
      }
    }
    const id = `img_${nextImageId++}`;
    imageStore.push({ id, name: filename, mime, buffer });

    // 리턴하는 URL은 상대 경로로 함 (브라우저가 동일 오리진으로 요청 -> MSW가 가로챔)
    const url = `/mock-images/${id}.png`;
    console.log("이미지 업로드 저장: ", { id, filename, mime, size: buffer.byteLength });

    return HttpResponse.json({ id, url, name: filename }, { status: 201 });
  }),

  // 실제 이미지 바이너리 제공: 브라우저가 /mock-images/:id.png로 요청하면 MSW가 응답
  http.get("/mock-images/:id.png", ({ params }) => {
    const { id } = params;
    const img = imageStore.find((i) => i.id === id);
    if (!img) {
      return HttpResponse.json({ message: "이미지 없음" }, { status: 404 });
    }

    // 브라우저에서 요청하는 경우, Response로 바이너리 반환 (Content-Type은 저장된 mime 사용)
    return new Response(img.buffer, {
      status: 200,
      headers: {
        "Content-Type": img.mime,
        "Content-Length": String(img.buffer.byteLength),
      },
    });
  }),

  // 구독자 목록 조회
  http.get("/api/subscribers", () => {
    return HttpResponse.json([
      { id: 1, email: "test1@email.com", subscribedAt: "2025-10-01", status: "subscribed" },
      { id: 2, email: "test2@email.com", subscribedAt: "2025-10-05", status: "unsubscribed" },
      { id: 3, email: "test3@email.com", subscribedAt: "2025-10-10", status: "return" },
      { id: 4, email: "test4@email.com", subscribedAt: "2025-11-01", status: "subscribed" },
      { id: 5, email: "test5@email.com", subscribedAt: "2025-12-01", status: "subscribed" },
    ]);
  }),

  // 구독 취소
  http.delete("/api/subscribers/:id", ({ params }) => {
    const { id } = params;
    console.log(`${id} 번 회원 구독 취소됨`);
    return HttpResponse.json({ message: `${id} 번 회원 구독 취소됨` });
  }),
];
