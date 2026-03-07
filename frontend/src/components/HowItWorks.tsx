"use client"

export default function HowItWorks() {
  const steps = [
    {
      title: "Choose a Service",
      description: "Browse from a wide range of home services and pick what you need.",
      icon: "🔎"
    },
    {
      title: "Book a Time Slot",
      description: "Select a convenient date and time for the service.",
      icon: "📅"
    },
    {
      title: "Get It Done",
      description: "A professional arrives at your home and completes the job.",
      icon: "✅"
    }
  ]

  return (
    <section className="flex justify-center mt-16">

      {/* Card container */}
      <div className="w-[90%] max-w-6xl bg-white shadow-xl rounded-2xl p-12">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            How It Works
          </h2>

          <p className="text-gray-500 mt-3">
            Book a service in just three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-10">

          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="text-4xl mb-4">{step.icon}</div>

              <h3 className="font-semibold text-lg mb-2">
                {step.title}
              </h3>

              <p className="text-gray-600 text-sm">
                {step.description}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  )
}