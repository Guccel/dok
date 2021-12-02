// posts will be populated at build time by getStaticProps()
function products({ posts }) {
  return (
    <>
      {
        posts.map((post) => (
        <li key={post.name}>{post.name} ${post.price}</li>)
        )
      }
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:3001/products')
  const post = await res.json()
  const posts = await post.products

  return {
    props: {
      posts,
    },
  }
}

export default products