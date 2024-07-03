import React, { useState, useEffect } from 'react';

function Client() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetch('/api/client')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setClients(data))
            .catch(error => console.error('Error fetching client data:', error));
    }, []);

    // Clients'i gruplara bölmek için bir yardımcı fonksiyon
    const chunkArray = (arr, size) => {
        const chunkedArray = [];
        for (let i = 0; i < arr.length; i += size) {
            chunkedArray.push(arr.slice(i, i + size));
        }
        return chunkedArray;
    };

    const chunkedClients = chunkArray(clients, 3); // Her biri 3 müşteri içeren bir grup oluştur

    return (
        <div className="client_section layout_padding">
            <div className="container">
                <h1 className="what_text">What Our Clients Say</h1>
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        {chunkedClients.map((group, index) => (
                            <li key={index} data-target="#carouselExampleIndicators" data-slide-to={index} className={index === 0 ? 'active' : ''}></li>
                        ))}
                    </ol>
                    <div className="carousel-inner">
                        {chunkedClients.map((group, index) => (
                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <div className="client_section_2 layout_padding">
                                    <div className="row">
                                        {group.map((client, clientIndex) => (
                                            <div key={clientIndex} className="col-lg-4 col-sm-12">
                                                <div className="client_card">
                                                    <p className="ipsum_text">{client.feedback}</p>
                                                    <div className="image_16">
                                                        <img src={`/images/${client.image_filename}`} alt={client.clientname} />
                                                    </div>
                                                    <div className="adipiscing_text">{client.clientname}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Client;
