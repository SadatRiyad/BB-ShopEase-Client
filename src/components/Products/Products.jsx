import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useProducts from '../Hooks/useProducts/useProducts';
import ProductCard from './ProductCard';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';
import "../../index.css";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const Products = () => {
    const [products, , loading] = useProducts();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [priceRange, setPriceRange] = useState([1, 4999]);
    const [priceRange1, setPriceRange1] = useState([1, 4999]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState('dateAddedDesc');

    const resultsPerPage = 9;

    useEffect(() => {
        // Filtering and sorting products based on criteria
        const filterAndSortProducts = products
            .filter(product => {
                return (
                    (selectedCategory ? product.category === selectedCategory : true) &&
                    (selectedBrand ? product.brand === selectedBrand : true) &&
                    (product.price >= priceRange[0] && product.price <= priceRange[1] || product.price >= priceRange && product.price <= priceRange1)
                );
            })
            .sort((a, b) => {
                if (sortOption === 'priceLowHigh') {
                    return a.price - b.price;
                } else if (sortOption === 'priceHighLow') {
                    return b.price - a.price;
                } else if (sortOption === 'dateAddedDesc') {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                } else if (sortOption === 'dateAddedAsc') {
                    return new Date(a.createdAt) - new Date(b.createdAt);
                } else {
                    return 0;
                }
            });
        setFilteredProducts(filterAndSortProducts);
    }, [products, selectedCategory, selectedBrand, priceRange, sortOption]);

    // Paginate filtered products
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstResult, indexOfLastResult);

    // Handle search
    const handleSearch = (e) => {
        const search = e.target.value;
        const searchedProducts = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
        setFilteredProducts(searchedProducts);
        setCurrentPage(1); // Reset to first page
    }

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === 'priceRange') {
            setPriceRange(value.split(',').map(Number));
            setPriceRange1(value.split(',').map(Number));
        } else if (name === 'category') {
            setSelectedCategory(value);
        } else if (name === 'brand') {
            setSelectedBrand(value);
        } 
        setCurrentPage(1); // Reset to first page
    };

    // Handle sort changes
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        setCurrentPage(1); // Reset to first page
    };

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return <div className="flex text-center items-center justify-center h-dvh w-dvw">Loading...</div>;
    }

    const totalPages = Math.ceil(filteredProducts.length / resultsPerPage);

    return (
        <div id='products' className="grid pt-12 bg-slate-100 container mx-auto px-4 min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Helmet>
                <title>Products | BB-ShopEase</title>
            </Helmet>

            <div className="flex h-full max-h-screen flex-col pt-6 gap-2 md:pr-4">
                <h2 className="text-4xl font-bold mb-2 mt-4 md:mt-0">Filters</h2>

                <div className="mb-4 border-2 border-customGulabi p-2 px-4 bg-slate-200">
                    <div className='justify-between flex items-center mb-0'>
                        <label className="block mb-1px font-medium">Price Range: {priceRange[0]} {priceRange1[1] ? '-' : ""} {priceRange[1]}</label>
                        <Button
                            onClick={() => {
                                setPriceRange([1, 4999]);
                                setPriceRange1([1, 4999]);
                            }}
                            className="bg-customGulabi m-0 text-white py-0 rounded-full text-xs"
                        >Reset</Button>
                    </div>
                    <input
                        type="range"
                        name="priceRange"
                        min="1"
                        max="4999"
                        value={priceRange.join(',')}
                        onChange={handleFilterChange}
                        className="w-full custom-range"
                        multiple
                    />
                    <div className="flex justify-between">
                        <span>$1</span>
                        <span>$4999</span>
                    </div>
                </div>

                <div className="mb-4 border-2 border-customGulabi p-2 px-4 bg-slate-200">
                    <label className="block mb-2 font-medium">Category:</label>
                    <select name="category" value={selectedCategory} onChange={handleFilterChange} className="w-full border-2 border-customGulabi p-2 rounded-full">
                        <option value="">All</option>
                        <option value="Televisions">Televisions</option>
                        <option value="Laptops">Laptops</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Audio">Audio</option>
                        <option value="Home">Home</option>
                        {/* Add more categories as needed */}
                    </select>
                </div>

                <div className="mb-4 border-2 border-customGulabi p-2 px-4 bg-slate-200">
                    <label className="block mb-2 font-medium">Brand:</label>
                    <select name="brand" value={selectedBrand} onChange={handleFilterChange} className="w-full border-2 border-customGulabi p-2 rounded-full">
                        <option value="">All</option>
                        <option value="Apple">Apple</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Sony">Sony</option>
                        <option value="Bose">Bose</option>
                        <option value="HyperX">HyperX</option>
                        {/* Add more brands as needed */}
                    </select>
                </div>

                <div className="mb-4 border-2 border-customGulabi p-2 px-4 bg-slate-200">
                    <label className="block mb-2 font-medium">Sort By:</label>
                    <select value={sortOption} onChange={handleSortChange} className="w-full border-2 border-customGulabi p-2 rounded-full">
                        <option value="dateAddedDesc">Date Added: Newest First</option>
                        <option value="dateAddedAsc">Date Added: Oldest First</option>
                        <option value="priceLowHigh">Price: Low to High</option>
                        <option value="priceHighLow">Price: High to Low</option>
                    </select>
                </div>

            </div>

            <div className="w-full h-fit pt-6 md:pl-5 md:border-l-4 min-h-dvh">
                <div className='grid w-full grid-cols-1 md:grid-cols-2 text-center md:text-left items-center'>
                    <div className='w-full flex justify-between'>
                        <h2 className="text-2xl font-bold mb-2 md:mb-5">Total Products: <span className='text-customGulabi'>{products.length}</span></h2>
                        <h2 className="text-2xl font-bold mb-2 md:mb-5 ml-4">Products Found: <span className='text-customGulabi'>{filteredProducts.length}</span></h2>
                    </div>
                    <div className="w-full flex-1">
                        <form>
                            <div className="relative justify-end items-end flex mb-8 md:mb-5">
                                <Search className="absolute right-3.5 top-[14px] h-4 w-4 text-muted-foreground" />
                                <input
                                    type="search"
                                    placeholder="Search by Product Name"
                                    className="w-full border-2 p-2 rounded-full border-customGulabi  appearance-none bg-background pr-8 pl-4 shadow-none md:w-fit lg:w-2/3"
                                    onChange={handleSearch}
                                />
                            </div>
                        </form>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {currentProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>

                {totalPages > 1 && (
                    <Pagination className="my-8 w-fit text-white rounded-lg">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="bg-customBlue border border-customBlue cursor-pointer"
                                />
                            </PaginationItem>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        onClick={() => handlePageChange(index + 1)}
                                        className={currentPage === index + 1 ? 'pagination-link active border border-customBlue cursor-not-allowed' : 'pagination-link border border-customBlue bg-customBlue text-white cursor-pointer'}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="bg-customBlue border border-customBlue cursor-pointer"
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </div>
    );
};

export default Products;