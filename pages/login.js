import AuthLayout from '@/components/AuthLayout';
import {SiGoogle} from 'react-icons/si';

export default function Login() {
  return (
    <div className="flex items-center justify-center shadow-md rounded-xl">
      <div className="flex flex-col justify-center flex-1 px-8 py-10 overflow-hidden">
        <div className="w-full max-w-xl mx-auto lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-neutral-600">Sign in.</h2>
          </div>
          <div className="mt-8">
            <div className="mt-6">
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-600"> Email address </label>
                  <div className="mt-1">
                    <input id="email" name="email" type="email" autoComplete="email" required="" placeholder="Your Email" className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"/>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="password" className="block text-sm font-medium text-neutral-600"> Password </label>
                  <div className="mt-1">
                    <input id="password" name="password" type="password" autoComplete="current-password" required="" placeholder="Your Password" className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"/>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" placeholder="Your password" className="w-4 h-4 text-blue-600 border-gray-200 rounded focus:ring-blue-500"/>
                    <label htmlFor="remember-me" className="block ml-2 text-sm text-neutral-600"> Remember me </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500"> Forgot your password? </a>
                  </div>
                </div>

                <div>
                  <button type="submit" className="flex items-center justify-center w-full px-10 py-4 text-sm font-bold text-center text-white transition duration-500 ease-in-out transform bg-blue-700 rounded-xl hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 select-none">Sign in</button>
                </div>
              </form>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-neutral-600 bg-white"> Or continue with </span>
                </div>
              </div>
              <div className='w-full flex items-center justify-center py-4 bg-white shadow-md rounded-xl select-none hover:bg-gray-50 focus:outline-none transition duration-500 ease-in-out transform focus:ring-2 focus:ring-offset-2 focus:ring-gray-100'>
                <SiGoogle className='w-4 h-4'/>
                <span className="ml-4 font-bold text-sm"> SignIn with Google</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.getLayout = function getLayout(page) {
  return (
    <AuthLayout>
      {page}
    </AuthLayout>
  );
};
