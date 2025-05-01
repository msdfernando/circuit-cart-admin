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

  const triggerFileInput = () => fileInputRef.current?.click();
  const removePicture = () => setFormData({...formData, pictureUrl: ''});

  return (
    <div className="customer-add-container">
      <h1 className="page-title">Add Customer</h1>
      
      <form onSubmit={handleSubmit}>
        {/* Form fields remain the same until picture upload section */}

        {/* Updated Picture Upload Section with Next.js Image */}
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
                  onError={(e) => {
                    e.currentTarget.src = '/default-avatar.png';
                  }}
                />
              </div>
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

        {/* Buttons remain the same */}
      </form>
    </div>
  );
}