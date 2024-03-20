import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { createBlogInput } from "@saurabh1274/medium-common-zod";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
		JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>()

blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            c.set("userId", user.id);
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
    } catch(e) {
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
});

blogRouter.post('/', async (c) => {
    const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

	const body = await c.req.json();
	const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
	
    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId
        }
    });
    return c.json({
        id: post.id
    });
})

blogRouter.put('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    const body = await c.req.json();
	prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
})


blogRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	try {
		const blogs = await prisma.post.findMany({
			select: {
				content: true,
				title: true,
				id: true,
				author: {
					select: {
						name: true
					}
				}
			} 
		});
	
		return c.json({
			blogs
		})
	} catch (e) {
		c.status(411);
        return c.json({
            message: "Error while fetching blogs"
        });
	}
})


blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	try {
		const post = await prisma.post.findFirst({
			where: {
				id: id
			},
			select: {
				id: true,
				title: true,
				content: true,
				author: {
					select: {
						name: true
					}
				}
			}
		});
	
		return c.json({post});
	} catch (e) {
		c.status(411); // 4
        return c.json({
            message: "Error while fetching blog post"
        });
	}
})