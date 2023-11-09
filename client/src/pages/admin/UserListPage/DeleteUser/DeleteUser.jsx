import { Button, DialogActions, DialogContent } from "@mui/material";
import { DeleteUserForm } from "./DeleteUser.helper";
import { deleteUser } from "../../../../core/api/user.api";
import { toast } from "react-toastify";
import { useState } from "react";
import { useUserAuth } from "../../../../context/UserAuthContext"

export default function DeleteUser({ user, handleClose }) {
  console.log("KEYYYY:", user);
  const [pending, setPending] = useState(false);
  const { signUp } = useUserAuth()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, username, email, uid } = event.target;
    const payload = {
      name: name.value,
      username: username.value,
      email: email.value,
      uid: uid.value,
    };

    try {
        setPending(true);
        deleteUser(payload)
          .then((response) => {
            handleClose();
            toast.success(response.data.message);
          })
          .catch((error) => {
            console.log(error);
            toast.success(error.response.data.message);
          })
          .finally(() => {
            setPending(false);
          });
      // }
    } catch (err) {
      console.log(err);
      toast.error(err.code);
    }

  };





  return (
    <>
      <form onSubmit={handleSubmit}>
        <DialogContent
          sx={{
            minWidth: "600px",
          }}
        >
          {DeleteUserForm.map((item) => {
            return (
              <div class="relative mb-3" data-te-input-wrapper-init>
                <label>{item.label}</label>
                <input required disabled
                  class="bg-gray-300 peer block min-h-[auto] w-full rounded  px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear"
                  {...item}
                  value={user[item.label]}
                />
              </div>
            );
          })}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="submit" disabled={pending}>
            Delete
          </Button>
        </DialogActions>
      </form>
    </>
  );
}
