import React, { useContext, useEffect, useState } from "react";
import ProductsCard from "./ProductCart";
import { productsContext } from "../GlobalComponents/ProductContextProvider";

import { useSearchParams } from "react-router-dom";
import { Pagination } from "@mui/material";

const ProductsList = () => {
  const { getProducts, productsArr, pageTotalCount } =
    useContext(productsContext);

  const [searchParams, setSearchParams] = useState("");
  // Хук useSearchParams предназначен для чтения и изменения строки запроса в URL для текущего маршрута. По аналогии с хуком useState возвращает значение и функцию для изменения этого значения.
  //   https://tokmakov.msk.ru/blog/item/678#:~:text=useSearchParams,%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D1%8E%20%D0%B4%D0%BB%D1%8F%20%D0%B8%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F%20%D1%8D%D1%82%D0%BE%D0%B3%D0%BE%20%D0%B7%D0%BD%D0%B0%D1%87%D0%B5%D0%BD%D0%B8%D1%8F.

  // console.log(searchParams);

  const [page, setPage] = useState(1);

  const paramsWithType = () => {
    return {
      q: searchParams.get("q") || "",

      _page: page,
      _limit: 6,
    };
  };

  const paramsNoType = () => {
    return {
      q: searchParams.get("q") || "",

      _page: page,
      _limit: 6,
    };
  };

  useEffect(() => {
    // getProducts();
    if (searchParams.get("category")) {
      setSearchParams(paramsWithType());
    } else {
      setSearchParams(paramsNoType());
    }
  }, []);

  useEffect(() => {
    getProducts();
  }, [searchParams, page]);

  return (
    <>
      <div
        style={{
          padding: "20px 0",
        }}
        className="bgList"
      >
        <h2>Наши телефоны</h2>
        <div className="main_box">
          <div className="container1">
            {productsArr.map((item) => (
              <ProductsCard product={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center my-4">
        <Pagination
          count={+pageTotalCount}
          variant="outlined"
          color="primary"
          shape="rounded"
          page={+page}
          onChange={(e, pageVal) => {
            setPage(pageVal);
          }}
        />
      </div>
    </>
  );
};

export default ProductsList;
