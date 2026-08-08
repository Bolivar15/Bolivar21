// Helper for managing custom uploaded doctor photo in localStorage

import defaultDoctorPhoto from '../assets/dra-debora.jpg';

const PHOTO_STORAGE_KEY = 'debora_costa_custom_photo';

export const getDoctorPhoto = (): string => {
  try {
    const customPhoto = localStorage.getItem(PHOTO_STORAGE_KEY);
    if (customPhoto && customPhoto.startsWith('data:image')) {
      return customPhoto;
    }
  } catch (e) {
    console.warn('Could not read custom photo from localStorage:', e);
  }
  return defaultDoctorPhoto;
};
export { defaultDoctorPhoto };

export const saveDoctorPhoto = (base64Image: string): void => {
  try {
    localStorage.setItem(PHOTO_STORAGE_KEY, base64Image);
    // Dispatch custom event so all components update immediately
    window.dispatchEvent(new Event('doctor-photo-updated'));

    // Asynchronously save directly to public/dra-debora.jpg on the server
    fetch('/api/upload-photo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageData: base64Image }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Servidor atualizado:', data);
      })
      .catch((err) => {
        console.warn('Servidor offline ou sem endpoint de upload:', err);
      });
  } catch (e) {
    console.error('Failed to save photo to localStorage:', e);
  }
};

export const resetDoctorPhoto = (): void => {
  try {
    localStorage.removeItem(PHOTO_STORAGE_KEY);
    window.dispatchEvent(new Event('doctor-photo-updated'));
  } catch (e) {
    console.error('Failed to reset photo:', e);
  }
};
