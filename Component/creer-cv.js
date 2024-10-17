// import React, { useRef, useState } from 'react';
// import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';
// // import html2canvas from 'html2canvas';


// function CVForm() {
//     const pdfRef = useRef();


//   const [formData, setFormData] = useState({
//     prenom: '',
//     nom: '',
//     titre: '',
//     adresse: '',
//     postal: '',
//     ville: '',
//     telephone: '',
//     email: '',
//     age: '',
//     permis: '',
//     image: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setFormData({ ...formData, image: reader.result });
//     };
//     reader.readAsDataURL(file);
//   };


//   const downPDF = () => {
//     const input = pdfRef.current;
//     html2canvas(input).then((canvas)=>{
//         const imgData = canvas.toDataURL("image/png");
//         const pdf = new jsPDF("p","mm","a4",true);
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = pdf.internal.pageSize.getHeight();
//         const imgWidth = canvas.width;
//         const imgHeight = canvas.height;
//         const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
//         const imgX = (pdfWidth - imgWidth * ratio);
//         const imgY = 10;
//         pdf.addImage(imgData, "PNG", imgX ,imgY, imgWidth * ratio, imgHeight * ratio);
//         pdf.save(`${formData.prenom}-${formData.nom}-CV.pdf`);
//     })
//   }



//   const skills = ['JavaScript', 'React', 'CSS', 'HTML', 'Node.js'];
//   return (
//     <div className="container">
//       {/* Formulaire */}
//       <div className="form">
//         <h2>Indiquez vos coordonnées</h2>
        
//         <div className="input-group">
//           <label>Prénom</label>
//           <input 
//             type="text" 
//             name="prenom" 
//             value={formData.prenom} 
//             onChange={handleInputChange} 
//             placeholder="ex. Alexandra" 
//           />
//         </div>

//         <div className="input-group">
//           <label>Nom</label>
//           <input 
//             type="text" 
//             name="nom" 
//             value={formData.nom} 
//             onChange={handleInputChange} 
//             placeholder="ex. Dupont" 
//           />
//         </div>

//         <div className="input-group">
//           <label>Titre du CV / Intitulé du poste</label>
//           <input 
//             type="text" 
//             name="titre" 
//             value={formData.titre} 
//             onChange={handleInputChange} 
//             placeholder="ex. Vendeuse" 
//           />
//         </div>

//         <div className="input-group">
//           <label>Adresse</label>
//           <input 
//             type="text" 
//             name="adresse" 
//             value={formData.adresse} 
//             onChange={handleInputChange} 
//             placeholder="ex. 24, rue Cadet" 
//           />
//         </div>

//         <div className="input-group">
//           <label>Code postal</label>
//           <input 
//             type="text" 
//             name="postal" 
//             value={formData.postal} 
//             onChange={handleInputChange} 
//             placeholder="ex. 75009" 
//           />
//         </div>

//         <div className="input-group">
//           <label>Ville</label>
//           <input 
//             type="text" 
//             name="ville" 
//             value={formData.ville} 
//             onChange={handleInputChange} 
//             placeholder="ex. Paris" 
//           />
//         </div>

//         <div className="input-group">
//           <label>Téléphone</label>
//           <input 
//             type="text" 
//             name="telephone" 
//             value={formData.telephone} 
//             onChange={handleInputChange} 
//             placeholder="ex. 06 12 34 56 78" 
//           />
//         </div>

//         <div className="input-group">
//           <label>Adresse e-mail</label>
//           <input 
//             type="email" 
//             name="email" 
//             value={formData.email} 
//             onChange={handleInputChange} 
//             placeholder="ex. alexandra.dupont@exemple.fr" 
//           />
//         </div>

//         <div className="input-group">
//           <label>Âge / Date de naissance</label>
//           <input 
//             type="text" 
//             name="age" 
//             value={formData.age} 
//             onChange={handleInputChange} 
//             placeholder="ex. 24 ans" 
//           />
//         </div>

//         <div className="input-group">
//           <label>Permis de conduire / Véhicule</label>
//           <input 
//             type="text" 
//             name="permis" 
//             value={formData.permis} 
//             onChange={handleInputChange} 
//             placeholder="ex. Permis B - Véhicule" 
//           />
//         </div>

//         {/* Champ pour l'upload de l'image */}
//         <div className="input-group">
//           <label>Importer une photo</label>
//           <input type="file" accept="image/*" onChange={handleImageChange} />
//         </div>

//         {/* Bouton pour générer le PDF */}
//         <button onClick={downPDF} className="btn-generate-pdf">Télécharger en PDF</button>
//       </div>

//       {/* Aperçu du CV */}
//       <div className="preview">
//         <h2>Prévisualisation du CV</h2>
//         <div className="cv-preview" >
//           {/* Affichage de l'image */}
//           {formData.image && <img src={formData.image} alt="Aperçu du CV" className="cv-image" />}
//           <h3>{formData.prenom} {formData.nom}</h3>
//           <p>{formData.titre}</p>
//           <p>{formData.adresse}, {formData.ville}, {formData.postal}</p>
//           <p>Téléphone : {formData.telephone}</p>
//           <p>Email : {formData.email}</p>
//           <p>Âge : {formData.age}</p>
//           <p>Permis : {formData.permis}</p>
//         </div>

//         <div className="cv-container" ref={pdfRef}>
//       <header className="cv-header">
//         <h1>{formData.image && <img src={formData.image} alt="Aperçu du CV" className="cv-image" />}
//         {formData.prenom} {formData.nom}</h1>
//         <p>{formData.titre}</p>
//         <hr />
//       </header>

//       <section className="cv-section">
//         <h3>Education</h3>
//         <ul>
          
//         </ul>
//       </section>

//       <section className="cv-section">
//         <h3>Experience</h3>
//         <ul>
          
//         </ul>
//       </section>

//       <section className="cv-section">
//         <h3>Skills</h3>
//         <ul>
//           {skills.map((skill, index) => (
//             <li key={index}>{skill}</li>
//           ))}
//         </ul>
//       </section>

//       <footer className="cv-footer">
        
//       </footer>
//     </div>
//       </div>
//     </div>
//   );
// }

// export default CVForm;
