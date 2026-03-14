export default {
  async fetch(request) {
    const url = new URL(request.url);
    const host = request.headers.get('host')?.split(':')[0]?.toLowerCase() || 
                 url.searchParams.get('host') || '';
    
    const hosts = {
      'target.local': '127.0.0.1',
      'admin.internal': '10.0.0.1',
      'hackme.com': '192.168.1.100',
      'ssrf.local': '172.16.0.1'
    };
    
    const ip = hosts[host] || '127.0.0.1';
    
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': '*'
    };
    
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    return new Response(ip, {
      headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
    });
  }
};
