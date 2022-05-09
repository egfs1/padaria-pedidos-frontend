
export function Button({text,type,icon,...props}: any){
    
    return(
        <button type="button" className={"btn " + type} style={{display: 'flex',justifyContent: 'initial', alignItems: 'center', width: '86px'}} {...props}>
            {icon}
            {text}
        </button>        
    )
}