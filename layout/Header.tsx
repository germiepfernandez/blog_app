import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { Category } from '../schema';
import { getCategories } from '../services';

const Header = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories().then((cats) => setCategories(cats));
    }, []);

    return (
        <div className="container mx-auto mb-8 px-10">
            <div className="inline-block w-full border-b border-blue-400 py-8">
                <div className="block md:float-left">
                    <Link href="/">
                        <span className="cursor-pointer text-4xl font-bold text-white">
                            GrapmCMS
                        </span>
                    </Link>
                </div>
                <div className="hidden md:float-left md:contents">
                    {categories.map((cat) => (
                        <Link key={cat.slug} href={`/category/${cat.slug}`}>
                            <span className="mt-2 ml-4 cursor-pointer align-middle font-semibold text-white md:float-right">
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Header;
