import React, { useState } from 'react';
import '../styles/PopupStyle.css'; // Create a separate CSS file for styling

const CustomPopup = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [topfiles, setTopfiles] = useState(null);

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    return (
        <div>
            <button onClick={openPopup}>Open Popup</button>

            {isPopupOpen && (
                <div className="custom-popup-overlay">
                    <div className="custom-popup">
                        <span className="close-icon" onClick={closePopup}>
                            &times;
                        </span>

                        <h3>Total Rating</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>File Name</th>
                                    <th>Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topfiles.map((file) => (
                                    <tr key={file.fileName}>
                                        <td>{file.fileName}</td>
                                        <td>{file.rating}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomPopup;
