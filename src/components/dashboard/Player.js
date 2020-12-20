import React, { Fragment } from 'react'
import ReactPlayer from "react-player"

export default function Player({ selectedContent }) {
    return (
        <div>
            {selectedContent &&
                <Fragment>
                    <h1>{selectedContent?.title}</h1>
                    <ReactPlayer
                        url={selectedContent?.finalLink}
                    />
                    <h3>Video description</h3>
                    <div dangerouslySetInnerHTML={{ __html: selectedContent?.description }} />
                </Fragment>
            }
        </div>
    )
}
