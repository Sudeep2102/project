import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-white">
      <header className="bg-blue-600">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-white font-bold text-xl">EcoTrack</div>
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 hover:bg-gray-100 px-3 py-2 rounded-md"
              >
                Register
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <div className="relative bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block">Secure Digital Identity</span>
                    <span className="block text-blue-600">
                      for Environmental Impact
                    </span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Monitor and reduce your environmental impact while ensuring data
                    security across your supply chain with our AI-powered platform.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link
                        to="/register"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                      >
                        Get started
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Link
                        to="/login"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                      >
                        Sign in
                      </Link>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>

        {/* Feature Section */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
                Features
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Better way to track environmental impact
              </p>
            </div>

            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {[
                  {
                    title: 'AI-Powered Analytics',
                    description:
                      'Leverage advanced AI algorithms for predictive analytics and risk assessment.',
                  },
                  {
                    title: 'Blockchain Security',
                    description:
                      'Ensure data integrity and immutability with our blockchain integration.',
                  },
                  {
                    title: 'Environmental Scoring',
                    description:
                      'Track and improve your environmental impact with our comprehensive scoring system.',
                  },
                  {
                    title: 'Compliance Reporting',
                    description:
                      'Automated compliance checks and documentation generation for environmental regulations.',
                  },
                ].map((feature) => (
                  <div key={feature.title} className="relative">
                    <dt>
                      <p className="text-lg leading-6 font-medium text-gray-900">
                        {feature.title}
                      </p>
                    </dt>
                    <dd className="mt-2 text-base text-gray-500">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 EcoTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;