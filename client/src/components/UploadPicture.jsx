import Dialog from "@mui/material/Dialog";

function UploadPicture({
  isPictureModalOpen,
  setIsPictureModalOpen,
  selectedFile,
  setSelectedFile,
  setSendReqUserImage,
}) {
  return (
    <>
      <Dialog
        open={isPictureModalOpen}
        onClose={() => setIsPictureModalOpen(false)}
      >
        <div className=" sm:w-96 bg-dashboardColor pt-5 px-5 flex flex-col items-center">
          <div className="w-full h-auto rounded-sm">
            {selectedFile && (
              <img
                src={URL.createObjectURL(selectedFile)}
                className="w-full h-auto rounded-lg"
                alt=""
              />
            )}
          </div>
          <div className="min-w-full flex flex-row justify-between px-8 p-5">
            <div
              className="btn btn-ghost hover:text-white btn-sm"
              onClick={() => {
                setIsPictureModalOpen(false);
              }}
            >
              Cancel
            </div>
            <div
              className="btn btn-outline border-jet hover:bg-jet hover:text-white btn-sm"
              onClick={() => {
                setSendReqUserImage(true);
                setIsPictureModalOpen(false);
              }}
            >
              Save
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default UploadPicture;
