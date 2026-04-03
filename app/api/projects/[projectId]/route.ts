import { errorResponse } from '@/lib/api/errors';
import { requireUser } from '@/lib/auth/guards';
import { prisma } from '@/lib/db/prisma';

type Context = {
  params: Promise<{ projectId: string }>;
};

export async function GET(_request: Request, context: Context) {
  try {
    const user = await requireUser();
    if (!user) {
      return errorResponse('UNAUTHORIZED', 'Not authenticated.', 401);
    }

    const { projectId } = await context.params;
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: user.id,
      },
      select: {
        id: true,
        title: true,
        sourceType: true,
        sourceText: true,
        language: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!project) {
      return errorResponse('NOT_FOUND', 'Project not found.', 404);
    }

    return Response.json({ project }, { status: 200 });
  } catch {
    return errorResponse('INTERNAL_ERROR', 'Project retrieval failed.', 500);
  }
}
