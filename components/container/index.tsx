function Container({ className = '', children, form = false }) { 
    return <div className={`${form ? 'container--form' : 'container'} px-8 ${className}`}>{children}</div>
}

export default Container
