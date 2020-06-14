import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ComingSoon } from '../comingSoon/ComingSoon'
import { Helmet } from 'react-helmet';

export class Course extends Component {
    render() {
        const seo = {
            title: "Coursebee : Course",
            description:
                "Courses from top-notch mentors are coming soon.",
            url: "https://coursebee.com/course/",
            image: ""
        };
        return (
            <div>
                <h4 style={{ margin: "50px" }}>Courses</h4>
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
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Course)
