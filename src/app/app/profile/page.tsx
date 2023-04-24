import Image from 'next/image';

const Profile = () => {
  return (
    <>
      <section className="w-full bg-gray-50 pt-16">
        <div className="mx-auto w-full px-4 lg:w-4/12">
          <div className="relative mb-6 mt-16 flex w-full min-w-0 flex-col break-words rounded-lg bg-white shadow-xl">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="flex w-full justify-center px-4">
                  <div className="relative">
                    <Image
                      className="mb-3 rounded-full shadow-lg"
                      src="/assets/images/customer.png"
                      alt="Bonnie image"
                      width={120}
                      height={120}
                    />
                    {/* <img alt="..." src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg" className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"> */}
                  </div>
                </div>
                <div className="mt-12 w-full px-4 text-center">
                  <div className="flex justify-center py-4 pt-8 lg:pt-4">
                    <div className="mr-4 p-3 text-center">
                      <span className="block text-xl font-bold uppercase tracking-wide text-blue-600">
                        22
                      </span>
                      <span className="text-sm text-gray-400">
                        Subscriptions
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <h3 className="mb-2 text-xl font-semibold leading-normal text-gray-700">
                  Jenna Stones
                </h3>
                <div className="mb-2 mt-0 text-sm font-bold uppercase leading-normal text-gray-400">
                  <i className="mr-2 text-lg text-gray-400"></i>
                  Los Angeles, California
                </div>
              </div>
              <div className="mt-10 border-t border-gray-200 py-10 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4 lg:w-9/12">
                    <p className="mb-4 text-lg leading-relaxed text-gray-700">
                      Shop Info here
                    </p>
                    <a href="" className="font-normal text-pink-500">
                      Show more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="relative  mt-8 pb-6 pt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center md:justify-between">
              <div className="mx-auto w-full px-4 text-center md:w-6/12">
                <div className="py-1 text-sm font-semibold text-gray-500">
                  Made with{' '}
                  <a
                    href="https://www.creative-tim.com/product/notus-js"
                    className="text-gray-500 hover:text-gray-800"
                    target="_blank"
                  >
                    Notus JS
                  </a>{' '}
                  by{' '}
                  <a
                    href="https://www.creative-tim.com"
                    className="text-gray-500 hover:text-gray-800"
                    target="_blank"
                  >
                    {' '}
                    Creative Tim
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
};

export default Profile;
