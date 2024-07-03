import React, { useState, useEffect } from 'react';

function Services() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('/api/services')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setServices(data))
            .catch(error => console.error('Error fetching service data:', error));
    }, []);

    return (
        <section className="service_section layout_padding">
            <div className="service_container">
                <div className="container">
                    <div className="heading_container">
                        <h2>Services</h2>
                        <p>
                            This may include high-rise, commercial, and residential construction, project management, architectural design, 
                            infrastructure work, restoration, energy-efficient solutions, facility management, consultancy, and construction management. 
                            Tailoring content to showcase expertise and including project references enhances credibility and appeal.
                        </p>
                    </div>
                    <div className="row">
                        {services.map(service => (
                            <div key={service.id} className="col-md-6 col-lg-3">
                                <div className="box">
                                    <div className="img-box">
                                        <img src={`/images/${service.image_filename}`} alt="" />
                                    </div>
                                    <div className="detail-box">
                                        <h5>{service.title}</h5>
                                        <p>{service.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;
