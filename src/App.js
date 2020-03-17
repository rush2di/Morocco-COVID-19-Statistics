import React, { useEffect, useState, Suspense } from "react";
import { useTranslation } from "react-i18next";
import logo from "./logo/2050058.png";
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
        setState({ ...state, data: [...state.data, ress[0]] });
      } catch (error) {
        setState({ ...state, hasError: true });
      }
    };
    if (!!state.data.length === false && state.hasError === false) {
      getData();
    }
  }, [state]);

  return (
    <div className="App">
      <nav className="navBar">
        <div className="navBar_wrapper container">
          <div className="Logo">
            <img src={logo} alt="logo" />
            <span>Info Corona Maroc</span>
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
      </div>
      <div className="hashtags">#stay_at_home</div>
      <div className="hashtags">بقا_فداركم#</div>
    </div>
  );
};

const Loader = () => (
  <div className="Loader">
    <div>Patientez, s'il vous plaît</div>
  </div>
);

export default App;