const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Private-Network": "true",
};

Deno.serve(async (req: Request) => {

  // Handle OPTIONS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const url = new URL(req.url);
  const pathname = decodeURIComponent(url.pathname);

  // Serve files from /Public
  if (pathname.startsWith("/Public/")) {
    try {
      const filePath = `.${pathname}`; // relative to project root
      const fileContent = await Deno.readTextFile(filePath);
      return new Response(fileContent, {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/javascript",
        }
      });
    } catch (err) {
      return new Response("File not found", { status: 404, headers: corsHeaders });
    }
  }

  // Default homepage
  if (pathname === "/") {
    return new Response("Deno VIP Server Running", { headers: corsHeaders });
  }

  return new Response("404 Not Found", { status: 404, headers: corsHeaders });
});
