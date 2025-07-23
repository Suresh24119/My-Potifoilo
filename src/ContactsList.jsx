
import React, { useState, useEffect } from 'react';

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts');
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      } else {
        setError('Failed to fetch contacts');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">Loading contacts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Contact Messages</h2>
      {contacts.length === 0 ? (
        <div className="text-center text-gray-600">No contacts found.</div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-white p-6 rounded-lg shadow-md border">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                <span className="text-sm text-gray-500">
                  {new Date(contact.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Email:</strong> {contact.email}
              </p>
              <p className="text-gray-700">
                <strong>Message:</strong> {contact.message}
              </p>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6 text-center">
        <button
          onClick={fetchContacts}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default ContactsList;
