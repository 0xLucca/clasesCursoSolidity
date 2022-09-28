import { Input, Info } from "@web3uikit/core";
import styles from "../styles/Home.module.css";

const Number = () => {
  return (
    <div className={styles.container}>
      <div class="flex flex-col justify-center items-center">
        <Info information="1000 Mage" topic="Your Balance" />
        <Input
          label="Label text"
          name="Test text Input"
          onBlur={function noRefCheck() {}}
          onChange={function noRefCheck() {}}
          value={50}
        />
      </div>
    </div>
  );
};

export default Number;
