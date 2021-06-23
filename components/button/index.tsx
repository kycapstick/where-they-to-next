import cn from 'clsx'

function Button({
    onClick = console.log,
    className = '',
    children = null,
    type = null,
    disabled = false,
    accentColor = "#000000"
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={cn(
                'bg-black',
                'text-white',
                'p-2',
                'rounded',
                'uppercase',
                'text-sm',
                'font-bold',
                {
                    [className]: Boolean(className),
                }
            )}
            style={{ backgroundColor: accentColor}}
        >
            {children}
        </button>
    )
}

export default Button
