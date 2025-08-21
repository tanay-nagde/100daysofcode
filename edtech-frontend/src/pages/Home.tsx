import { HeroSection } from "../components/hero-section"
import { ProblemOfTheDay } from "../components/problemoftheday"
import { ChallengeLog } from "../components/Challengelog"
import { CommunitySection } from "@/components/CommunitySection"


function Home()  {
  return (
    <>
        <HeroSection />
        <ProblemOfTheDay />
        <ChallengeLog />
        <CommunitySection />

    </>
  )
}

export default Home