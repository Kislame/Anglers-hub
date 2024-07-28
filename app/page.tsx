import { Button } from '@/components/ui/button';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import { LoginButton } from '@/components/auth/login-btn';
import Image from 'next/image';
const font = Poppins({
  subsets: ['latin'],
  weight: '600',
});

export default function Home() {
  return (
    <>
      <header className="flex bg-[#101720] text-white items-center md:flex-row flex-col relative ">
        <div className="  text-balance  absolute md:static  inset-0 flex flex-col  justify-center gap-6  items-center text-center bg-[#10172071] md:bg-inherit ">
          <h1 className="text-3xl  md:text-4xl lg:text-6xl">
            Welcome to Angler&apos;s Hub
          </h1>
          <p className="leading-7">
            Your ultimate community for fishing enthusiasts to share their
            catches, experiences, and engage with fellow anglers.
          </p>
          <LoginButton mode="modal" asChild>
            <Button
              className="max-w-[260px] mx-auto"
              variant={'secondary'}
              size={'lg'}
            >
              Sign In
            </Button>
          </LoginButton>
        </div>
        <div className="">
          <Image
            src="/images/img-3.jpg"
            width={600}
            height={600}
            priority
            sizes="(max-width: 768px) 100vw, 33vw"
            alt="Fishing community"
            // fill={true}
            // style={{ objectFit: 'cover' }}
          />
        </div>
      </header>
      <main className=" py-[100px] bg-[#101720] space-y-20">
        <section className="bg-white">
          <div className="  space-y-6 max-w-[1200px] mx-auto py-20 flex  flex-col md:flex-row items-center justify-between">
            <article className="space-y-4 text-center md:text-left p-4">
              <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-5xl ">
                About Angler&apos;s Hub
              </h2>
              <p className="max-w-sm leading-8 ">
                Angler&apos;s Hub is a platform created by and for fishing
                enthusiasts. Whether you&apos;re a seasoned angler or a
                beginner, you&apos;ll find a vibrant community to share your
                fishing adventures, tips, and stories. Join us to explore
                fishing locations, track your catches, and compete with others
                in our monthly leaderboard.
              </p>
            </article>
            <Image
              width={500}
              height={500}
              src={'/images/img-2.jpg'}
              alt="about us image"
            />
          </div>
        </section>

        <section className="text-white max-w-[50rem] mx-auto py-20">
          <article className="  leading-7 space-y-4 px-5">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-5xl">
              Events & Leaderboards
            </h2>

            <p>
              Join our community events and competitions to showcase your skills
              and connect with other anglers. Whether you&apos;re into
              freshwater fishing or deep-sea adventures, there&apos;s an event
              for everyone. Don&apos;t miss out on the fun and the chance to win
              exciting prizes!
            </p>

            <ul>
              <li>
                <strong>Annual Fishing Derby:</strong> Test your fishing skills
                in our biggest event of the year. Great prizes and lots of fun!
              </li>
              <li>
                <strong>Kids&apos; Fishing Day:</strong> A family-friendly event
                to encourage young anglers to enjoy fishing.
              </li>
              <li>
                <strong>Night Fishing Challenge:</strong> Experience the thrill
                of night fishing in this unique competition.
              </li>
              <li>
                <strong>Regional Tournaments:</strong> Compete against local
                anglers in various fishing categories.
              </li>
            </ul>
          </article>
        </section>

        <section
          id="community"
          className="flex flex-col  md:flex-row max-w-[1200px] mx-auto justify-between items-center gap-6"
        >
          <article className="flex flex-col justify-around items-center gap-8">
            <div className="p-6 space-y-6 bg-white text-[#101720]">
              <h3 className="text-2xl md:text-3xl text-center md:text-left  tracking-widest md:font-medium">
                Share Your memories
              </h3>
              <p className="leading-8 max-w-sm text-lg text-center md:text-left ">
                At Angler&apos;s Hub, we believe in the power of community.
                Connect with fellow anglers, share your knowledge, and learn
                from others. Here are some highlights from our community:
              </p>
            </div>

            <article className="space-y-2">
              <Image
                width={500}
                height={500}
                src="/images/img-1.jpg"
                alt="Fishing trip"
              />
              <p className="tracking-wide font-semibold text-center">
                Fishing trip with friends
              </p>
            </article>
          </article>
          <article className="space-y-2">
            <Image
              width={500}
              height={500}
              src="/images/top-catch.jpg"
              alt="Top catch"
            />
            <p className="tracking-wide font-semibold text-center">
              Top catch of the month By Jhon Doe
            </p>
          </article>
        </section>
      </main>

      <footer className="bg-white mt-[100px] py-[8vh] grid grid-cols-1 gap-6 place-items-center">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-6 max-w-[1200px] mx-auto">
          <section className="w-full text-center md:text-left md:w-1/3 space-y-4">
            <h4 className="text-xl">Join Angler&apos;s Hub Today!</h4>
            <p className="leading-7">
              Sign up now and become part of our vibrant fishing community.
              Share your catches, explore new fishing locations, and connect
              with anglers from around the world.
            </p>
          </section>
          <ul>
            <li>Twitter</li>
            <li>Facebook</li>
            <li>Instagram</li>
          </ul>
          <ul>
            <li>About Us</li>
            <li>Community</li>
            <li>Sponsors</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <p className="text-center">
          &copy; 2024 Angler&apos;s Hub. All rights reserved.
        </p>
      </footer>
    </>
  );
}
