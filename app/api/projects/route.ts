import { errorResponse } from '@/lib/api/errors';
import { requireUser } from '@/lib/auth/guards';
import { prisma } from '@/lib/db/prisma';
import { parseCreateProjectPayload } from '@/lib/validation/projects';

export async function GET() {
  try {
    const user = await requireUser();
    if (!user) {
      return errorResponse('UNAUTHORIZED', 'Not authenticated.', 401);
    }

    const items = await prisma.project.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        title: true,
        sourceType: true,
        language: true,
        updatedAt: true,
      },
    });

    return Response.json({ items }, { status: 200 });
  } catch {
    return errorResponse('INTERNAL_ERROR', 'Project listing failed.', 500);
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    if (!user) {
      return errorResponse('UNAUTHORIZED', 'Not authenticated.', 401);
    }

    const payload = parseCreateProjectPayload(await request.json());
    if (!payload) {
      return errorResponse('VALIDATION_ERROR', 'Invalid project payload.', 400);
    }

    const project = await prisma.project.create({
      data: {
        userId: user.id,
        title: payload.title,
        sourceType: payload.sourceType,
        sourceText: payload.sourceText,
        language: payload.language,
      },
      select: {
        id: true,
        title: true,
        sourceType: true,
        language: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return Response.json({ project }, { status: 201 });
  } catch {
    return errorResponse('INTERNAL_ERROR', 'Project creation failed.', 500);
  }
}
