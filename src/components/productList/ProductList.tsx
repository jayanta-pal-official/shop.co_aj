import React, { FC } from "react";
import { ProductCard } from "../component";
import { Link } from "react-router-dom";
import { product } from "../../types/product";

const ProductList = ({
  heading = "Top Products",
  products = [],
  viewLink = false,
}) => {
  return (
    <section className="bg-white">
      <div className="wrapper py-10 px-5">
        <div className="flex flex-col">
          <h2 className="font-extrabold capitalize py-10 text-center text-4xl">
            {heading}
          </h2>
          {/* map the products */}
          <div className="flex gap-7 flex-wrap justify-center">
            {products?.map((ele) => (
              <ProductCard product={ele} />
            ))}
          </div>
          <div className="flex justify-center py-7">
            {viewLink && (
              <Link
                to={viewLink}
                className=" px-7 btn btn-active rounded-badge"
              >
                View All
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
