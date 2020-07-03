import React, { useEffect, useState, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import Logo from "./assets/2050058.png";
import Image from "./assets/info.png";
import axios from "axios";
import "./styles.scss";

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <InfoTable />
    </Suspense>
  );
};

const InfoTable = () => {
  const [state, setState] = useState({ data: [], hasError: false });
  const { t, i18n } = useTranslation();
  const handleChange = e => {
    i18n.changeLanguage(e.target.value);
  };
  useEffect(() => {
    let subscribed = true;
    const baseUrl =
      "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php";
    const headers = {
      "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
      "x-rapidapi-key": "cb947b6b76msh4af8d41eba1e7c1p10758djsnf74806413b8d"
    };
    const getData = async () => {
      try {
        let res = await axios.get(baseUrl, { headers });
        let ress = res.data.countries_stat.filter(
          countries => countries.country_name === "Morocco"
        );

        if(subscribed) setState({ ...state, data: [...state.data, ress[0]] });
      } catch (error) {
        if(subscribed) setState({ ...state, hasError: true });
      }
    };
    if (!!state.data.length === false && state.hasError === false) {
      getData();
    }
    return () => {
      subscribed = false
    }
  }, [state]);

  return (
    <React.Fragment>
      <Helmet>
        <title>Corona Info | Maroc</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Corona Info | Maroc" />
        <meta
          property="og:description"
          content={`infectés ${!!state.data.length &&
            state.data[0].cases} | nouveaux cas confirmés ${!!state.data
            .length && state.data[0].new_cases}`}
        />
        <meta property="og:image" content={`${Image}`} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="fr_FR" />
      </Helmet>
      <div className="App">
        <nav className="navBar">
          <div className="navBar_wrapper container">
            <div className="Logo">
              <img src={Logo} alt="logo" />
              <span>Corona Info Maroc</span>
            </div>
            <form onChange={handleChange}>
              <select className="navBar_lang">
                <option value="fr" defaultValue>
                  francais
                </option>
                <option value="ar">العربية</option>
              </select>
            </form>
          </div>
        </nav>
        <div className="App-main container">
          <div className="block danger">
            {t("infected")}
            <span> {!!state.data.length && state.data[0].cases}</span>
          </div>
          <div className="block danger">
            {t("deaths")}
            <span> {!!state.data.length && state.data[0].deaths}</span>
          </div>
          <div className="block warning">
            {t("new_deaths")}
            <span> {!!state.data.length && state.data[0].new_deaths}</span>
          </div>
          <div className="block warning">
            {t("newly_confirmed")}
            <span> {!!state.data.length && state.data[0].new_cases}</span>
          </div>
          <div className="block safe">
            {t("recovred")}
            <span> {!!state.data.length && state.data[0].total_recovered}</span>
          </div>
          <div className="share_buttons">
            <ShareButtons />
          </div>
        </div>
        <div className="hashtags">#stay_at_home</div>
        <div className="hashtags">بقا_فداركم#</div>
      </div>
    </React.Fragment>
  );
};

const ShareButtons = () => {
  return (
    <React.Fragment>
      <a
        className="resp-sharing-button__link"
        href={`https://facebook.com/sharer/sharer.php?u=https://covid-19-morocco.netlify.com/`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
      >
        <div className="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--medium">
          <div
            aria-hidden="true"
            className="resp-sharing-button__icon resp-sharing-button__icon--solid"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
            </svg>
          </div>
          Facebook
        </div>
      </a>
      <a
        className="resp-sharing-button__link"
        href={`https://twitter.com/intent/tweet/?url=url=https://covid-19-morocco.netlify.com/`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter"
      >
        <div className="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--medium">
          <div
            aria-hidden="true"
            className="resp-sharing-button__icon resp-sharing-button__icon--solid"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
            </svg>
          </div>
          Twitter
        </div>
      </a>
      <a
        className="resp-sharing-button__link"
        href={`https://www.linkedin.com/shareArticle?mini=true&url=https://covid-19-morocco.netlify.com/&title=Corona-Info-Maroc`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <div className="resp-sharing-button resp-sharing-button--linkedin resp-sharing-button--medium">
          <div
            aria-hidden="true"
            className="resp-sharing-button__icon resp-sharing-button__icon--solid"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.5 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5V10s1.6-1.5 4-1.5c3 0 5 2.2 5 6.3v6.7h-5v-7c0-1-1-2-2-2z" />
            </svg>
          </div>
          LinkedIn
        </div>
      </a>
    </React.Fragment>
  );
};

const Loader = () => (
  <div className="Loader">
    <div>Patientez, s'il vous plaît</div>
  </div>
);

export default App;
