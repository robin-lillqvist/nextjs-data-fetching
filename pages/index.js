import fs from "fs/promises";
import path from "path";

function Home(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
  b;
}

// function that prefetches data and sends it to the parent function/class
export async function getStaticProps() {
  //-----------------------  start dir     directory       filename
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
  };
}

export default Home;
