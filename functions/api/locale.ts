type RequestWithCloudflareCountry = Request & {
  cf?: { country?: string };
};

export async function onRequest({ request }: { request: Request }) {
  const url = new URL(request.url);
  const requestedCountry = url.searchParams.get("country")?.toUpperCase();
  const cloudflareCountry = (request as RequestWithCloudflareCountry).cf?.country?.toUpperCase();
  const country = requestedCountry && /^[A-Z]{2}$/.test(requestedCountry)
    ? requestedCountry
    : cloudflareCountry || "US";

  return new Response(JSON.stringify({
    country,
    locale: country === "VN" ? "vi" : "en",
  }), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
