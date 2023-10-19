import RecipeCard from '@/components/RecipeCard';
import { createClient } from 'contentful';

async function getData() {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: 'recipe' });
  const data = res.items

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.error('Failed to fetch data')
  }

  return data
}

export default async function Home() {
  const data = await getData()

  return (
    <main className='recipe-list'>
      {data.map(recipe => (
        <RecipeCard key={recipe.sys.id} recipe={recipe} />
      ))}
    </main>
  )
}
