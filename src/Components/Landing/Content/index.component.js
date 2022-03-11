import Login from "Components/Landing/Content/Login.component";
import RegistrationInstructions from "Components/Landing/Content/RegistrationInstructions.component";
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
    registrationInstructionModal,
    setRegistrationInstructionModal,
}) => {
    return (
        <section id="landing">
            {loginModal && <Login setLoginModal={setLoginModal} />}
            {registrationInstructionModal && (
                <RegistrationInstructions
                    setRegistrationInstructionModal={
                        setRegistrationInstructionModal
                    }
                />
            )}

            <Hero
                heroRef={heroRef}
                setLoginModal={setLoginModal}
                setRegistrationInstructionModal={
                    setRegistrationInstructionModal
                }
            />
            <HowItWorks workRef={workRef} workCardRef={workCardRef} />
            <DailyRewards
                dailyRewardRef={dailyRewardRef}
                setRegistrationInstructionModal={
                    setRegistrationInstructionModal
                }
            />
            <Footer />
        </section>
    );
};

export default Content;
