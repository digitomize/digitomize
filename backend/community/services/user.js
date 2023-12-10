import User from "../../users/models/User.js";

export const userAddCommunity = async (communityId, userId) => {
  try {
    const user = await User.findOne({ uid: userId });
    const communityList = [...user.community];
    communityList.push({ communityId });
    await User.updateOne(
      { uid: userId },
      {
        $set: {
          community: communityList,
        },
        $currentDate: { lastUpdated: true },
      }
    );
  } catch (error) {
    throw new Error("Something Went Wrong!");
  }
};

export const userRemoveCommunity = async (communityId, userId) => {
  try {
    const user = await User.findOne({ uid: userId });
    const communityList = user.community.filter(
      (item) => item.communityId !== communityId
    );
    await User.updateOne(
      { uid: userId },
      {
        $set: {
          community: communityList,
        },
        $currentDate: { lastUpdated: true },
      }
    );
  } catch (error) {
    throw new Error("Something Went Wrong!");
  }
};
