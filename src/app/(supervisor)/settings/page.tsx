'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  // Profile info
  const [name, setName] = useState('Supervisor Udara');
  const [email, setEmail] = useState('supervisor@cdl.lk');
  const [profilePic, setProfilePic] = useState<File | null>(null);

  // Password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notifications
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [appNotif, setAppNotif] = useState(true);

  //Logout from all
  const router = useRouter();

  const handleProfileSave = () => {
    alert('Profile updated!');
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match!');
      return;
    }
    alert('Password updated!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg border border-gray-200 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
      <p className="text-gray-600 mb-6">Update your profile, password, notifications, and account preferences.</p>

      {/* Profile Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Profile Picture */}
          <div className="flex items-center space-x-4">
            <div className="w-30 h-30 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
  {profilePic ? (
    <Image
      src={URL.createObjectURL(profilePic)}
      alt="Profile"
      width={112}   // 28 * 4
      height={112}
      className="object-cover w-full h-full"
    />
  ) : (
    <span className="text-gray-500 text-3xl">S</span>
  )}
</div>
            <label className="flex items-center space-x-2 cursor-pointer bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
  <span className="text-gray-700 text-sm">{profilePic ? 'Change Photo' : 'Upload Photo'}</span>
  <input type="file" accept="image/*" onChange={handleProfilePicChange} className="hidden" />
</label>
          </div>
          {/* Name & Email */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                 value={name}
                onChange={e => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleProfileSave}
          className="mt-4 px-5 py-2 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900"
        >
          Save Profile
        </button>
      </div>

      {/* Password Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <button
          onClick={handlePasswordChange}
          className="mt-4 px-5 py-2 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900"
        >
          Update Password
        </button>
      </div>

      {/* Notifications Section */}
<div>
  <h2 className="text-xl font-semibold text-gray-800 mb-4">Notifications</h2>
  <div className="flex flex-wrap gap-6">
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={emailNotif}
        onChange={() => setEmailNotif(!emailNotif)}
      />
      <span className="text-gray-800">Email notifications</span>
    </label>

    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={smsNotif}
        onChange={() => setSmsNotif(!smsNotif)}
      />
      <span className="text-gray-800">SMS notifications</span>
    </label>

    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={appNotif}
        onChange={() => setAppNotif(!appNotif)}
      />
      <span className="text-gray-800">App notifications</span>
    </label>
  </div>
</div>

      {/* Security Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Security</h2>
        <button
  onClick={() => router.push('/')} // replace '/login' with your login route
  className="px-5 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
>
  Log out from all devices
</button>
      </div>
    </div>
  );
}
