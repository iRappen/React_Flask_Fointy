import React, { useState, useEffect } from 'react';

function About() {
    const [abouts, setAbouts] = useState([]);

    useEffect(() => {
        fetch('/api/about')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setAbouts(data))
            .catch(error => console.error('Error fetching about data:', error));
    }, []);

    return (
        <div className="about_section layout_padding">
            <div className="container">
                <div className="row">
                    {abouts.map((about, index) => (
                        <div key={index} className="col-sm-6">
                            <div><img src={`/images/${about.image_filename}`} alt="About" className="image_8" /></div>
                            <h1 className="about_taital">{about.feedback}</h1>
                            <p className="lorem_text">{about.aboutname}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default About;
