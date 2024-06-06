import AboutDiv from "../common/AboutDiv";
import Featured from "../common/Featured";
// import ConferenceCarousel from "../common/ConferenceCarousel";
import HeroSection from "../common/HeroSection";
import Invite from "../common/Invite";
import MinistryDiv from "../common/MinistryDiv";
import Stats from "../common/Stats";


function LandingPage() {
    return ( 
    <div>
        
        <HeroSection/>
        <Invite/>
        <Stats/>
        <Featured/>
        <AboutDiv/>
        <MinistryDiv/>
        {/* <ConferenceCarousel/> */}
        
        
    
    </div> );
}

export default LandingPage;