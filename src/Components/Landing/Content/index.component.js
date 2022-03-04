import Hero from "Components/Landing/Content/Hero.component";
import Footer from "Components/Landing/Footer/Footer.component";
import DailyRewards from "Components/Landing/Content/DailyRewards.component";
import HowItWorks from "Components/Landing/Content/HowItWorks.component";

const Content = ({ heroRef, workRef, workCardRef, dailyRewardRef }) => {
    return (
        <section id="landing">
            <Hero heroRef={heroRef} />
            <HowItWorks workRef={workRef} workCardRef={workCardRef} />
            <DailyRewards dailyRewardRef={dailyRewardRef} />
            <Footer />
        </section>
    );
};

export default Content;
