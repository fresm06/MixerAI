// Cloudflare Pages Function — /api/recommend
// API 키는 Cloudflare 대시보드 환경변수(GEMINI_API_KEY)에서만 읽음
// 클라이언트에게 키가 절대 노출되지 않음

export async function onRequestPost(context) {
  const { request, env } = context;

  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: { message: 'GEMINI_API_KEY 환경변수가 설정되지 않았습니다.' } },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: { message: '잘못된 요청 형식입니다.' } }, { status: 400 });
  }

  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const upstream = await fetch(geminiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await upstream.json();
  return Response.json(data, { status: upstream.status });
}
