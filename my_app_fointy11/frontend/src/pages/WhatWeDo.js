import React, { useEffect, useState } from 'react';
import axios from 'axios';

function WhatWeDo() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        // API'den blog verilerini al
        axios.get('/api/blogs')
            .then(response => {
                setBlogs(response.data); // Verileri state'e kaydet
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <div className="advisor_section layout_padding">
                <div className="container">
                    <h1 className="what_text">What We Do</h1>
                </div>
                <div className="advisor_section_2 layout_padding">
                    <div className="container">
                        <div className="box_section">
                            <div className="row">
                                {blogs.map(blog => (
                                    <div key={blog.id} className="col-lg-4 col-sm-12">
                                        <div className="box_main">
                                            <div className="image_3"></div>
                                            <h4 className="consultative_text">{blog.feedback}</h4>
                                            <p className="ipsum_text">{blog.blogname}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WhatWeDo;
