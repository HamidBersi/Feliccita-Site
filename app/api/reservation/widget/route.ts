import { customizeDishWidgetHtml, fetchDishWidgetHtml } from "@/lib/dish-reservation";
import { routing } from "@/i18n/routing";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const langParam = searchParams.get("lang") ?? routing.defaultLocale;
  const lang = routing.locales.includes(langParam as (typeof routing.locales)[number])
    ? langParam
    : routing.defaultLocale;

  try {
    const html = await fetchDishWidgetHtml(lang);
    const customized = customizeDishWidgetHtml(html, lang);

    return new Response(customized, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new Response("Unable to load reservation widget.", { status: 502 });
  }
}
