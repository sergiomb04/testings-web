export default function PanelButton({children, small = false, onClick, style = ''}) {

    const paddingYSize = small ? 'py-1.25' : 'py-2.5';

    return (
        <a
            onClick={onClick ? onClick : undefined}
            className={`bg-neutral-900 hover:bg-neutral-800 border-neutral-600 border-1 ${paddingYSize} rounded-md cursor-pointer transition-colors duration-150 ${style}`}>
            <span className={"px-2 font-semibold text-sm"}>{children}</span>
        </a>
    )
}