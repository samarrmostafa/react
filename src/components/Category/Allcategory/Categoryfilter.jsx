import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Categoryfilter() {
    const [categories, setCategories] = useState([]);
    const [expandedCategory, setExpandedCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []); 

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://etafqna-api.onrender.com/api/v1/categories/');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const { data } = await response.json();

            // Fetch subcategories for each category
            const categoriesWithSubcategories = await Promise.all(data.map(async (category) => {
                const subcategoriesResponse = await fetch(`https://etafqna-api.onrender.com/api/v1/categories/${category._id}/subcategories`);
                if (!subcategoriesResponse.ok) {
                    throw new Error(`Failed to fetch subcategories for category ${category._id}`);
                }
                const { data: subcategories } = await subcategoriesResponse.json();
                category.subcategories = subcategories;
                return category;
            }));

            setCategories(categoriesWithSubcategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleCategoryClick = (categoryId) => {
        setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    };

    return (
        <div className="">
            <div className="w-1/4">
                <div className="flex w-[300px] h-[40px] border-2 border-slate-700 rounded-br-lg mt-3 relative">
                    <span className="absolute text-[22px] ml-[75px]">Categories</span>
                </div>
                {categories.map(category => (
                    <div key={category._id} className="my-2">
                        <div
                            className="flex items-center p-2  hover:bg-gray-200 rounded cursor-pointer"
                            onClick={() => handleCategoryClick(category._id)}
                        >
                            {category.image && <img src={category.image.url} alt={category.name} className="w-6 h-6 mr-2" />}
                            <span className="text-gray-800">{category.name}</span>
                        </div>
                        {expandedCategory === category._id && (
                            <div className="ml-8">
                                {category.subcategories && category.subcategories.map(subcategory => (
                                    <Link to={`/${category.slug}/${subcategory.slug}`} key={subcategory._id} className="flex items-center p-2 block hover:bg-gray-100 rounded">
                                        {subcategory.image && <img src={subcategory.image.url} alt={subcategory.name} className="w-5 h-5 mr-2" />}
                                        <span className="text-gray-600">{subcategory.name}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Categoryfilter;
