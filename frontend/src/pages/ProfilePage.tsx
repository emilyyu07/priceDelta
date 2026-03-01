import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { userApi } from '../api/user'; // Import userApi
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card'; // Assuming Card is also a common component

export const ProfilePage: React.FC = () => {
  const { user, refreshUser } = useAuth(); // Use refreshUser
  const [name, setName] = useState(user?.name || '');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) {
      setError('User not authenticated.');
      return;
    }
    if (name === user.name) {
      setMessage('No changes to save.');
      return;
    }

    setIsSaving(true);
    setMessage('');
    setError('');

    try {
      await userApi.updateProfile({ name });
      await refreshUser(); // Call refreshUser to update the context
      setMessage('Profile updated successfully!');
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary-900 mb-2">Profile</h1>
        <p className="text-primary-600">The person behind the savings.</p>
      </div>

      <Card> {/* Wrap content in Card for consistent styling */}
        <div className="mb-6">
          <Input
            id="email"
            type="email"
            label="Email"
            value={user?.email || ''}
            disabled
            className="cursor-not-allowed bg-primary-100"
          />
          <p className="text-xs text-primary-500 mt-1">Email is locked in — like your commitment to a good deal.</p>
        </div>

        <div className="mb-6">
          <Input
            id="name"
            type="text"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        {message && (
          <div className="text-green-600 text-sm bg-green-50 p-3 rounded-lg mb-4">
            {message}
          </div>
        )}
        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full md:w-auto"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </Card>
    </div>
  );
};