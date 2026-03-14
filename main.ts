const hosts: Record<string, string> = {
  'target.local': '127.0.0.1',
  'admin.internal': '10.0.0.1',
  'api.internal': '10.0.0.2',
  'db.internal': '10.0.0.3',
  'localhost': '127.0.0.1',
  '127.0.0.1': '127.0.0.1',
};

Deno.serve((req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const host = (req.headers.get('host') || req.headers.get('x-forwarded-host') || '').split(':')[0].toLowerCase();
  const ip = hosts[host] || '127.0.0.1';

  const accept = req.headers.get('accept') || '';
  if (accept.includes('html')) {
    return new Response(`
      <html><body style="font-family:monospace;padding:2em;">
        <h1>🚀 Ultra Fast Hosts (14ms edge)</h1>
        <p><strong>Host:</strong> ${host}</p>
        <p><strong>IP:</strong> <code style="font-size:2em;background:#000;color:#0f0;padding:0.5em">${ip}</code></p>
        <details><summary>Test domains:</summary>
          <code>target.local → 127.0.0.1<br>
          admin.internal → 10.0.0.1<br>
          api.internal → 10.0.0.2</code>
        </details>
      </body></html>
    `, { headers: { ...corsHeaders, 'Content-Type': 'text/html' } });
  }

  return new Response(ip, { headers: { ...corsHeaders, 'Content-Type': 'text/plain' } });
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Host,X-Forwarded-Host,Content-Type',
};
