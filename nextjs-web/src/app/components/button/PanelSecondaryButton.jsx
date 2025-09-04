export default function PanelSecondaryButton({displayText, small = false}) {

    const paddingYSize = small ? 'py-1.25' : 'py-2.5';

    return (
        <a className={`bg-neutral-100 hover:bg-neutral-300 ${paddingYSize} rounded-md cursor-pointer transition-colors duration-150`}>
            <span className={"px-2 text-sm text-black"}>{displayText}</span>
        </a>
    )
}