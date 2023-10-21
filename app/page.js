import RecipeCard from '@/components/RecipeCard';

async function getData() {


  const res = await fetch(`${process.env.PRODUCTION_URL}/api/posts`, { next: { revalidate: 10 } })
  const data = res.json();

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    console.error('Failed to fetch data')
  }

  return data
}

export default async function Home() {
  const { data } = await getData()

  return (
    <main className='recipe-list'>
      {data ? data.map(recipe => (
        <RecipeCard key={recipe.sys.id} recipe={recipe} />
      )) : <p>Loading...</p>}
    </main>
  )
}
