import React from 'react'

const MetabaseEmbed = ({metabase_url}: {metabase_url?: string}) => {

    return (
        <div>
            <iframe
                src={metabase_url}
                frameBorder="0"
                width="80%"
                allowTransparency
                style={{minHeight: "80vh"}}
            ></iframe>
        </div>
    )
}

export default MetabaseEmbed