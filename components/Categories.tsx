import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { getCategories } from '../services';
import { Category } from '../schema';

const Categories = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories().then((cats) => setCategories(cats));
    }, []);

    return (
        <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
            <h3 className="mb-8 border-b pb-4 text-xl font-semibold">Categories</h3>
            {categories.map((cat) => (
                <Link key={cat.slug} href={`/category/${cat.slug}`}>
                    <span className="mb-3 block cursor-pointer pb-3">{cat.name}</span>
                </Link>
            ))}
        </div>
    );
};

export default Categories;
