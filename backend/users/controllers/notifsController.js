import { Novu, PushProviderIdEnum } from "@novu/node";
import User from "../models/User.js";

const novu = new Novu(process.env.NOVU_API_KEY);

export const updateDeviceID = async (req, res) => {
  try {
    const userId = req.decodedToken.uid;
    const user = await User.findOne({ uid: userId });
    const { name, email } = user;

    const { deviceID } = req.body;
    // Create a subscriber
    await novu.subscribers.identify(userId, {
      email,
      firstName: name,
    });

    // Set FCM device token for the subscriber
    await novu.subscribers.setCredentials(userId, PushProviderIdEnum.FCM, {
      deviceTokens: deviceID,
    });

    return res.status(200).json(req.body);
  } catch (error) {
    console.error(error);
  }
};
