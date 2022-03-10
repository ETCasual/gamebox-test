import Login from "Components/Landing/Content/Login.component";
import Hero from "Components/Landing/Content/Hero.component";
import HowItWorks from "Components/Landing/Content/HowItWorks.component";
import DailyRewards from "Components/Landing/Content/DailyRewards.component";
import Footer from "Components/Landing/Footer/Footer.component";

const Content = ({
    heroRef,
    workRef,
    workCardRef,
    dailyRewardRef,
    loginModal,
    setLoginModal,
}) => {
    return (
        <section id="landing">
            {loginModal && <Login setLoginModal={setLoginModal} />}
            
            <Hero heroRef={heroRef} setLoginModal={setLoginModal} />
            <HowItWorks workRef={workRef} workCardRef={workCardRef} />
            <DailyRewards dailyRewardRef={dailyRewardRef} />
            <Footer />
        </section>
    );
};

export default Content;
