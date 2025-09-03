import { useState } from 'react';

function PhotoUpload(){
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedPhoto, setUploadedPhoto] = useState(null);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            // create preview URL so user can see the image
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a photo first!');
            return;
        }

        setUploading(true)
        try {
            // create package for image
            const formData = new FormData();
            formData.append('photo', selectedFile);

            //send to backend
            const response = await fetch('http://localhost:5001/api/clothes/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                // turn to json file
                const result = await response.json();
                setUploadedPhoto(result.file);
                alert('Photo uploaded successfully!');
            } else {
                throw new Error('Photo upload failed.');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Photo upload failed. Make sure backend is running');
        } finally {
            setUploading(false);
        }
    };

    // reset everthing to start over
    const resetUpload = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setUploadedPhoto(null);
        // Clear the file input
        document.getElementById('photo-input').value = '';
    };

    
return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        📸 Upload Your Clothes
      </h2>

      {/* FILE INPUT SECTION */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choose a photo:
        </label>
        <input
          id="photo-input"
          type="file"
          accept="image/*" // Only allow images
          onChange={handleFileSelect}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
        />
      </div>

      {/* PREVIEW SECTION */}
      {previewUrl && (
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border"
          />
          <p className="text-xs text-gray-500 mt-2">
            File: {selectedFile?.name} ({Math.round(selectedFile?.size / 1024)} KB)
          </p>
        </div>
      )}

      {/* BUTTONS */}
      <div className="space-y-3">
        {!uploadedPhoto ? (
          <>
            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                !selectedFile || uploading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
              }`}
            >
              {uploading ? 'Uploading...' : 'Upload Photo'}
            </button>
            
            {selectedFile && (
              <button
                onClick={resetUpload}
                className="w-full py-2 px-4 rounded-lg font-medium bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors"
              >
                Choose Different Photo
              </button>
            )}
          </>
        ) : (
          <div className="text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-green-800 font-medium">✅ Upload Successful!</p>
              <p className="text-green-600 text-sm mt-1">
                Your photo has been processed and saved.
              </p>
            </div>
            
            <button
              onClick={resetUpload}
              className="btn-primary"
            >
              Upload Another Photo
            </button>
          </div>
        )}
      </div>

      {/* UPLOAD RESULT INFO */}
      {uploadedPhoto && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Upload Details:</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>File:</strong> {uploadedPhoto.originalName}</p>
            <p><strong>Uploaded:</strong> {new Date(uploadedPhoto.uploadedAt).toLocaleString()}</p>
            <p><strong>Status:</strong> Waiting for AI analysis...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotoUpload;