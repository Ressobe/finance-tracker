import Image from "next/image";

export function Features() {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-12">
      <h2 className="font-bold text-5xl">Features</h2>
      <div className="space-y-32">
        <div className="flex gap-20">
          <Image
            src="/example2.png"
            width={500}
            height={300}
            alt="example"
            className="border-8 rounded-md"
          />
          <div className="flex flex-col justify-center">
            <h3 className="font-bold text-2xl pb-4">
              Track where your money goes
            </h3>
            <p className="text-sm text-muted-foreground max-w-80">
              Track where your money goes and gain insight into your spending
              habits. With our app, you can easily categorize expenses, set
              budgets, and identify areas for savings, empowering you to make
              smarter financial decisions.
            </p>
          </div>
        </div>
        <div>
          <div className="flex gap-20">
            <div className="flex flex-col justify-center">
              <h3 className="font-bold text-2xl pb-4">
                Save money for your goals
              </h3>
              <p className="text-sm text-muted-foreground max-w-80">
                Save money for your goals and watch your dreams become a
                reality. Our app helps you set specific savings targets, track
                your progress, and stay motivated on your journey to financial
                success.
              </p>
            </div>
            <Image
              src="/example2.png"
              width={500}
              height={300}
              alt="example"
              className="border-8 rounded-md"
            />
          </div>
        </div>
        <div className="flex gap-20">
          <Image
            src="/example2.png"
            width={500}
            height={300}
            alt="example"
            className="border-8 rounded-md"
          />
          <div className="flex flex-col justify-center">
            <h3 className="font-bold text-2xl pb-4">Set Budget Categories</h3>
            <p className="text-sm text-muted-foreground max-w-80">
              Set budget categories to organize your spending and stay on track.
              Our app allows you to customize categories, monitor expenses, and
              adjust as needed, ensuring you manage your finances effectively.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
