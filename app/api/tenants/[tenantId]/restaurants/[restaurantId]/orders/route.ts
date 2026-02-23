import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tenantId: string; restaurantId: string }> }
) {
  const { tenantId, restaurantId } = await params;
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '200';
  const kind = searchParams.get('kind');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const status = searchParams.get('status');

  // Stub response – replace with real orders list logic
  return NextResponse.json({
    tenantId,
    restaurantId,
    page: Number(page),
    limit: Number(limit),
    kind: kind ?? null,
    startDate: startDate ?? null,
    endDate: endDate ?? null,
    status: status ?? null,
    data: [],
    total: 0,
  });
}
