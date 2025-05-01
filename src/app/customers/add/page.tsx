'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import './styles.css';

export default function AddCustomerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    birthYear: '',
    birthMonth: '',
    birthDate: '',
    email: '',
    phone: '',
    nic: '',
    points: '',
    picture: null as File | null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'customers'), {
        fullName: formData.fullName,
        gender: formData.gender,
        birthday: `${formData.birthYear}-${formData.birthMonth}-${formData.birthDate}`,
        email: formData.email,
        phone: formData.phone,
        nic: formData.nic,
        points: Number(formData.points),
        createdAt: new Date()
      });
      router.push('/customers');
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({...formData, picture: e.target.files[0]});
    }
  };

  return (
    <div className="customer-add-container">
      <h1 className="page-title">Add Customer</h1>
      
      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="form-section">
          <label className="section-label">Full Name</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            className="full-name-input"
            required
          />
        </div>

        {/* Gender */}
        <div className="form-section gender-section">
          <label className="section-label">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData({...formData, gender: e.target.value})}
            className="gender-select"
          >
            <option value="" disabled>Gender ▼</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Birthday */}
        <div className="form-section">
          <label className="section-label">Birthday</label>
          <div className="birthday-fields">
            <select
              value={formData.birthYear}
              onChange={(e) => setFormData({...formData, birthYear: e.target.value})}
              className="birthday-select"
            >
              <option value="" disabled>Year ▼</option>
              {Array.from({length: 100}, (_, i) => new Date().getFullYear() - i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            
            <select
              value={formData.birthMonth}
              onChange={(e) => setFormData({...formData, birthMonth: e.target.value})}
              className="birthday-select"
            >
              <option value="" disabled>Month ▼</option>
              {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            
            <select
              value={formData.birthDate}
              onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
              className="birthday-select"
            >
              <option value="" disabled>Date ▼</option>
              {Array.from({length: 31}, (_, i) => i + 1).map(date => (
                <option key={date} value={date}>{date}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Contact Information */}
        <div className="contact-section">
          <div className="contact-field">
            <label className="section-label">Email address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="contact-input"
              required
            />
          </div>
          
          <div className="contact-field">
            <label className="section-label">Phone number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="contact-input"
              required
            />
          </div>
        </div>

        {/* NIC and Points */}
        <div className="nic-points-section">
          <div className="nic-field">
            <label className="section-label">NIC number</label>
            <input
              type="text"
              value={formData.nic}
              onChange={(e) => setFormData({...formData, nic: e.target.value})}
              className="nic-input"
            />
          </div>
          
          <div className="points-field">
            <label className="section-label">TOP-UP points</label>
            <input
              type="number"
              value={formData.points}
              onChange={(e) => setFormData({...formData, points: e.target.value})}
              className="points-input"
              min="0"
            />
          </div>
        </div>

        {/* Picture Upload */}
        <div className="picture-upload-section">
          <div className="plus-icon-container">
            <div className="plus-icon-outer">
              <div className="plus-icon-inner"></div>
            </div>
            <span className="picture-upload-text">Add Customer Picture</span>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>

        {/* Buttons */}
        <div className="action-buttons">
          <button type="button" className="add-customer-btn">
            Add Customer
          </button>
          <button type="submit" className="done-btn">
            Done
          </button>
          <button type="button" className="remove-btn">
            Remove
          </button>
        </div>
      </form>
    </div>
  );
}