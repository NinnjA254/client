import './StatusIndicator.css'

export default function StatusIndicator({status}){ //status prop should be a boolean
    let statusClass = status ? 'fulfilled' : 'pending'
    let statusMessage = ''
    if(status === true) statusMessage = statusMessage = 'Fulfilled'
    else if(status === false) statusMessage = 'Pending'
    else statusMessage = 'something is wrong'
    
    return(
        <div id = {`status-indicator`} className = {statusClass}>
            <div id = {`status-indicator-circle`} className = {`${statusClass}-circle`}/>
            {statusMessage}
        </div>
    )
}