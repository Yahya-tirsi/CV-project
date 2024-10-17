import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
// import html2canvas from 'html2canvas';

function Cvdeux() {
  const pdfRef = useRef();

  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    titre: "",
    adresse: "",
    postal: "",
    ville: "",
    telephone: "",
    email: "",
    age: "",
    permis: "",
    image: "",
    bac: "",
    licence: "",
    master: "",
    duration: "",
    duration2: "",
    position: "",
    position2: "",
    nomSociter: "",
    nomSociter2: "",
    autreRole: "",
    autreRole2: "",
  });

  const [color, setColor] = useState("#ffffff");

  const changeLeftSidebar = (event) => {
    setColor(event.target.value);
  };
  const [rightcolor, setrightcolor] = useState("#ffffff");

  const changerightSidebar = (event) => {
    setrightcolor(event.target.value);
  };
  const [titlecolor, settitlecolor] = useState("black");

  const changetitleSidebar = (event) => {
    settitlecolor(event.target.value);
  };

  // Fonction pour gérer la mise à jour des champs de texte
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fonction pour gérer l'upload d'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const downPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = pdfWidth - imgWidth * ratio;
      const imgY = 0;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(`${formData.prenom}-${formData.nom}-CV.pdf`);
    });
  };

  //   Add a new item in the section skils and position
  const [items, setItems] = useState([]);
  const [autrerole, setAutrerole] = useState([]);
  const [autrerole2, setAutrerole2] = useState([]);

  const addItem = () => {
    const newItem = `${formData.postal}`;
    setItems([...items, newItem]);
  };

  const addAutreRole = () => {
    const newItem = `${formData.autreRole}`;
    setAutrerole([...autrerole, newItem]);
  };
  const addAutreRole2 = () => {
    const newItem = `${formData.autreRole2}`;
    setAutrerole2([...autrerole2, newItem]);
  };

  //   Remove item when i click in it
  const removeItem = (index) => {
    const newItems = items.filter((item, i) => i !== index);
    setItems(newItems);
  };
  //   Remove position en l'entroprise when i click in it
  const removePosition = (index) => {
    const newItems = autrerole.filter((item, i) => i !== index);
    setAutrerole(newItems);
  };
  const removePosition2 = (index) => {
    const newItems = autrerole2.filter((item, i) => i !== index);
    setAutrerole2(newItems);
  };

  const [isVisiblelicence, setIsVisiblelicence] = useState(false);
  const [isVisiblemast, setIsVisiblemast] = useState(false);
  const [isVisiposition, setIsVisiposition] = useState(false);
//   const [visible, setVisible] = useState(false);

  //   Add Licence champ
  const addLicnce = () => {
    setIsVisiblelicence(!isVisiblelicence);
  };
