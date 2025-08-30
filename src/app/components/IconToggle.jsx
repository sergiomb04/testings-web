export default function IconToggle({enabled, enabledIcon, disabledIcon, onClick}) {
    return (
        <button
            onClick={onClick}
            className={`relative w-14 h-8 rounded-full p-1 ${
                enabled ? "bg-green-400" : "bg-gray-400"
            } transition-colors duration-300`}
        >
            <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full flex items-center justify-center text-gray-800 shadow-md transform ${
                    enabled ? "translate-x-6" : "translate-x-0"
                } transition-transform duration-300`}
            >
                {enabled ? enabledIcon : disabledIcon}
            </div>
        </button>
    );
}
