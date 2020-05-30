import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HeaderImg from "../layout/HeaderImg"
import poster1 from "../../images/poster1.jpg"
class LandingMentor extends Component {
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      if(this.props.auth.user.type === "student"){
        this.props.history.push("/dashboard");
      } else if (this.props.auth.user.type === "mentor"){
        this.props.history.push("mentor/dashboard");
      }
      else if (this.props.auth.user.type === "admin"){
        this.props.history.push("admin/dashboard");
      }
    }
  }
  render() {
    return (
      <div>
        <HeaderImg/>
        <div>
          <div className="center-align container">
            <h4>
              Mentors, Greetings from<b> COURSEBEE</b>
            </h4>
            <div>Coursebee is online education platform where we disseminate contemporary knowledge through live classroom , training and video based courses.</div>
            <br/>
            <div>Coursebee একটি অনলাইন শিক্ষামূলক প্ল্যাটফর্ম। আমাদের মূল লক্ষ্য হল একটি ইউনিফাইড প্ল্যাটফর্মে শিক্ষার্থী এবং প্রফেশনালদের একত্রিত করা।</div>
            <p className="flow-text grey-text text-darken-1">
              We are just starting our journey to develop the best platform for you.<br/>
              To be one of the first mentors in COURSEBEE<br/>
            </p>
            <h4>Register Now</h4>
            <br />
            <div style={{ maxWidth:"600px", display: "flex", justifyContent: "space-evenly" }} className="container">
              <div>
                <Link to="/mentor/register" style={{margin:"10px", width: "140px", borderRadius: "3px", letterSpacing: "1.5px" }} className="btn btn-large waves-effect waves-light hoverable orange darken-1  black-text">
                  Register
              </Link>
              </div>
              <div>
                <Link to="/mentor/login" style={{margin:"10px", width: "140px", borderRadius: "3px", letterSpacing: "1.5px" }} className="btn btn-large waves-effect hoverable teal darken-1">
                  Log In
              </Link>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <img style={{ width: "100%" }} src={poster1} alt="poster1" />
              <div>
              Our first webinar!!!
Topic: Work culture and everyday at work in world class companies  :: During lockdown and post covid'19 forecast. 
Time: 30th May, 7 PM local
Speakers: Taman Islam, Kabir Sohel, Reazul Hoque
To learn more about them:
Taman Islam is currently working as a software engineer at Facebook London. Before this he was working as a Site Reliability Engineer at Google(2014-2018). And before that he was running his own software business based in Dhaka (2011-2014). Taman Islam  completed his BSc. in CSE from Southeast University, Dhaka.
Kabir Sohel is currently working as a software developer II in Uber Inc. in GoLang, Java and distributed services. He has 9+ years’ experience in software design and development. He has a solid background on complex data structure and algorithmic problem solving. He worked as a senior java developer for Yellowbrick International and as a software developer for booking.com. Not only that, he was also a software engineer in Autodesk Singapore, Bubble Motion Pte. Ltd. and Samsung Bangladesh R&D Center Ltd. 
Reazul Hoque is a software engineer currently working at Intel Corporation. He completed his PhD in Computer Science with a focus in High Performance and Distributed Computing from The University of Tennessee, Knoxville in 2019. His research involved study of different programming paradigms to allow programming multi-core distributed heterogeneous machines. He interned in Intel Corporation, Arm and Mathworks during his tenure as a graduate research assistant. Before joining University of Tennessee to pursue his higher study he worked as a Lecturer at Stamford University Bangladesh.
Join out community by hitting the link below:
https://www.facebook.com/groups/278104156686173/?ref=share

              </div>
            </div>
            <div style={{ marginTop: "50px", marginBottom: "50px" }}>
              <br />
              <h4>
              About Us
              </h4>
              <div>Coursebee একটি অনলাইন শিক্ষামূলক প্ল্যাটফর্ম। আমাদের মূল লক্ষ্য হল একটি ইউনিফাইড প্ল্যাটফর্মে শিক্ষার্থী এবং প্রফেশনালদের একত্রিত করা।শিক্ষার্থীরা প্রায়শই বিভিন্ন সমস্যায় আটকে যায় যা তারা সবসময় নিজেরা সামলাতে পারে না। যথাযথ গাইড্লাইন না পেয়ে, তারা অনেক সময় ভুল সিদ্ধান্ত নেয় যা তারা ভবিষ্যতে অনুশোচনা করে। 
                <br/><br/>Coursebee এমন একটি প্ল্যাটফর্ম যেখানে তারা প্রফেশনালদের কাছ থেকে পরামর্শ নিতে পারবে এবং তাদের অভিজ্ঞতা share করতে পারবে।
              এখানে, গ্রুপের সদস্যরা তাদের ক্রিয়েটিভ চিন্তাভাবনা, প্রতিদিনের সমস্যাগুলি, ক্যারিয়ার পরামর্শ, নির্দেশিকা ইত্যাদি share করবে, যা অন্যান্য সদস্যদের সহায়তা করবে। বীজগণিত, ফ্লুইড মেকানিক্স,অ্যাকাউন্টিং, ফটোগ্রাফি, কোডিং, অর্থনীতি, সাহিত্য সহ সবকিছু এই প্ল্যাটফর্মের আওতায় আসবে।
              এই গ্রুপে আমরা বিভিন্ন বিষয়ে লাইভ সেশন এবং ওয়েবিনারের ব্যবস্থা করব যেখানে শিক্ষার্থীরা পেশাদারদের এবং বিশেষজ্ঞদের সাথে লাইভ ইনটারেকশন করতে পারে। এই কমিউনিটির মাধ্যমে Coursebee হবে বাংলাদেশের বৃহত্তম অনলাইন শিক্ষামূলক প্ল্যাটফর্মে।
</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
LandingMentor.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps
)(LandingMentor);