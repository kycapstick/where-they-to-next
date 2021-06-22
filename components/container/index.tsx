function Container({ className = '', children }) { 
    return <div className={'container px-8 ' + className}>{children}</div>
}

export default Container
