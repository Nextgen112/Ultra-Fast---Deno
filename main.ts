const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Private-Network": "true",
};

Deno.serve((req: Request) => {

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  const url = new URL(req.url);

  // -----------------------------
  // VIP SCRIPT
  // -----------------------------
  if (url.pathname === "/Public/VIP.js") {

    const js = `
console.log("VIP script loaded from Deno server");

// Example code
window.NEXTGEN_VIP = true;

console.log("NextGen VIP active");
`;

    return new Response(js, {
      headers: {
        ...corsHeaders,
        "content-type": "application/javascript"
      }
    });
  }

  // -----------------------------
  // HOME PAGE
  // -----------------------------
  if (url.pathname === "/") {

    const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Deno VIP Server</title>

<style>
body{
background:#0d1117;
color:#e6edf3;
font-family:Arial;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
margin:0;
}

.card{
background:#161b22;
padding:40px;
border-radius:12px;
box-shadow:0 10px 40px rgba(0,0,0,.6);
width:420px;
text-align:center;
}

h1{
margin-top:0;
color:#58a6ff;
}

.code{
background:#010409;
padding:12px;
border-radius:6px;
font-family:monospace;
margin-top:10px;
}
</style>

</head>

<body>

<div class="card">
<h1>Deno VIP Server</h1>

<p>Server running successfully.</p>

<p>VIP Script URL:</p>

<div class="code">
/Public/VIP.js
</div>

</div>

</body>
</html>
`;

    return new Response(html, {
      headers: {
        ...corsHeaders,
        "content-type": "text/html"
      }
    });
  }

  // -----------------------------
  // DEFAULT RESPONSE
  // -----------------------------
  return new Response("404 Not Found", {
    status: 404,
    headers: corsHeaders
  });

});
