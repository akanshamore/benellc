// import { Edit } from "./Edit";

export const Products = ({ products }) => {
  return (
    <div>
      <div className="container mx-auto px-4 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800">
                {product.title}
              </h2>
              <p className="text-gray-600 font-medium mt-2">{product.brand}</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                ${product.price}
              </p>
              <p className="text-gray-500 mt-2">{product.description}</p>
              <div className="mt-4 flex gap-2">
                <Edit product={product} />
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">
                  Delete
                </button>
              </div>
            </div>
          ))}{" "}
        </div>
      </div>
    </div>
  );
};
