import { Forest } from "./Forest.js";
import { loadJSON } from "@ud-viz/utils_browser";
import { ForestView } from "./ForestView.js";

const start = () => {
  loadJSON("./config.json").then((config) => {
    console.log(config);

    const myForest = new Forest(
      config.dimGrid.h,
      config.dimGrid.l,
      config.probProp,
      config.positionsOnFire
    );

    const viewForest = new ForestView(myForest, 100);
    document.body.appendChild(viewForest.canvasElement);

    const autoStep = document.createElement("button");
    autoStep.innerText = "Auto Step";
    document.body.appendChild(autoStep);

    const buttonNextStep = document.createElement("button");
    buttonNextStep.innerText = "Next Step";
    document.body.appendChild(buttonNextStep);

    const propagationFinished = document.createElement("p");
    propagationFinished.innerText = "FINISHED";
    propagationFinished.hidden = true;
    document.body.appendChild(propagationFinished);

    const nextStepCB = () => {
      myForest.nextStep();
      viewForest.generateCanvas();
      if (!myForest.getCellsOnFire().length) {
        buttonNextStep.onclick = null;
        buttonNextStep.hidden = true;
        autoStep.hidden = true;
        clearInterval(interval);
        propagationFinished.dispatchEvent(new Event("propagation_finished"));
      }
    };

    const interval = () => {
      setInterval(nextStepCB, 1000);
    };

    autoStep.onclick = interval;
    buttonNextStep.onclick = nextStepCB;

    propagationFinished.addEventListener("propagation_finished", () => {
      propagationFinished.hidden = false;
    });
  });
};
start();
