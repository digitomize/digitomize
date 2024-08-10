import { Button, DialogActions, DialogContent } from "@mui/material";
import { CreateCommunityForm } from "./CreateCommunity.helper";
import { createCommunity } from "@core/api/community.api";
import { toast } from "react-toastify";
import { useState } from "react";
import { uniqueToast } from "../../../../core/utils/unique-toast";

export default function CreateCommunity({ handleClose }) {
  const [pending, setPending] = useState(false);
  const toastId = uniqueToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, description, vanity, cmAdmin } = event.target;
    const payload = {
      name: name.value,
      description: description.value,
      vanity: vanity.value,
      cmAdmin: cmAdmin.value,
    };

    setPending(true);
    createCommunity(payload)
      .then((response) => {
        handleClose();
        toast.success(response.data.message,{
          toastId
        });
      })
      .catch((error) => {
        toast.success(error.response.data.message,{
          toastId
        });
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <DialogContent
          sx={{
            minWidth: "600px",
          }}
        >
          {CreateCommunityForm.map((item) => {
            return (
              <div key={item.name} className="relative mb-3" data-te-input-wrapper-init>
                <label>{item.label}</label>
                <input
                  className="peer block min-h-[auto] w-full rounded  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear"
                  {...item}
                />
              </div>
            );
          })}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="submit" disabled={pending}>
            Create
          </Button>
        </DialogActions>
      </form>
    </>
  );
}
