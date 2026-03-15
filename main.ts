const hosts: Record<string, string> = {
  "target.local": "127.0.0.1",
  "admin.internal": "10.0.0.1",
  "api.internal": "10.0.0.2",
  "db.internal": "10.0.0.3",
  "localhost": "127.0.0.1",
  "127.0.0.1": "127.0.0.1",
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Private-Network": "true",
};

Deno.serve((req: Request) => {

  if (req.method === "OPTIONS") {
    return new Response(null,{status:204,headers:corsHeaders});
  }

  const host =
    (req.headers.get("host") ||
    req.headers.get("x-forwarded-host") ||
    "").split(":")[0].toLowerCase();

  const ip = hosts[host] || "127.0.0.1";

  const accept = req.headers.get("accept") || "";

  if (accept.includes("html")) {
    return new Response(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Ultra Fast Edge Server</title>

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

.ip{
font-size:28px;
background:#010409;
padding:10px;
border-radius:6px;
margin:15px 0;
color:#3fb950;
}

.list{
text-align:left;
background:#010409;
padding:15px;
border-radius:6px;
font-family:monospace;
}

footer{
margin-top:20px;
font-size:12px;
opacity:.6;
}
</style>

</head>

<body>

<div class="card">
<h1>Ultra Fast Edge</h1>

<p>Detected Host</p>
<div class="ip">${host}</div>

<p>Resolved IP</p>
<div class="ip">${ip}</div>

<div class="list">
target.local  -> 127.0.0.1<br>
admin.internal -> 10.0.0.1<br>
api.internal  -> 10.0.0.2<br>
db.internal   -> 10.0.0.3
</div>

<footer>Deno Edge Server</footer>
</div>

</body>
</html>
`,{
headers:{...corsHeaders,"content-type":"text/html"}
});
  }

  return new Response(ip,{
headers:{...corsHeaders,"content-type":"text/plain"}
});
});
