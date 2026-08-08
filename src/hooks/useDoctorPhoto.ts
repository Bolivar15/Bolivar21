import { useState, useEffect } from 'react';
import { getDoctorPhoto, saveDoctorPhoto, resetDoctorPhoto } from '../utils/photoManager';

const ADMIN_MODE_KEY = 'debora_costa_admin_mode';

export function useDoctorPhoto() {
  const [photoUrl, setPhotoUrl] = useState<string>(getDoctorPhoto());
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_MODE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const handleUpdate = () => {
      setPhotoUrl(getDoctorPhoto());
    };

    window.addEventListener('doctor-photo-updated', handleUpdate);
    return () => {
      window.removeEventListener('doctor-photo-updated', handleUpdate);
    };
  }, []);

  const toggleAdminMode = () => {
    const nextState = !isAdminMode;
    setIsAdminMode(nextState);
    try {
      localStorage.setItem(ADMIN_MODE_KEY, String(nextState));
    } catch (e) {
      console.warn('Could not save admin mode state:', e);
    }
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione uma imagem válida (JPG, PNG ou WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) return;

      // Compress and resize using HTML Canvas to prevent localStorage quota errors
      const img = new Image();
      img.onload = () => {
        const MAX_SIZE = 1000;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_SIZE) {
            height = Math.round((height * MAX_SIZE) / width);
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = Math.round((width * MAX_SIZE) / height);
            height = MAX_SIZE;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          saveDoctorPhoto(compressedDataUrl);
          alert('Foto da Dra. Débora alterada e salva diretamente no arquivo public/dra-debora.jpg! Quando você publicar no GitHub/Cloudflare, ela permanecerá definitiva.');
        } else {
          saveDoctorPhoto(dataUrl);
          alert('Foto da Dra. Débora alterada e salva no arquivo public/dra-debora.jpg!');
        }
      };
      img.onerror = () => {
        saveDoctorPhoto(dataUrl);
        alert('Foto da Dra. Débora alterada!');
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  return {
    photoUrl,
    uploadPhoto: handleFileUpload,
    resetPhoto: resetDoctorPhoto,
    isCustom: photoUrl.startsWith('data:image'),
    isAdminMode,
    toggleAdminMode
  };
}