//   //   Add Licence champ
//   const addDiv = () => {
//     setVisible(!visible);
//   };
  //   Add Master champ
  const addMaster = () => {
    setIsVisiblemast(!isVisiblemast);
  };

  //   Add position dans l'entroprise champ
  const addPosition = () => {
    setIsVisiposition(!isVisiposition);
  };

  return (
    <div>
      {/* Formulaire */}
      <div className="preview">
        <div className="form">
          <h2>Indiquez vos coordonnées</h2>

          {/* Personal Information */}
          <fieldset className="styled-fieldset">
            <legend class="styled-legend">Personal Information</legend>
            <div className="infoPremier">
              <div className="imgCont">
                <div className="input-group">
                  <label>Importer une photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div>
                <div className="input-group">
                  <label>Prénom</label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    placeholder="ex. Prenom"
                  />
                </div>

                <div className="input-group">
                  <label>Nom</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    placeholder="ex. Nom"
                  />
                </div>
              </div>

              <div>
                <div className="input-group">
                  <label>Titre du CV</label>
                  <input
                    type="text"
                    name="titre"
                    value={formData.titre}
                    onChange={handleInputChange}
                    placeholder="ex. Vendeuse"
                  />
                </div>

                <div className="input-group">
                  <label>Âge / Date de naissance</label>
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="ex. 24/18/2000 ou 24"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="input-group">
                <label>Téléphone</label>
                <input
                  type="text"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  placeholder="ex. 06 12 34 56 78"
                />
              </div>

              <div className="input-group">
                <label>Adresse e-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="ex. contact@exemple.com"
                />
              </div>

              <div className="input-group">
                <label>Adresse</label>
                <input
                  type="text"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleInputChange}
                  placeholder="ex. 24, rue CASA"
                />
              </div>
            </div>
          </fieldset>

          {/* Skills */}
          <fieldset className="styled-fieldset">
            <legend class="styled-legend">SKILS</legend>
            <div className="input-group">
              <label>Taper votre skils</label>
              <input
                type="text"
                name="postal"
                value={formData.postal}
                onChange={handleInputChange}
                placeholder="ex. HTML/CSS..."
              />
            </div>
            <button className="addSkils" onClick={addItem}>
              Ajouter skils
            </button>
          </fieldset>

          {/* Education */}
          <fieldset className="styled-fieldset">
            <legend class="styled-legend">Education</legend>
            <div className="input-group">
              <label>
                {" "}
                <b>Bacalaureat</b> : Etablissement / Option / Anne detude
              </label>
              <input
                type="text"
                name="bac"
                value={formData.bac}
                onChange={handleInputChange}
                placeholder="ex. University of XYZ, 2014-2018"
              />
            </div>

            <p>Ajouter des informations supplémentaires (optionnel)</p>
            {isVisiblelicence && (
              <div className="input-group">
                <label>
                  <b>Licence :</b> Etablissement / Option / Anne detude
                </label>
                <input
                  type="text"
                  name="licence"
                  value={formData.licence}
                  onChange={handleInputChange}
                  placeholder="ex. University of XYZ, 2014-2018"
                />
              </div>
            )}

            <button className="btnAddEducation" onClick={addLicnce}>
              {isVisiblelicence ? "Hide Licence" : "Show Licence"}
            </button>

            {isVisiblemast && (
              <div className="input-group">
                <label>
                  <b>Master :</b> Etablissement / Option / Anne detude
                </label>
                <input
                  type="text"
                  name="master"
                  value={formData.master}
                  onChange={handleInputChange}
                  placeholder="ex. University of XYZ, 2014-2018"
                />
              </div>
            )}
            <button className="btnAddEducation" onClick={addMaster}>
              {isVisiblemast ? "Hide Master" : "Show Master"}
            </button>
          </fieldset>

          {/* Work Experience */}
          <fieldset className="styled-fieldset">
            <legend class="styled-legend">Work Experience</legend>
            <div className="input-group">
              <label>Nom de l'entreprise</label>
              <input
                type="text"
                name="nomSociter"
                value={formData.nomSociter}
                onChange={handleInputChange}
                placeholder="ex. Google"
              />
            </div>
            <div className="input-group">
              <label>Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                placeholder="ex. Comercial"
              />
            </div>
            <div className="input-group">
              <label>Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="ex. 2022/2024"
              />
            </div>

            <div className="rolecv2">
              <div className="input-group">
                <label>Les rôles que vous avez joués dans l'entreprise</label>
                <input
                  type="text"
                  name="autreRole"
                  value={formData.autreRole}
                  onChange={handleInputChange}
                  placeholder="ex. Comerciale dans un bereau..."
                />
              </div>
              <button onClick={addAutreRole}>Ajouter le rôle</button>
            </div>

            <p>Ajouter des informations supplémentaires (optionnel) </p>

            {isVisiposition && (
              <div>
                <div className="input-group">
                  <label>Nom de l'entreprise</label>
                  <input
                    type="text"
                    name="nomSociter2"
                    value={formData.nomSociter2}
                    onChange={handleInputChange}
                    placeholder="ex. Google"
                  />
                </div>
                <div className="input-group">
                  <label>Position</label>
                  <input
                    type="text"
                    name="position2"
                    value={formData.position2}
                    onChange={handleInputChange}
                    placeholder="ex. Comercial"
                  />
                </div>
                <div className="input-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    name="duration2"
                    value={formData.duration2}
                    onChange={handleInputChange}
                    placeholder="ex. 2022/2024"
                  />
                </div>

                <div className="rolecv2">
                  <div className="input-group">
                    <label>
                      Les rôles que vous avez joués dans l'entreprise
                    </label>
                    <input
                      type="text"
                      name="autreRole2"
                      value={formData.autreRole2}
                      onChange={handleInputChange}
                      placeholder="ex. Comerciale dans un bereau..."
                    />
                  </div>
                  <button onClick={addAutreRole2}>Ajouter le rôle</button>
                </div>
              </div>
            )}

            <button className="btnAddExperience" onClick={addPosition}>
              {isVisiposition
                ? "Hide the other work experience"
                : "Show the other work experience"}
            </button>
          </fieldset>

          <fieldset className="styled-fieldset">
            <legend class="styled-legend">Customize Your CV</legend>
            <div className="con">
              <label>Change Left Sidebar Color</label>
              <input type="color" onChange={changeLeftSidebar} />
              <label>Change Right Sidebar Color</label>
              <input type="color" onChange={changerightSidebar} />
              <label>Change the Title Color</label>
              <input type="color" onChange={changetitleSidebar} />
            </div>
          </fieldset>
        </div>

        {/* Aperçu du CV */}

        <div className="Conten">
          <h2>Prévisualisation du CV</h2>
          <div className="containercv2" ref={pdfRef}>
            <div className="headercv2">
              <div className="img-area">
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Aperçu du CV"
                    className="cv-image"
                  />
                )}
              </div>
              <h1>
                {formData.prenom} {formData.nom}{" "}
              </h1>
              <h3>{formData.titre}</h3>
            </div>

            <div className="main">
              <div style={{ backgroundColor: color }} className="leftcv2">
                <h2 style={{ backgroundColor: titlecolor }}>
                  Personal Information
                </h2>
                <p>
                  <strong>Name:</strong> {formData.nom} {formData.prenom}
                </p>
                <p>
                  <strong>Age:</strong> {formData.age}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {formData.telephone}
                </p>
                <p>
                  <strong>Adresse:</strong> {formData.adresse}
                </p>

                <h2 style={{ backgroundColor: titlecolor }}>Skills</h2>
                <ul>
                  {items.map((item, index) => (
                    <li
                      style={{ cursor: "pointer" }}
                      title="Click if you want to remove"
                      onClick={() => removeItem(index)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <h2 style={{ backgroundColor: titlecolor }}>Education</h2>
                <h3>Bacalauriat :</h3>
                <p>{formData.bac}</p>
                {isVisiblelicence && (
                  <div>
                    <h3>Licence :</h3>
                    <p>{formData.licence}</p>
                  </div>
                )}

                {isVisiblemast && (
                  <div>
                    <h3>Master :</h3>
                    <p>{formData.master}</p>
                  </div>
                )}
              </div>

              <div style={{ backgroundColor: rightcolor }} className="rightcv2">
                <h2 style={{ backgroundColor: titlecolor }}>Work Experience</h2>
                <h4>Entreprise : {formData.nomSociter}</h4>
                <p>
                  <strong>Position:</strong> {formData.position}
                </p>
                <p>
                  <strong>Duration:</strong> {formData.duration}
                </p>
                <ul>
                  {autrerole.map((item, index) => (
                    <li
                      style={{ cursor: "pointer" }}
                      title="Click if you want to remove"
                      onClick={() => removePosition(index)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <br />

                {isVisiposition && (
                  <div>
                    <h4>Entreprise : {formData.nomSociter2}</h4>
                    <p>
                      <strong>Position:</strong> {formData.position2}
                    </p>
                    <p>
                      <strong>Duration:</strong> {formData.duration2}
                    </p>
                    <ul>
                      {autrerole2.map((item, index) => (
                        <li
                          style={{ cursor: "pointer" }}
                          title="Click if you want to remove"
                          onClick={() => removePosition2(index)}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Bouton pour générer le PDF */}
        <button onClick={downPDF} className="btn-generate-pdf">
          Télécharger votre CV
        </button>


      </div>
    </div>
  );
}

export default Cvdeux;
