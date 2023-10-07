import React from 'react';
import './homepage.css';

function HomePage() {
  return (
    <div className="HomePage">
         
  <div className="container">
        <section className="news-section">
          <h2>Noticias de Ferrari</h2>
          <div className="news-card">
           
            <h3>Titulo de la Noticia 1</h3>
            <p>Descripción breve de la noticia 1.</p>
          </div>
          <div className="news-card">
           
            <h3>Titulo de la Noticia 2</h3>
            <p>Descripción breve de la noticia 2.</p>
          </div>
        </section>

        <section className="product-section">
          <h2>Modelos de Ferrari</h2>
          <div className="product-card">
            <img src="https://th.bing.com/th/id/R.786499da9456c440a29a2d4aa24fd199?rik=p7jdhY3ASRzaOA&riu=http%3a%2f%2fitsmyviews.com%2fwp-content%2fuploads%2f2013%2f04%2fLatest-La-Ferrari-Car-HD-Widescreen-background-images.jpg&ehk=Y8BBbulVwrGWFFDAKPRzPYx0G%2b3MCSOQAzbeEBnVQLY%3d&risl=&pid=ImgRaw&r=0" alt="Modelo 1" />
            <h3>Modelo 1</h3>
            <p>Descripción del modelo 1.</p>
          </div>
          <div className="product-card">
            <img src="https://th.bing.com/th/id/R.713a9cabdbdcccb2a3600e7a72ba69df?rik=GlFlEF9jalPaUw&pid=ImgRaw&r=0" alt="Modelo 2" />
            <h3>Modelo 2</h3>
            <p>Descripción del modelo 2.</p>
          </div>
        </section>
      </div>

      <footer className="footer">
        &copy; {new Date().getFullYear()} Ferrari. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default HomePage;
