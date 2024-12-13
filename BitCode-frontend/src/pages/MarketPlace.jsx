import React from "react";
import { Link } from "react-router-dom";

function MarketPlace() {
  const items = [
    {
      id: 1,
      name: "Product 1",
      description: "Description for product 1",
      price: 29.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description for product 2",
      price: 39.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Product 3",
      description: "Description for product 3",
      price: 49.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Product 4",
      description: "Description for product 4",
      price: 59.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Product 5",
      description: "Description for product 5",
      price: 69.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      name: "Product 6",
      description: "Description for product 6",
      price: 79.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 7,
      name: "Product 7",
      description: "Description for product 7",
      price: 89.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 8,
      name: "Product 8",
      description: "Description for product 8",
      price: 99.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 9,
      name: "Product 9",
      description: "Description for product 9",
      price: 109.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 10,
      name: "Product 10",
      description: "Description for product 10",
      price: 119.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 11,
      name: "Product 11",
      description: "Description for product 11",
      price: 129.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 12,
      name: "Product 12",
      description: "Description for product 12",
      price: 139.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 13,
      name: "Product 13",
      description: "Description for product 13",
      price: 149.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 14,
      name: "Product 14",
      description: "Description for product 14",
      price: 159.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 15,
      name: "Product 15",
      description: "Description for product 15",
      price: 169.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 16,
      name: "Product 16",
      description: "Description for product 16",
      price: 179.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 17,
      name: "Product 17",
      description: "Description for product 17",
      price: 189.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 18,
      name: "Product 18",
      description: "Description for product 18",
      price: 199.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 19,
      name: "Product 19",
      description: "Description for product 19",
      price: 209.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 20,
      name: "Product 20",
      description: "Description for product 20",
      price: 219.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 21,
      name: "Product 21",
      description: "Description for product 21",
      price: 229.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 22,
      name: "Product 22",
      description: "Description for product 22",
      price: 239.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 23,
      name: "Product 23",
      description: "Description for product 23",
      price: 249.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 24,
      name: "Product 24",
      description: "Description for product 24",
      price: 259.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 25,
      name: "Product 25",
      description: "Description for product 25",
      price: 269.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 26,
      name: "Product 26",
      description: "Description for product 26",
      price: 279.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 27,
      name: "Product 27",
      description: "Description for product 27",
      price: 289.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 28,
      name: "Product 28",
      description: "Description for product 28",
      price: 299.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 29,
      name: "Product 29",
      description: "Description for product 29",
      price: 309.99,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 30,
      name: "Product 30",
      description: "Description for product 30",
      price: 319.99,
      image: "https://via.placeholder.com/150",
    },
  ];

  // Limit items to 30 (3 items per row * 10 rows)
  const limitedItems = items.slice(0, 30);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="mb-5 ml-20 text-3xl font-bold">Marketplace</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {limitedItems.map((item) => (
          <div key={item.id} className="p-4 border rounded-lg shadow-lg">
            <img
              src={item.image}
              alt={item.name}
              className="object-cover w-full h-48 mb-4"
            />
            <h2 className="mb-2 text-xl font-semibold">{item.name}</h2>
            <p className="mb-4 text-gray-700">{item.description}</p>
            <p className="mb-4 text-lg font-bold">${item.price.toFixed(2)}</p>
            <div className="flex items-center justify-between">
              <Link
                to={`/marketplace/item/${item.id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
              <Link to={{
                  pathname: "/checkout",
                  search: `?productId=${item.id}&price=${item.price.toFixed(2)}`,
                }}>
                <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                  Buy
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketPlace;
