import React from 'react'
import { ComingSoon } from '../comingSoon/ComingSoon'
import {Helmet} from 'react-helmet';

export default function Training() {
    const seo = {
        title: "Coursebee : Training",
        description:
          "Training programs are coming soon.",
        url: "https://coursebee.com/training/",
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
