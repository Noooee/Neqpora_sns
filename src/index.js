export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // API確認用
    if (url.pathname === "/api/hello") {
      return Response.json({
        success: true,
        service: "Neqpora",
        message: "Neqpora API is working!"
      });
    }

    // 静的ファイルを返す
    return env.ASSETS.fetch(request);
  }
};
