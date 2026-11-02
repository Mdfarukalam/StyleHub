import { Search } from "lucide-react";

function CommonSearch({ search, setSearch, placeholder = "Search..." }) {
  return (
    <div className="relative w-full lg:w-[320px]">
      <Search
        size={18}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
      />

      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full h-[42px] pl-10 pr-4 bg-[#181b21] border border-[#2a2e36] rounded-lg text-sm text-gray-200 outline-none placeholder:text-gray-500 focus:border-gray-500 transition"
      />
    </div>
  );
}

export default CommonSearch;