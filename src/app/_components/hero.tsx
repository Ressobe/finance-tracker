import { APP_LONG_DESCRIPTION, APP_NAME } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="w-3/4">
      <div className="flex items-center justify-center pt-10 gap-10 px-4 md:px-6 text-left">
        <div className="space-y-6">
          <div>
            <h2 className="text-4xl font-bold tracking-tighter">
              Craft your app with{" "}
              <span className="text-indigo-400 text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                {APP_NAME}
              </span>
            </h2>
            <h3 className="text-2xl pt-2 font-bold tracking-tighter ">
              Create stunning websites{" "}
              <span className="text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                effortlessly{" "}
              </span>{" "}
              and
              <span className="text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                {" "}
                fast.
              </span>
            </h3>
          </div>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            {APP_LONG_DESCRIPTION}
          </p>
          <p className="text-xs text-gray-500">
            Sign up to get notified when we launch.
            <span> </span>
            <Link
              className="underline underline-offset-2"
              href="/terms-of-service"
            >
              Terms of Service
            </Link>
          </p>
        </div>
        <Image
          src="/rocket.png"
          width={200}
          height={200}
          alt="nextcraft-logo"
        />
      </div>
    </section>
  );
}
