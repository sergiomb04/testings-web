export default function InfoCard({icon, title, description, hrefText, href}) {
    return (
        <div className={"flex flex-col border-gray-600 border-1 rounded-xl gap-4 p-6 w-[320px] h-max"}>
            <div className={"pb-8"}>
                <div className={"p-2 rounded-xl border-1 border-gray-600 w-max h-max"}>
                    {icon}
                </div>
            </div>

            <div>
                <h3 className={"font-semibold text-2xl pb-1"}>{title}</h3>
                <p>{description}</p>
            </div>

            <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="font-semibold underline h-max"
            >
                {hrefText}
            </a>
        </div>
    )
}