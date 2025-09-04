export default function PanelButton({displayText}) {
    return (
        <a className={"bg-neutral-900 hover:bg-neutral-800 border-neutral-600 border-1 p-2.5 rounded-md cursor-pointer transition-colors duration-150"}>
            <span className={"px-1 font-semibold text-sm"}>{displayText}</span>
        </a>
    )
}