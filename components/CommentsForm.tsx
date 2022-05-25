import React, { useEffect, useRef, useState } from 'react';
import { submitComment } from '../services';

interface Props {
    slug?: string;
}
const CommentsForm = ({ slug = '' }: Props) => {
    const [error, setError] = useState(false);
    // const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const commentEl = useRef<HTMLTextAreaElement>(null);
    const nameEl = useRef<HTMLInputElement>(null);
    const emailEl = useRef<HTMLInputElement>(null);
    const storeDataEl = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (nameEl.current && emailEl.current && storeDataEl.current) {
            nameEl.current.value = window.localStorage.getItem('name') ?? '';
            emailEl.current.value = window.localStorage.getItem('email') ?? '';
        }
    }, []);

    const handleSubmit = () => {
        setError(false);
        if (commentEl.current && nameEl.current && emailEl.current && storeDataEl.current) {
            const { value: comment } = commentEl.current;
            const { value: name } = nameEl.current;
            const { value: email } = emailEl.current;
            const { checked: storeData } = storeDataEl.current;

            if (!comment || !name || !email) {
                setError(true);
                return;
            }

            if (storeData) {
                localStorage.setItem('name', name);
                localStorage.setItem('email', email);
            } else {
                localStorage.removeItem('name');
                localStorage.removeItem('email');
            }

            submitComment({ name, email, comment }, slug).then((res) => {
                setShowSuccessMessage(true);
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 3000);
            });

            return;
        }

        setError(true);
    };

    return (
        <div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
            <h3 className="mb-8 border-b pb-4 text-xl font-semibold">Leave a Reply</h3>
            <div className="mb-4 grid grid-cols-1 gap-4">
                <textarea
                    ref={commentEl}
                    className="focus:ring-gray-2 w-full rounded-lg bg-gray-100 p-4 text-gray-700 outline-none focus:ring-2"
                    placeholder="Comment"
                    name="comment"
                />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <input
                    ref={nameEl}
                    className="focus:ring-gray-2 w-full rounded-lg bg-gray-100 py-2 px-4 text-gray-700 outline-none focus:ring-2"
                    placeholder="Name"
                    name="name"
                />
                <input
                    ref={emailEl}
                    className="focus:ring-gray-2 w-full rounded-lg bg-gray-100 py-2 px-4 text-gray-700 outline-none focus:ring-2"
                    placeholder="Email"
                    name="email"
                />
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4">
                <div>
                    <input
                        ref={storeDataEl}
                        type="checkbox"
                        id="storeData"
                        name="storeData"
                        value="true"
                    />
                    <label htmlFor="storeData" className="ml-2 cursor-pointer text-gray-500">
                        Save my e-mail and name for the next time I comment.
                    </label>
                </div>
            </div>
            {error && <p className="text-xs text-red-500">All fields are required.</p>}
            <div className="mt-8">
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="ease inline-block cursor-pointer rounded-full bg-pink-600 px-8 py-3 text-lg text-white transition duration-500 hover:bg-indigo-900"
                >
                    Post Comment
                </button>
                {showSuccessMessage && (
                    <span className="float-right mt-3 text-xl font-semibold text-green-500">
                        Comment submitted for review
                    </span>
                )}
            </div>
        </div>
    );
};

export default CommentsForm;
