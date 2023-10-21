import RecipeCard from '@/components/RecipeCard';

async function getData() {
  try {
    const res = await fetch(`${process.env.PRODUCTION_URL}/api/posts`, { next: { revalidate: 10 } })
    const data = res.json();

    return data

  } catch (error) {
    console.error('Failed to fetch data' + error)

  }
}

export default async function Home() {
  const { data } = await getData()

  return (
    <main className='recipe-list'>
      {data?.length ? data.map(recipe => (
        <RecipeCard key={recipe.sys.id} recipe={recipe} />
      )) : <p>Loading...</p>}
    </main>
  )
}
