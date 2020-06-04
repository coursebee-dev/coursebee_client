import React from 'react'
import { ComingSoon } from '../comingSoon/ComingSoon'
import {Helmet} from 'react-helmet';

export default function Course() {
    const seo = {
        title: "Coursebee : Course",
        description:
          "A free, online API builder that works with CORS. A Postman alternative without the need for client app installation.",
        url: "https://coursebee.com/course/",
        image: ""
      };
    return (
        <div>
            <Helmet
            title={seo.title}
            meta={[
                {
                name: "description",
                property: "og:description",
                content: seo.description
                },
                { property: "og:title", content: seo.title },
                { property: "og:url", content: seo.url },
            ]}
            />
            <ComingSoon />
        </div>
    )
}
