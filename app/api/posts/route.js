import { createClient } from 'contentful';

export async function GET() {

    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    });

    const res = await client.getEntries({ content_type: 'recipe' });
    const data = res.items


    return Response.json({ data })
}