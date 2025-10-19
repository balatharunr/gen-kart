"use client";

import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import UserMenu from "@/components/UserMenu";
import LoadingSpinner from "@/components/LoadingSpinner";
import Marquee from "@/components/Marquee";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('signin');
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home'); // 'home' or 'jersey'

  const { user, loading, signInWithGoogle, signOut } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSidebar = () => {
    console.log('Toggle sidebar clicked, current state:', isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openAuthModal = (tab = 'signin') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleDirectGoogleSignIn = async () => {
    const { error } = await signInWithGoogle();
    if (error) {
      console.error('Google sign-in error:', error);
      // Optionally show a toast notification or error message
    }
  };

  const handleMobileSignOut = async () => {
    await signOut();
    setIsMobileProfileOpen(false);
  };

  const handleJerseyClick = () => {
    setActiveSection('jersey');
    setIsMobileMenuOpen(false); // Close mobile menu if open
  };

  const handleHomeClick = () => {
    setActiveSection('home');
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Desktop Left Sidebar Navigation - Hidden on mobile */}
      <aside className={`hidden lg:fixed left-0 top-0 h-full bg-white shadow-lg z-40 transition-transform duration-300 ease-in-out lg:flex flex-col items-center py-6 w-20 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Navigation Items */}
        <div className="flex flex-col space-y-8 mt-32">
          {/* Jersey */}
          <div className="flex flex-col items-center group cursor-pointer" onClick={handleJerseyClick}>
            <div className="p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <Image
                src="/images/jersey.svg"
                alt="Jersey"
                width={36}
                height={36}
                className="w-10 h-10 text-gray-600 group-hover:text-red-600"
              />
            </div>
            <span className="text-xs text-gray-600 group-hover:text-red-600 mt-1">Jersey</span>
          </div>

          {/* Trending */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-gray-600 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-xs text-gray-600 group-hover:text-red-600 mt-1">Trending</span>
          </div>

          {/* Sell */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-gray-600 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className="text-xs text-gray-600 group-hover:text-red-600 mt-1">Sell</span>
          </div>

          {/* My Stuff */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-gray-600 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <span className="text-xs text-gray-600 group-hover:text-red-600 mt-1">My Stuff</span>
          </div>

          {/* Explore */}
          <div className="flex flex-col items-center group cursor-pointer">
            <div className="p-3 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-gray-600 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="text-xs text-gray-600 group-hover:text-red-600 mt-1">Explore</span>
          </div>
        </div>
      </aside>

      {/* Mobile Menu - Slides over content without overlay */}
      <div className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-[60] transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            <Image
              src="/images/genkart logo 2.png"
                alt="Genkart Logo"
                width={240}
                height={80}
                className="h-10 w-auto lg:h-25 lg:w-auto cursor-pointer"
                priority
                onClick={handleHomeClick}
            />
          </h2>
          <button onClick={toggleMobileMenu} className="p-2 hover:bg-gray-100 rounded">
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer" onClick={handleJerseyClick}>
            <Image
              src="/images/jersey.svg"
              alt="Jersey"
              width={24}
              height={24}
              className="w-6 h-6 text-gray-600"
            />
            <span className="text-gray-700">Jersey</span>
          </div>
          <div className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-gray-700">Trending</span>
          </div>
          <div className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-gray-700">Sell</span>
          </div>
          <div className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="text-gray-700">My Stuff</span>
          </div>
          <div className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="text-gray-700">Explore</span>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          {loading ? (
            <LoadingSpinner />
          ) : user ? (
            <div className="text-center">
              <p className="text-gray-700 mb-2">Welcome, {user.displayName || 'User'}!</p>
            </div>
          ) : (
            <button 
              onClick={handleDirectGoogleSignIn}
              className="w-full flex items-center justify-center space-x-2 bg-blue-900 text-white px-4 py-3 rounded-md hover:bg-blue-800 transition font-medium"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>
        )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto pl-2 pr-4 sm:pl-4 sm:pr-6 lg:pl-6 lg:pr-8">
          <div className="flex items-center justify-between h-16 lg:h-28">
            {/* Left Section - Hamburger Menu + Logo */}
            <div className="flex items-center -ml-2 lg:-ml-26">
              {/* Mobile Hamburger Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 mr-2 hover:bg-gray-100 rounded-lg transition-colors z-50"
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              {/* Desktop Hamburger Menu Button */}
              <button
                onClick={toggleSidebar}
                className="hidden lg:block p-2 mr-6 ml-0 hover:bg-gray-100 rounded-lg transition-colors z-50"
                aria-label="Toggle navigation menu"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              {/* Brand Logo - Responsive sizing */}
              <Image
                src="/images/genkart logo 2.png"
                alt="Genkart Logo"
                width={240}
                height={80}
                className="h-10 w-auto lg:h-25 lg:w-auto cursor-pointer"
                priority
                onClick={handleHomeClick}
              />
            </div>

            {/* Center Section - Search Bar - Hidden on mobile */}
            <div className="flex-1 max-w-2xl mx-4 lg:mx-8 hidden lg:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products or designs"
                  className="w-full px-4 py-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  spellCheck="false"
                  data-ms-editor="false"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-900 text-white p-2 rounded-full hover:bg-blue-800 transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Section - Sign In and Cart */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Sign In with Google Button - Hidden on mobile */}
              {loading ? (
                <div className="hidden lg:block">
                  <LoadingSpinner size="small" />
                </div>
              ) : user ? (
                <div className="hidden lg:block">
                  <UserMenu />
                </div>
              ) : (
                <button 
                  onClick={handleDirectGoogleSignIn}
                  className="hidden lg:flex items-center space-x-2 bg-blue-900 text-white px-6 py-2.5 rounded-md hover:bg-blue-800 transition font-medium"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Sign in with Google</span>
              </button>
            )}

              {/* Cart Icon - Responsive sizing with conditional positioning */}
              <button className={`relative p-1 lg:p-2 hover:bg-gray-100 rounded-full transition ${user ? 'mr-1' : ''}`}>
                <Image
                  src="/images/cart logo.png"
                  alt="Cart"
                  width={48}
                  height={48}
                  className="h-8 w-8 lg:h-12 lg:w-12"
                />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 lg:h-6 lg:w-6 flex items-center justify-center">
                  0
                </span>
              </button>

              {/* Mobile Profile Picture - Only visible on mobile when user is logged in */}
              {user && (
                <div className="lg:hidden relative">
                  <button
                    onClick={() => setIsMobileProfileOpen(!isMobileProfileOpen)}
                    className="flex items-center space-x-1 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        className="w-8 h-8 rounded-full border-2 border-gray-200"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center border-2 border-gray-200">
                        <span className="text-white text-sm font-medium">
                          {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    {/* Dropdown Arrow */}
                    <svg 
                      className={`w-3 h-3 text-gray-600 transition-transform ${isMobileProfileOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Mobile Profile Dropdown */}
                  {isMobileProfileOpen && (
                    <>
                      {/* Backdrop */}
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsMobileProfileOpen(false)}
                      />
                      
                      {/* Dropdown Menu */}
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
                        <div className="p-4 border-b">
                          <div className="flex items-center space-x-3">
                            {user.photoURL ? (
                              <img
                                src={user.photoURL}
                                alt={user.displayName || 'User'}
                                className="w-10 h-10 rounded-full"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
                                <span className="text-white text-base font-medium">
                                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                            <div>
                              <p className="font-medium text-gray-900">{user.displayName || 'User'}</p>
                              <p className="text-sm text-gray-500 break-all">{user.email}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="py-2">
                          <button 
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsMobileProfileOpen(false)}
                          >
                            <div className="flex items-center space-x-3">
                              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span className="text-gray-700">Profile</span>
                            </div>
                          </button>
                          
                          <button 
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsMobileProfileOpen(false)}
                          >
                            <div className="flex items-center space-x-3">
                              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                              </svg>
                              <span className="text-gray-700">My Orders</span>
                            </div>
                          </button>
                          
                          <button 
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsMobileProfileOpen(false)}
                          >
                            <div className="flex items-center space-x-3">
                              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                              <span className="text-gray-700">Wishlist</span>
                            </div>
                          </button>
                          
                          <button 
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsMobileProfileOpen(false)}
                          >
                            <div className="flex items-center space-x-3">
                              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="text-gray-700">Settings</span>
                            </div>
                          </button>
                        </div>
                        
                        <div className="border-t py-2">
                          <button 
                            onClick={handleMobileSignOut}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors text-red-600"
                          >
                            <div className="flex items-center space-x-3">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              <span>Sign Out</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Search Bar - Full width on mobile */}
          <div className="lg:hidden pb-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products or designs"
                className="w-full px-4 py-2.5 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                spellCheck="false"
                data-ms-editor="false"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-900 text-white p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Marquee Banner */}
      <Marquee />

      {/* Jersey Products Section */}
      {activeSection === 'jersey' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {/* Create New Design Box */}
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer group aspect-[3/4]">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-sm font-medium text-gray-900 text-center mb-1">Create New</h3>
              <p className="text-xs text-gray-500 text-center">Design your jersey</p>
            </div>

            {/* Jersey Product 1 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
              <div className="aspect-[3/4] bg-gradient-to-br from-red-500 to-red-700 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-2xl font-bold mb-1">23</div>
                    <div className="text-xs">PLAYER</div>
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 truncate">Red Sports Jersey</h3>
                <p className="text-xs text-gray-500 mt-1">Custom Design</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-gray-900">₹1,299</span>
                  <span className="text-xs text-gray-500 line-through">₹1,599</span>
                </div>
              </div>
            </div>

            {/* Jersey Product 2 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
              <div className="aspect-[3/4] bg-gradient-to-br from-blue-500 to-blue-700 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-2xl font-bold mb-1">10</div>
                    <div className="text-xs">STAR</div>
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 truncate">Blue Team Jersey</h3>
                <p className="text-xs text-gray-500 mt-1">Premium Quality</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-gray-900">₹1,499</span>
                  <span className="text-xs text-gray-500 line-through">₹1,799</span>
                </div>
              </div>
            </div>

            {/* Jersey Product 3 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
              <div className="aspect-[3/4] bg-gradient-to-br from-green-500 to-green-700 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-2xl font-bold mb-1">7</div>
                    <div className="text-xs">CHAMPION</div>
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 truncate">Green Elite Jersey</h3>
                <p className="text-xs text-gray-500 mt-1">Limited Edition</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-gray-900">₹1,699</span>
                  <span className="text-xs text-gray-500 line-through">₹1,999</span>
                </div>
              </div>
            </div>

            {/* Jersey Product 4 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
              <div className="aspect-[3/4] bg-gradient-to-br from-purple-500 to-purple-700 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-2xl font-bold mb-1">99</div>
                    <div className="text-xs">LEGEND</div>
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 truncate">Purple Pro Jersey</h3>
                <p className="text-xs text-gray-500 mt-1">Professional Grade</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-gray-900">₹1,899</span>
                  <span className="text-xs text-gray-500 line-through">₹2,199</span>
                </div>
              </div>
            </div>

            {/* Jersey Product 5 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
              <div className="aspect-[3/4] bg-gradient-to-br from-orange-500 to-orange-700 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-2xl font-bold mb-1">1</div>
                    <div className="text-xs">MVP</div>
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 truncate">Orange Victory Jersey</h3>
                <p className="text-xs text-gray-500 mt-1">Championship Edition</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-gray-900">₹2,099</span>
                  <span className="text-xs text-gray-500 line-through">₹2,499</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Home Content - Only shown when activeSection is 'home' */}
      {activeSection === 'home' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to GenKart</h1>
            <p className="text-lg text-gray-600">Your Digital Marketplace for Custom Designs</p>
          </div>
        </div>
      )}
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        initialTab={authModalTab}
      />
    </div>
  );
}
