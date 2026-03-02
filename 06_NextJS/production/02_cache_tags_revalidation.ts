import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

// Beginner: manually trigger cache revalidation after data changes.
// Advanced: cache tags scale better than path-only invalidation in large apps.
export async function POST() {
  revalidateTag('products');

  return NextResponse.json({
    ok: true,
    message: 'Product cache tag revalidated'
  });
}
