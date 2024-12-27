import { v2 as cloudinary } from "cloudinary";

// generating signature to sign the image before uploading
async function generateSignature(req, res) {
  try {
    const public_id = req.decodedToken.uid;
    // Get the existing user profile

    // get the timestamp in seconds
    const timestamp = Math.round(new Date().getTime() / 1000);
    const options = {
      folder: "users",
      timestamp,
      public_id,
    };
    const signature = cloudinary.utils.api_sign_request(
      options,
      process.env.CLOUDINARY_API_SECRET,
    );
    res.status(200).json({
      message: "Signature generated successfully",
      signature,
      timestamp,
      public_id,
    });
  } catch (err) {
    console.log("Failed to generate signature");
    console.log(err);
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
}

export { generateSignature };
