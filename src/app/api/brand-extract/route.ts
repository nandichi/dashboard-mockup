import { NextRequest, NextResponse } from 'next/server';
import { extractBrandAssets } from 'openbrand';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body as { url?: string };

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL is vereist' }, { status: 400 });
    }

    let normalizedUrl = url.trim();
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    const result = await extractBrandAssets(normalizedUrl);

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error ?? 'Kon de brand assets niet ophalen' },
        { status: 502 }
      );
    }

    const data = result.data;

    const logos = (data.logos ?? []).map((logo: { url: string; type?: string }) => ({
      url: logo.url,
      type: logo.type ?? 'logo',
    }));

    const colors = (data.colors ?? []).map((color: { hex: string; usage?: string }) => ({
      hex: color.hex,
      usage: color.usage ?? 'other',
    }));

    const backdrops = (data.backdrop_images ?? []).map((img: { url: string; description?: string }) => ({
      url: img.url,
      description: img.description ?? '',
    }));

    return NextResponse.json({
      brandName: data.brand_name ?? '',
      logos,
      colors,
      backdrops,
      description: '',
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Onbekende fout';
    return NextResponse.json({ error: `Extractie mislukt: ${message}` }, { status: 500 });
  }
}
