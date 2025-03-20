export async function GET() {
  const res = await fetch(
    `${process.env.WORDPRESS_API_URL}/wc/v3/products`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.WOO_API_KEY}:${process.env.WOO_API_SECRET}`).toString("base64")}`,
      }
    }
  );

  if (!res.ok) {
    return new Response(JSON.stringify({ error: "WooCommerce API nicht erreichbar" }), { status: 500 });
  }

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: 200 });
}
