import fs from "fs/promises";
import path from "path";

import Link from "next/link";

function Home(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
  b;
}

// function that prefetches data and sends it to the parent function/class
export async function getStaticProps(context) {
  console.log("Re-generating");
  //-----------------------  start dir     directory       filename
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return { redirect: { destination: "/no-data" } };
  }

  // Show 404 page if no products are available
  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default Home;
