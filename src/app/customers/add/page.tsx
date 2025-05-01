'use client';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import Image from 'next/image';
import './styles.css';

export default function AddCustomerPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    birthYear: '',
    birthMonth: '',
    birthDate: '',
    email: '',
    phone: '',
    nic: '',
    points: '0',
    pictureUrl: ''
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.birthYear || !formData.birthMonth || !formData.birthDate) {
      newErrors.birthday = 'Complete birthday is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone) newErrors.phone = 'Phone number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      try {
        setIsSubmitting(true);
        const storageRef = ref(storage, `customers/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        setFormData({...formData, pictureUrl: downloadUrl});
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      await addDoc(collection(db, 'customers'), {
        fullName: formData.fullName.trim(),
        gender: formData.gender,
        birthday: `${formData.birthYear}-${formData.birthMonth}-${formData.birthDate}`,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        nic: formData.nic.trim(),
        points: Number(formData.points),
        pictureUrl: formData.pictureUrl,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      router.push('/customers');
    } catch (error) {
      console.error('Error adding customer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removePicture = () => setFormData({...formData, pictureUrl: ''});

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
            className={`full-name-input ${errors.fullName ? 'input-error' : ''}`}
            required
            aria-required="true"
            placeholder="Enter full name"
            title="Full Name"
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>

        {/* Gender */}
        <div className="form-section gender-section">
          <label className="section-label">Gender</label>
          <label htmlFor="gender-select" className="visually-hidden">Gender</label>
          <select
            id="gender-select"
            value={formData.gender}
            onChange={(e) => setFormData({...formData, gender: e.target.value})}
            className={`gender-select ${errors.gender ? 'input-error' : ''}`}
            required
            aria-required="true"
          >
            <option value="" disabled>Gender ▼</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <span className="error-message">{errors.gender}</span>}
        </div>

        {/* Birthday */}
        <div className="form-section">
          <label className="section-label">Birthday</label>
          <div className="birthday-fields">
            <label htmlFor="birthYear-select" className="visually-hidden">Birth Year</label>
            <select
              id="birthYear-select"
              value={formData.birthYear}
              onChange={(e) => setFormData({...formData, birthYear: e.target.value})}
              className={`birthday-select ${errors.birthday ? 'input-error' : ''}`}
              required
              aria-required="true"
            >
              <option value="" disabled>Year ▼</option>
              {Array.from({length: 100}, (_, i) => new Date().getFullYear() - i).map(year => (
                <option key={year} value={String(year).padStart(2, '0')}>{year}</option>
              ))}
            </select>
            
            <select
              title="Birth Month"
              value={formData.birthMonth}
              onChange={(e) => setFormData({...formData, birthMonth: e.target.value})}
              className={`birthday-select ${errors.birthday ? 'input-error' : ''}`}
              required
              aria-required="true"
            >
              <option value="" disabled>Month ▼</option>
              {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                <option key={month} value={String(month).padStart(2, '0')}>{month}</option>
              ))}
            </select>
            
            <select
              title="Birth Date"
              value={formData.birthDate}
              onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
              className={`birthday-select ${errors.birthday ? 'input-error' : ''}`}
              required
              aria-required="true"
            >
              <option value="" disabled>Date ▼</option>
              {Array.from({length: 31}, (_, i) => i + 1).map(date => (
                <option key={date} value={String(date).padStart(2, '0')}>{date}</option>
              ))}
            </select>
          </div>
          {errors.birthday && <span className="error-message">{errors.birthday}</span>}
        </div>

        {/* Contact Information */}
        <div className="contact-section">
          <div className="contact-field">
            <label className="section-label">Email address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`contact-input ${errors.email ? 'input-error' : ''}`}
              required
              aria-required="true"
              placeholder="Enter email address"
              title="Email Address"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="contact-field">
            <label className="section-label">Phone number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className={`contact-input ${errors.phone ? 'input-error' : ''}`}
              required
              aria-required="true"
              placeholder="Enter phone number"
              title="Phone Number"
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
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
              placeholder="Enter NIC number"
              title="NIC Number"
            />
          </div>
          
          <div className="points-field">
            <label className="section-label">TOP-UP points</label>
            <input
  type="file"
  id="customer-picture-upload"
  accept="image/*"
  onChange={handleFileChange}
  className="file-input"
  ref={fileInputRef}
  aria-labelledby="picture-upload-label"
  title="Upload customer photo"
/>
          </div>
        </div>

        {/* Picture Upload */}
        <div className="picture-upload-section">
          {formData.pictureUrl ? (
            <div className="picture-preview">
              <div className="image-wrapper">
                <Image
                  src={formData.pictureUrl}
                  alt="Customer preview"
                  width={100}
                  height={100}
                  className="preview-image"
                />
              </div>
              <button 
                type="button" 
                onClick={removePicture}
                className="remove-picture-btn"
                aria-label="Remove customer picture"
              >
                Remove
              </button>
            </div>
          ) : (
          <>
      <label 
        htmlFor="customer-picture-upload" 
        className="picture-upload-label"
        id="picture-upload-label"
      >
        <div className="plus-icon-container">
          <div className="plus-icon-outer">
            <div className="plus-icon-inner"></div>
          </div>
          <span className="picture-upload-text">Add Customer Picture</span>
        </div>
        <span className="visually-hidden">Upload customer photo</span>
      </label>
      <input
        type="file"
        id="customer-picture-upload"
        accept="image/*"
        onChange={handleFileChange}
        className="file-input"
        ref={fileInputRef}
        aria-labelledby="picture-upload-label"
        title="Upload customer photo"
      />
    </>
  )}
</div>

        {/* Buttons */}
        <div className="action-buttons">
        <button 
  type="submit" 
  className="done-btn"
  disabled={isSubmitting}
  {...(isSubmitting ? {'aria-busy': 'true'} : {})}
>
  {isSubmitting ? 'Saving...' : 'Save Customer'}
</button>
          <button 
            type="button" 
            onClick={() => router.push('/customers')}
            className="cancel-btn"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}