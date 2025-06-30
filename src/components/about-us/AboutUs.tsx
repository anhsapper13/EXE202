import React from "react";

const why = [
  "Verified Providers: All our service providers and clinics undergo a rigorous verification process to guarantee your peace of mind.",
  "Convenience: From vet visits to grooming sessions, find all the services you need in one user-friendly platform.",
  "Secure Transactions: Our secure payment system ensures your transactions are safe and hassle-free.",
  "Trusted Recommendations: Benefit from a community of pet lovers who share honest reviews and recommendations.",
];

export default function AboutUs() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-orange-100 to-orange-200 px-6 py-10 sm:px-10">
            <h1 className="text-4xl font-extrabold text-orange-500 text-center">
              About Pet Care Hub
            </h1>
            <p className="mt-4 text-lg text-gray-700 text-center max-w-3xl mx-auto">
              Connecting pet owners with quality services and products in a
              single platform
            </p>
          </div>

          {/* Content Sections */}
          <div className="px-6 py-8 sm:px-10">
            {/* Who We Are Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-orange-400 mb-4 pb-2 border-b-2 border-orange-200">
                Who We Are
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                This journey began in early 2025 as part of the Experimental
                Entrepreneur 101 (EXE101) course. Over time, it has grown into a
                more sophisticated initiative under EXE201, fueled by curiosity,
                creativity, and collaboration. Backed by thorough research via
                Google Forms, thoughtfully designed in Figma, and developed by a
                committed team of FPT University students, this project is built
                on a foundation of passion and hard work.
                <br />
                At Pet Care Hub, our goal is simple yet impactful: to create a
                platform where pet owners can connect seamlessly with trusted
                service providers and businesses. We believe every pet deserves
                top-notch care and attention, and we&apos;re dedicated to making that
                possible. By bringing together a community of passionate pet
                lovers, reliable experts, and quality businesses, we&apos;re building
                an ecosystem that makes pet care effortless and enjoyable.
                <br />
                With Pet Care Hub, we&apos;re not just simplifying pet care—we&apos;re
                enriching lives, one wag, purr, or chirp at a time.
              </p>
            </section>

            {/* How It Works Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-orange-400 mb-4 pb-2 border-b-2 border-orange-200">
                How It Works
              </h2>
              <div className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-300">
                  <h3 className="font-semibold text-orange-500 mb-2">
                    For Pet Owners
                  </h3>
                  <p className="text-gray-700">
                    Discover, book, and pay for services like vet consultations,
                    grooming, walking, and more. Browse and purchase pet
                    products from verified sellers.
                  </p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-300">
                  <h3 className="font-semibold text-orange-500 mb-2">
                    For Service Providers
                  </h3>
                  <p className="text-gray-700">
                    Create a profile, showcase your expertise, and connect with
                    pet owners in need of your services. Manage bookings and
                    payments seamlessly.
                  </p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-300">
                  <h3 className="font-semibold text-orange-500 mb-2">
                    For Businesses
                  </h3>
                  <p className="text-gray-700">
                    List your pet-related products, reach a targeted audience,
                    and grow your business through our secure marketplace.
                  </p>
                </div>
              </div>
            </section>

            {/* Values Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-orange-400 mb-6 pb-2 border-b-2 border-orange-200">
                Our Values & Commitments
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-b from-orange-50 to-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="text-orange-500 text-4xl mb-3 flex justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="green"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-orange-500 mb-2">
                    Trust
                  </h3>
                  <p className="text-gray-700">
                    We thoroughly vet all service providers and businesses to
                    ensure the highest standards of quality and reliability.
                  </p>
                </div>

                <div className="bg-gradient-to-b from-orange-50 to-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="text-orange-500 text-4xl mb-3 flex justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="red"
                      className="size-6"
                    >
                      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-orange-500 mb-2">
                    Pet Well-being
                  </h3>
                  <p className="text-gray-700">
                    Your pets health and happiness are our top priorities. We
                    partner with providers who share our commitment to
                    delivering exceptional care.
                  </p>
                </div>

                <div className="bg-gradient-to-b from-orange-50 to-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="text-orange-500 text-4xl mb-3 flex justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                        clipRule="evenodd"
                      />
                      <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-orange-500 mb-2">
                    Community
                  </h3>
                  <p className="text-gray-700">
                    We foster a supportive community where pet lovers can
                    connect, share experiences, and seek advice.
                  </p>
                </div>
              </div>
            </section>

            {/* Why Choose Us Section */}
            <section>
              <h2 className="text-2xl font-bold text-orange-400 mb-6 pb-2 border-b-2 border-orange-200">
                Why Choose Us?
              </h2>
              <ul className="space-y-3">
                {why.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
