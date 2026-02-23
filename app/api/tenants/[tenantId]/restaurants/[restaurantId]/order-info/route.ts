import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tenantId: string; restaurantId: string }> }
) {
  const { tenantId, restaurantId } = await params;
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  // Stub response – replace with real order-info logic
  return NextResponse.json({
    tenantId,
    restaurantId,
    startDate: startDate ?? null,
    endDate: endDate ?? null,
    totalOrders: 0,
    totalRevenue: 0,
  });
}
