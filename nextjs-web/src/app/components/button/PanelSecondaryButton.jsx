export default function PanelSecondaryButton({displayText}) {
    return (
        <a className={"bg-neutral-100 hover:bg-neutral-300 p-2.5 rounded-md cursor-pointer transition-colors duration-150"}>
            <span className={"px-1 text-sm text-black"}>{displayText}</span>
        </a>
    )
}