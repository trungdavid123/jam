import { createClient } from 'contentful';

export async function GET(req, res) {

    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    });
    
    try {
        const resData = await client.getEntries({ content_type: 'recipe' });
        const data = resData.items

        return Response.json({ data })
    } catch (error) {
        return res.status(404).json({ err: 'Something went wrong' })
    }

}