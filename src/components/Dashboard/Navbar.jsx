import React from 'react'

export const Navbar = () => {
  return (
    <>
                <nav className="fixed top-0 z-50 w-full bg-gray-100 border-b border-gray-100">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center justify-start rtl:justify-end">
                            <img className="h-14" src="./pin.svg" alt="logo" />
                        </div>
                        {/*  */}
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                            <span className='text-xl mr-4'> Erick Rabago </span>
                                {/* User photo */}
                                <div>

                                    <button type="button" className="flex text-sm  bg-transparent rounded-full ring-4 ring-custom-MainSky" aria-expanded="false">
                                        <span className="sr-only">Open user menu</span>
                                        <img className="h-14 w-14 bg-cover rounded-full" src="./examplephoto.jpg" alt="user photo"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
    </>
  )
}
