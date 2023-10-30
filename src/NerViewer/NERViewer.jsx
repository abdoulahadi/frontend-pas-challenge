import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NERViewer.css';
import Navbar from '../Navbar/Navbar'; 



function NERViewer() {
  const [activeTab, setActiveTab] = useState('text'); 
  const [text, setText] = useState('');
  const [entities, setEntities] = useState([]);
  const [sentences, setSentences] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [pdfFile, setPdfFile] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPdfFile(null);
    setSentences("");
    setEntities([])
    setText("");
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePdfFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const processText = async () => {
    try {
      // Effectuer une requête vers l'API
      const response = await fetch('http://localhost:8000/annotate-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }), // Envoyer le texte saisi par l'utilisateur
      });

      if (response.ok) {
        const data = await response.json();
        setEntities(data.annotated_text.entities);
        setSentences(data.annotated_text.sentences); // Mettre à jour la phrase
      } else {
        console.error('La requête a échoué.');
      }
    } catch (error) {
      console.error('Erreur de communication avec l\'API:', error);
    }
  };

  const processPdf = async () => {
    try {
      if (!pdfFile) {
        console.error('Veuillez sélectionner un fichier PDF.');
        return;
      }

      // Créez un objet FormData pour envoyer le fichier PDF
      const formData = new FormData();
      formData.append('pdf_file', pdfFile);

      // Effectuez une requête vers l'API pour annoter le PDF
      const response = await fetch('http://localhost:8000/annotate-pdf', {
        method: 'POST',
        body: formData, // Envoyez le formulaire avec le fichier PDF
      });

      if (response.ok) {
        const data = await response.json();
        setEntities(data.annotated_text.entities);
        setSentences(data.annotated_text.sentences);
      } else {
        console.error('La requête a échoué.');
      }
    } catch (error) {
      console.error('Erreur de communication avec l\'API:', error);
    }
  };

  const filterEntities = () => {
    return entities.filter((entity) =>
      entity.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderTextWithEntities = () => {
    const textSegments = [];
    let currentIndex = 0;

    const filteredEntities = filterEntities();

    if (filteredEntities.length > 0) {
      filteredEntities.forEach((entity) => {
        // Text avant l'entité
        textSegments.push(sentences.slice(currentIndex, entity.start));

        // Texte de l'entité avec mise en forme
        const color = (() => {
          switch (entity.label) {
            case 'ORG':
              return 'org';
            case 'LOC':
              return 'loc';
            case 'PER':
              return 'per';
            case 'DATE':
              return 'date';
            default:
              return 'success';
          }
        })();
        const entityText = (
          <span key={currentIndex} className={`badge ${color}`}>
            {entity.text} ({entity.label})
          </span>
        );
        textSegments.push(entityText);

        // Mettez à jour l'index actuel
        currentIndex = entity.end;
      });
    }

    // Texte après la dernière entité
    textSegments.push(sentences.slice(currentIndex));

    return textSegments;
  };

  return (
    <>
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />
    <div className="container mt-2 r">
          <div className="form-group row m-4">
            <input
              type="text"
              className="form-control"
              placeholder="Rechercher une entité"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
      {activeTab === 'text' ? (
        <div className="col m-4">
          <div className='row m-4'>
            <textarea
              rows="4"
              placeholder="Entrez votre texte ici"
              value={text}
              onChange={handleTextChange}
            />
          </div>
          <div className="row m-4">
            <button onClick={processText} className="btn btn-primary">
              Extraire les entités nommées du texte
            </button>
          </div>
        </div>
      ) : (
        <div className="col m-4">
          <div className="row m-4">
            <input
              type="file"
              accept=".pdf"
              onChange={handlePdfFileChange}
            />
          </div>
          <div className="row m-4">
            <button onClick={processPdf} className="btn btn-primary">
              Extraire les entités nommées du PDF
            </button>
          </div>
        </div>
      )}
      <div className="mt-0">
        {
          sentences!=="" && (
            <>
              <p className='question'>
          <strong>Phrase:</strong> {sentences}
        </p>
        <p className='response'>
          {renderTextWithEntities()}
        </p>
            </>
        
        )
      }
    
      </div>
    </div>

    </>
  );
}

export default NERViewer;
