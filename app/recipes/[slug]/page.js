'use-client';

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { createClient } from "contentful";
import Image from "next/image";
import { notFound } from 'next/navigation';

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

// const getPath = async () => {
//     const res = await 

//     const paths = res.items.map(item => {
//         return {
//             params: { slug: item.fields.slug }
//         }
//     })

//     return {
//         paths
//     }
// }

// async function getData(slug) {

//     const res = await client.getEntries({ content_type: 'recipe', "fields.slug": slug });
//     const data = res.items

//     // The return value is *not* serialized
//     // You can return Date, Map, Set, etc.

//     if (!res.ok) {
//         // This will activate the closest `error.js` Error Boundary
//         console.error('Failed to fetch data')
//     }

//     return data
// }




const RecipeDetails = async ({ params }) => {
    const { slug } = params;
    const { items: recipe } = await client.getEntries({ content_type: 'recipe', "fields.slug": slug });
    if (!recipe.length) return notFound();

    console.log(recipe)
    const { featuredImage, title, cookingTime, ingredients, method } = recipe[0].fields;
    return (
        <div>
            <div className="banner">
                <Image
                    src={`https:${featuredImage.fields.file.url}`}
                    alt={title}
                    width={featuredImage.fields.file.details.image.width}
                    height={featuredImage.fields.file.details.image.height}
                />
                <h2>{title}</h2>
            </div>
            <div className="info">
                <p>Take about {cookingTime} mins to cook.</p>
                <h3>Ingredients: </h3>

                {ingredients.map((ing) => (
                    <span key={ing}>{ing}</span>
                ))}
            </div>
            <div className="method">
                <h3>Method: </h3>
                <div>{documentToReactComponents(method)}</div>
            </div>
        </div>
    )
}

export default RecipeDetails