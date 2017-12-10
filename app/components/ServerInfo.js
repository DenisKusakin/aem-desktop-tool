import React from 'react'

const ServerInfo = ({data}) => <div>
    {!!data && data.map(x => <h5>{x}</h5>)}
</div>

export default ServerInfo