import React from 'react'

const ServerInfo = ({data}) => <div>
    {!!data && data.map((x, i) => <h5 key={i}>{x}</h5>)}
</div>

export default ServerInfo
