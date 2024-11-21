import { useState } from 'react';

function Profile() {
  const [activeTab, setActiveTab] = useState('company');

  const companyInfo = {
    name: 'EcoTech Solutions',
    industry: 'Manufacturing',
    size: '1000-5000 employees',
    location: 'New York, USA',
    established: '1995',
  };

  const securitySettings = {
    twoFactorEnabled: true,
    lastPasswordChange: '2024-02-15',
    loginHistory: [
      {
        date: '2024-03-10',
        time: '09:30 AM',
        location: 'New York, USA',
        device: 'Chrome / Windows',
      },
      {
        date: '2024-03-09',
        time: '02:15 PM',
        location: 'New York, USA',
        device: 'Safari / MacOS',
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('company')}
              className={`${
                activeTab === 'company'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
            >
              Company Information
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`${
                activeTab === 'security'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
            >
              Security Settings
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'company' ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Company Details
                </h3>
                <div className="mt-4 border-t border-gray-200">
                  <dl className="divide-y divide-gray-200">
                    {Object.entries(companyInfo).map(([key, value]) => (
                      <div
                        key={key}
                        className="py-4 sm:grid sm:grid-cols-3 sm:gap-4"
                      >
                        <dt className="text-sm font-medium text-gray-500">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Security Settings
                </h3>
                <div className="mt-4 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Two-Factor Authentication
                      </p>
                      <p className="text-sm text-gray-500">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <button
                      type="button"
                      className={`${
                        securitySettings.twoFactorEnabled
                          ? 'bg-blue-600'
                          : 'bg-gray-200'
                      } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                      <span className="sr-only">Toggle two-factor auth</span>
                      <span
                        className={`${
                          securitySettings.twoFactorEnabled
                            ? 'translate-x-5'
                            : 'translate-x-0'
                        } pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                      />
                    </button>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Recent Login Activity
                    </p>
                    <div className="mt-2 space-y-4">
                      {securitySettings.loginHistory.map((login, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 p-4 rounded-lg text-sm"
                        >
                          <div className="flex justify-between">
                            <span className="font-medium">
                              {login.date} at {login.time}
                            </span>
                            <span className="text-gray-500">{login.device}</span>
                          </div>
                          <p className="text-gray-500 mt-1">
                            Location: {login.location}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;