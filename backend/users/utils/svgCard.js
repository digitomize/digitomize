import { codechefLogo } from "./codechefLogo.js";
import { codeforcesLogo } from "./codeforcesLogo.js";
import { leetcodeLogo } from "./leetcodeLogo.js";
import { svgBottom, svgData, svgWrapper } from "./svgUtils.js";

const svgCard = (data, width, height, x, logoType) => {
  let logo = ``;
  switch (logoType) {
    case "leetcode":
      logo = leetcodeLogo();
      break;
    case "codeforces":
      logo = codeforcesLogo();
      break;
    case "codechef":
      logo = codechefLogo();
      break;
    default:
      console.error(`Unsupported logoType: ${logoType}`);
      break;
  }
  return `
    ${svgWrapper(width, height, x)}
        ${logo}
        ${svgData(data)}
        ${svgBottom()}
    </svg>
    `;
};

export { svgCard };
