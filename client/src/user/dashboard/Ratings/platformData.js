import {
  atcoder,
  leetcode,
  codechef,
  codeforces,
  geeksforgeeks,
  codingninjas,
} from "../../../components/AllAssets";

const platforms = [
  {
    title: "Integrate with Leetcode",
    subTitle: "Showcase your achievements",
    content:
      "Connect your Leetcode profile to showcase your problem-solving achievements!",
    icon: leetcode,
    url: "leetcode.com/",
    name: "leetcode",
    note: "Note: Please enter username only",
    active: true,
  },
  {
    title: "Integrate with Codechef",
    subTitle: "Display competition rankings",
    content:
      "Link your Codechef profile to display your coding competition rankings!",
    icon: codechef,
    url: "codechef.com/users/",
    name: "codechef",
    note: "Note: Please enter username only",
    active: true,
  },
  {
    title: "Integrate with Codeforces",
    subTitle: "Showcase contest history",
    content:
      "Connect your Codeforces account to showcase your algorithmic contest history!",
    icon: codeforces,
    url: "codeforces.com/profile/",
    name: "codeforces",
    note: "Note: Please enter username only",
    active: true,
  },
  {
    title: "Integrate with Atcoder",
    subTitle: "Track programming progress",
    content:
      "Link your Atcoder account to display your competitive programming progress!",
    icon: atcoder,
    url: "atcoder.jp/users/",
    name: "atcoder",
    note: "Note: Please enter username only",
    active: false,
  },
  {
    title: "Integrate with GeeksforGeeks",
    subTitle: "Compile coding article bookmarks",
    content:
      "Merge your GeeksforGeeks account to compile your coding article bookmarks!",
    icon: geeksforgeeks,
    url: "auth.geeksforgeeks.org/user/",
    name: "geeksforgeeks",
    note: "Note: Please enter username only",
    active: false,
  },
  {
    title: "Integrate with Coding Ninjas",
    subTitle: "Track course progress",
    content:
      "Sync your Coding Ninjas profile to track your coding course progress!",
    icon: codingninjas,
    url: "codingninjas.com/studio/profile/",
    name: "codingninjas",
    note: "Note: Please enter username only",
    active: false,
  },
];

export default platforms;
