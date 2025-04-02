export const Search = ({ handleSearchText }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <input
        type="text"
        placeholder="Search products..."
        onChange={handleSearchText}
        className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
