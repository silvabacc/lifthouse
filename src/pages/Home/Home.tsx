import React from "react";
import WorkoutsCard from "./components/WorkoutsCard/WorkoutsCard";
import BigZImage from "./components/WorkoutsCard/images/big_z.png";
import ArnoldImage from "./components/WorkoutsCard/images/arnold.png";
import EddieImage from "./components/WorkoutsCard/images/eddie_hall.png";
import TomPlatZImage from "./components/WorkoutsCard/images/tom_platz.png";
import styles from "./Home.module.scss";

const Home: React.FC = () => {
  return (
    <div className={styles.Home}>
      <h1>Time to Grind 💪</h1>
      <h2>Workouts 🏋</h2>
      <div className={styles.Home__Card_Container}>
        <WorkoutsCard image={BigZImage} title="Upper Intensity" />
        <WorkoutsCard image={ArnoldImage} title="Upper Volume" />
        <WorkoutsCard image={EddieImage} title="Lower Intensity" />
        <WorkoutsCard image={TomPlatZImage} title="Lower Volume" />
      </div>
    </div>
  );
};

export default Home;
