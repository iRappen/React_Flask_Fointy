import React from 'react';
import About from './About';
import Client from './Client';
import Services from './Services';
import WhatWeDo from './WhatWeDo';
function Home() {
  return (
    <div className="home_section layout_padding">
      <About />
      <Services />
      <WhatWeDo />
      <Client />
    </div>
  );
}

export default Home;
