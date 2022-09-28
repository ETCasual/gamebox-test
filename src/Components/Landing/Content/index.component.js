import RegistrationInstructions from "Components/Landing/Content/RegistrationInstructions.component";
import Hero from "Components/Landing/Content/Hero.component";
import HowItWorks from "Components/Landing/Content/HowItWorks.component";
import DailyRewards from "Components/Landing/Content/DailyRewards.component";

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
        </section>
    );
};

export default Content;
