// CardsList.jsx
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";
import React, { useState, useEffect } from "react";

const CardList = ({data}) => {
  const limit = 10;
  const defaultDataset = data.slice(0, limit);

  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(defaultDataset);
  const [filteredData, setFilteredData] = useState(data);

  const handlePagination = (direction) => {
    setOffset((prevOffset) => {
      const newOffset = prevOffset + direction * limit;
      return newOffset >= 0 && newOffset < filteredData.length ? newOffset : prevOffset;
    });
  };

  const filterTags = (searchTerm) => {
    console.log(searchTerm);
    // searchTerm = String(searchTerm);
    if (!searchTerm) {
      setFilteredData(data);
    } else {
      const filtered = data.filter((product) =>
        product.tags.some((tag) => tag.title.toLowerCase().includes(searchTerm))
      );
      setFilteredData(filtered);
    }
    setOffset(0);
  }

  useEffect(() => {
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, limit, filteredData]);

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      
      <div className="flex items-center justify-center pa4">   
        <Button text="Previous" handleClick={() => handlePagination(-1)} />
        <Button text="Next" handleClick={() => handlePagination(1)} />
      </div>
    </div>
  )
}

export default CardList;