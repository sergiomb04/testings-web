'use client'

export default function GetStartedButton() {
    return (
        <a
            href="/contact"
            className="text-xl font-semibold rounded-4xl border-gray-600 p-2 border w-full max-w-max px-8 m-auto
        transform transition-transform duration-200 hover:scale-105 flex justify-center">
            <button className="cursor-pointer w-full max-w-max">
                LEARN MORE
            </button>
        </a>
    );
}