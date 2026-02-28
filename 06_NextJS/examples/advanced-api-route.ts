import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Imaginary Prisma/Drizzle ORM instance
import { verifyAuthToken } from '@/lib/auth'; // Imaginary JWT verifier

/**
 * ==========================================
 * NEXT.JS 14 APP ROUTER API ROUTE
 * ==========================================
 * File location: /app/api/movies/route.ts
 * 
 * Demonstrates:
 * 1. Edge-ready Route Handlers
 * 2. Proper HTTP Status Codes
 * 3. Zod Schema Validation (Security against bad input)
 * 4. Authentication Middleware logic
 * 5. Caching & Revalidation controls
 */

// Example Zod schema for validating the incoming JSON body
import { z } from 'zod';

const createMovieSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    year: z.number().int().min(1888).max(new Date().getFullYear()),
    director: z.string().min(1)
});

// ----------------------------------------------------------------------
// GET: Retrieve a paginated list of movies (Read)
// ----------------------------------------------------------------------
export async function GET(request) {
    try {
        // 1. Extract query parameters from the URL: /api/movies?page=1&limit=20
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') ?? '1', 10);
        const limit = parseInt(searchParams.get('limit') ?? '20', 10);

        // Quick security check against massive queries
        if (limit > 100) {
            return NextResponse.json(
                { error: "Maximum limit is 100" },
                { status: 400 } // HTTP 400 Bad Request
            );
        }

        const skip = (page - 1) * limit;

        // 2. Query the database using the ORM
        // Example: Prisma syntax
        const [movies, total] = await Promise.all([
            db.movie.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            db.movie.count()
        ]);

        // 3. Return a successful 200 response with pagination metadata
        return NextResponse.json({
            data: movies,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        }, {
            status: 200,
            // Optional: Control CDN caching
            // headers: {
            //   'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
            // }
        });

    } catch (error) {
        console.error('[GET /api/movies]', error);
        // Don't leak exact DB error strings to the client in production!
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// ----------------------------------------------------------------------
// POST: Create a new movie (Write)
// ----------------------------------------------------------------------
export async function POST(request) {
    try {
        // 1. Authentication Check
        // Get the JWT from the Authorization header: `Bearer eyJ...`
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const user = await verifyAuthToken(token);

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
        }

        // Role-based Access Control (RBAC) - strict authorization check
        if (user.role !== 'ADMIN' && user.role !== 'EDITOR') {
            return NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 });
        }

        // 2. Parse and Validate the Request Body
        const body = await request.json();

        // Zod throws an error if validation fails
        const validatedData = createMovieSchema.parse(body);

        // 3. Write to the Database
        const newMovie = await db.movie.create({
            data: {
                title: validatedData.title,
                year: validatedData.year,
                director: validatedData.director,
                createdBy: user.id // Audit trail
            },
        });

        // 4. Return successful 201 Created response
        return NextResponse.json(
            { data: newMovie, message: "Movie created successfully" },
            { status: 201 } // HTTP 201 Created
        );

    } catch (error) {
        console.error('[POST /api/movies]', error);

        // Catch Zod Validation Errors cleanly
        if (error instanceof z.ZodError) {
            return NextResponse.json({
                error: "Validation Failed",
                details: error.errors
            }, { status: 400 });
        }

        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
