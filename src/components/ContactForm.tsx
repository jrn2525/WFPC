import React from 'react';
import type { ContactInfo } from '../types';
import { User, Phone, Mail } from 'lucide-react';

interface ContactFormProps {
  contactInfo: ContactInfo;
  onChange: (info: ContactInfo) => void;
}

export function ContactForm({ contactInfo, onChange }: ContactFormProps) {
  const handleChange = (field: keyof ContactInfo) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...contactInfo, [field]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Contact Information</h3>
      
      <div className="space-y-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={contactInfo.name}
            onChange={handleChange('name')}
            placeholder="Full Name"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                     focus:ring-1 focus:ring-primary focus:border-primary
                     bg-[#E6E7EB]"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="tel"
            value={contactInfo.phone}
            onChange={handleChange('phone')}
            placeholder="Phone Number"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                     focus:ring-1 focus:ring-primary focus:border-primary
                     bg-[#E6E7EB]"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            value={contactInfo.email}
            onChange={handleChange('email')}
            placeholder="Email Address"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                     focus:ring-1 focus:ring-primary focus:border-primary
                     bg-[#E6E7EB]"
          />
        </div>
      </div>
    </div>
  );
}