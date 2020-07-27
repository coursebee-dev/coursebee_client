import React, { Component } from 'react'
import { connect } from 'react-redux'
import courselogo from "../../images/ComingSoon.png";
import { Helmet } from 'react-helmet';
const coursedata = [
    {
        name: "Microsoft Excel - Excel from Beginner to Advanced Excel with this A- Z Microsoft Excel Course.Microsoft Excel 2010, 2013, 2016, Excel 2019 and Office 365"
    },
    {
        name: "Agile Certified Practitioner Traning Program- Beginner Level"
    },
    {
        name: "PMP exam preparation complete course."
    },
    {
        name: "Complete MATLAB course"
    },
    {
        name: "Calculus for Engineering"
    },
    {
        name: "University admission Math course"
    },
    {
        name: "HSC math Complete Course"
    },
    {
        name: "The complete Financial Analyst Course (Beginner to advanced). Excel, accounting,financial statement analysis, business analysis, financial math,powerpoint"
    },
    {
        name: "Learn Adobe Photoshop"
    },
    {
        name: "Learn Adobe Lightroom,"
    },
    {
        name: "Learn Adobe Premier"
    },
    {
        name: "Adobe AfterEffect"
    },
    {
        name: "Learn Power BI"
    },
    {
        name: "Learn Blockchain A to Z"
    },
    {
        name: "An extensive course on Graphics Designing: Beginner, Intermediate, Advanced."
    },
    {
        name: "Software testing A to Z"
    },
    {
        name: "Civil engineering construction materials : concrete structures."
    },
    {
        name: "Learn wordpress"
    },
    {
        name: "Learn building your ecommerce site."
    },
    {
        name: "Photography masterclass: complete guide to photography."
    },
    {
        name: "Learn Bioinformatics."
    },
    {
        name: "Ultimate drawing course - beginner to advanced."
    },
    {
        name: "Complete digital marketing 12 courses in 1. Master digital marketing: strategy, social media marketing, SEO, Youtube, Email, Facebook Marketing, Analytics."
    },
    {
        name: "An entire MBA in 1 course."
    },
    {
        name: "Learn  Total.quality management."
    },
    {
        name: "Learn supply chain management."
    },
    {
        name: "Learn production planning and operation management."
    },
    {
        name: "Prince 2 foundation certification training."
    },
    {
        name: "Introduction to project management with prince2 and prince 2 agile.n282"
    },
]
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
                {/*<h4 style={{ margin: "50px" }}>Courses</h4>*/}
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
                <div className="container">
                    <div className="section">
                        <div className="row">
                            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                                {coursedata.map((course, id) => (
                                    <div class="card horizontal" style={{ width: "100%" }} >
                                        <div class="card-image">
                                            <img style={{ height: "150px" }} src={courselogo} />
                                        </div>
                                        <div class="card-stacked">
                                            <div class="card-content">
                                                <p>{course.name}</p>
                                            </div>
                                            <div class="card-action">
                                                <a href="#">Coming Soon</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Course)
