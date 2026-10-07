
import Hero from "@/components/Hero/Hero";
import Standard from "@/components/Standard/Standard";
import Treatments from "@/components/Treatments/Treatments";
import Doctors from "@/components/Doctors/Doctors";
import Process from "@/components/Process/Process";
import News from "@/components/News/News";
import Clinic from "@/components/Clinic/Clinic";
import Visit from "@/components/Visit/Visit";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Standard />
        <Treatments />
        <Doctors />
        <Process />
        <News />
        <Clinic />
        <Visit />
      </main>
    </>
  );
}