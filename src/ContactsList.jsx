
import React, { useState, useEffect } from 'react'

export default function ContactsList() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts')
      if (response.ok) {
        const data = await response.json()
        setContacts(data)
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading contacts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Messages</h1>
          <p className="text-xl text-gray-600">Messages received through the contact form</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {contacts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">
                <i className="fas fa-inbox"></i>
              </div>
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">No messages yet</h2>
              <p className="text-gray-500">Contact messages will appear here when submitted.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {contacts.map((contact) => (
                <div key={contact.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                        <i className="fas fa-user text-indigo-600"></i>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                        <a href={`mailto:${contact.email}`} className="text-indigo-600 hover:text-indigo-800 transition-colors">
                          {contact.email}
                        </a>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(contact.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">{contact.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  )
}
