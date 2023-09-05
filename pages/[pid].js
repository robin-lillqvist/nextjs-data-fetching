import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

function ProductDetails(props) {
  const { loadedProduct } = props;

  // Fallback function in case the product is not loaded yet
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  // Save params from url/context and save them
  const { params } = context;
  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  /* If there is no product, 
  send notFound to the page so it shows he 404 page instead. */
  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    fallback: true,

    // Blocking makes fallbacks obsolete, and waits until the page loads regularly
    // fallback: "blocking",

    /* Makes use of a fallback function inside the component
    Use this if you believe you will get pageloads of nonexistent pages */
    // fallback: true,

    // fallback: false,
  };
}

export default ProductDetails;
