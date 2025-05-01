'use client';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
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

  const triggerFileInput = () => fileInputRef.current?.click();
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
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>

        {/* Gender */}
        <div className="form-section gender-section">
          <label className="section-label">Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData({...formData, gender: e.target.value})}
            className={`gender-select ${errors.gender ? 'input-error' : ''}`}
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
            <select
              value={formData.birthYear}
              onChange={(e) => setFormData({...formData, birthYear: e.target.value})}
              className={`birthday-select ${errors.birthday ? 'input-error' : ''}`}
            >
              <option value="" disabled>Year ▼</option>
              {Array.from({length: 100}, (_, i) => new Date().getFullYear() - i).map(year => (
                <option key={year} value={String(year).padStart(4, '0')}>{year}</option>
              ))}
            </select>
            
            <select
              value={formData.birthMonth}
              onChange={(e) => setFormData({...formData, birthMonth: e.target.value})}
              className={`birthday-select ${errors.birthday ? 'input-error' : ''}`}
            >
              <option value="" disabled>Month ▼</option>
              {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                <option key={month} value={String(month).padStart(2, '0')}>{month}</option>
              ))}
            </select>
            
            <select
              value={formData.birthDate}
              onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
              className={`birthday-select ${errors.birthday ? 'input-error' : ''}`}
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
          {formData.pictureUrl ? (
            <div className="picture-preview">
              <img src={formData.pictureUrl} alt="Customer" className="preview-image" />
              <button 
                type="button" 
                onClick={removePicture}
                className="remove-picture-btn"
              >
                Remove
              </button>
            </div>
          ) : (
            <>
              <div className="plus-icon-container" onClick={triggerFileInput}>
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
                ref={fileInputRef}
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