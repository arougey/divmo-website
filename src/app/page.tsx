// src/app/page.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center bg-black text-white">
      {/* Hero */}
      <section className="w-full">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h1 className="mb-4 text-5xl font-extrabold leading-tight">
            Split bills, stress-free.
          </h1>
          <p className="mb-8 text-lg text-gray-600">
            DivyUp helps you share expenses with friends in seconds.
          </p>
          <Link
            href="/about"
            className="inline-block rounded-3xl bg-fuchsia-900 px-6 py-3 font-medium text-white hover:bg-fuchsia-950 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="w-full py-16">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-6 sm:grid-cols-3">
          <div className="rounded-lg bg-sky-950 p-6 shadow">
            <Image src="/globe.svg" alt="Globe icon" width={48} height={48} />
            <h3 className="mt-4 text-xl font-semibold">Instant Splits</h3>
            <p className="mt-2 text-gray-600">
              Divide any bill with multiple people in one click.
            </p>
          </div>
          <div className="rounded-lg bg-sky-950 p-6 shadow">
            <Image src="/file.svg" alt="File icon" width={48} height={48} />
            <h3 className="mt-4 text-xl font-semibold">Expense Tracking</h3>
            <p className="mt-2 text-gray-600">
              Stay on top of who owes what over time.
            </p>
          </div>
          <div className="rounded-lg bg-sky-950 p-6 shadow">
            <Image src="/window.svg" alt="Window icon" width={48} height={48} />
            <h3 className="mt-4 text-xl font-semibold">Easy Payments</h3>
            <p className="mt-2 text-gray-600">
              Seamlessly settle up through Stripe.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="w-full bg-white py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-2xl font-bold">
            Trusted by over 10,000 users
          </h2>
          <blockquote className="italic text-gray-700">
          </blockquote>
          <p className="mt-2 font-medium text-gray-800"></p>
        </div>
      </section>
    </main>
  )
}