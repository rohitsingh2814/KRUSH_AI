import {
  Mail,
  User,
  Sparkles,
} from "lucide-react";

import Navbar from "../components/layout/Navbar";

import {
  useAuth,
} from "../context/AuthContext";


function Profile() {

  const { user } = useAuth();


  if (!user) {
    return null;
  }


  return (
    <>
      {/* Navbar */}

      <Navbar />


      {/* Page */}

      <div className="min-h-screen bg-[#faf9f7] px-6 pb-16 pt-28">

        <div className="mx-auto max-w-4xl">


          {/* ==========================================
              HEADER
          ========================================== */}

          <div className="mb-8">

            <h1 className="text-3xl font-bold text-gray-900">
              Profile
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your Krush-AI account information.
            </p>

          </div>


          {/* ==========================================
              PROFILE CARD
          ========================================== */}

          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">


            {/* Profile Header */}

            <div className="bg-gray-900 px-6 py-10 sm:px-10">

              <div className="flex flex-col items-center gap-5 sm:flex-row">


                {/* Profile Image */}

                {user.profileImage ? (

                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="h-24 w-24 rounded-full border-4 border-white/20 object-cover"
                  />

                ) : (

                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-3xl font-bold text-gray-900">

                    {user.name
                      ?.charAt(0)
                      .toUpperCase()}

                  </div>

                )}


                {/* User */}

                <div className="text-center sm:text-left">

                  <h2 className="text-2xl font-bold text-white">

                    {user.name}

                  </h2>

                  <p className="mt-1 text-gray-400">

                    {user.email}

                  </p>

                </div>

              </div>

            </div>


            {/* ==========================================
                INFORMATION
            ========================================== */}

            <div className="p-6 sm:p-10">

              <h3 className="text-lg font-semibold text-gray-900">

                Personal Information

              </h3>


              <div className="mt-6 grid gap-5 sm:grid-cols-2">


                {/* Name */}

                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-700 shadow-sm">

                      <User size={18} />

                    </div>


                    <div>

                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">

                        Name

                      </p>

                      <p className="mt-1 font-medium text-gray-900">

                        {user.name}

                      </p>

                    </div>

                  </div>

                </div>


                {/* Email */}

                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-700 shadow-sm">

                      <Mail size={18} />

                    </div>


                    <div className="min-w-0">

                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">

                        Email

                      </p>

                      <p className="mt-1 truncate font-medium text-gray-900">

                        {user.email}

                      </p>

                    </div>

                  </div>

                </div>

              </div>


              {/* Krush AI */}

              <div className="mt-8 rounded-2xl border border-rose-100 bg-rose-50 p-5">

                <div className="flex gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-rose-500">

                    <Sparkles size={18} />

                  </div>


                  <div>

                    <h4 className="font-semibold text-gray-900">

                      Krush-AI Profile

                    </h4>


                    <p className="mt-1 text-sm leading-6 text-gray-600">

                      Your profile will be used to
                      personalize fashion recommendations
                      and AI style analysis.

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}


export default Profile;