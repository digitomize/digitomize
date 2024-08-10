import { Button, DialogActions, DialogContent } from "@mui/material";
import { CreateUserForm } from "./CreateUser.helper";
import { createNewUser } from "@core/api/user.api";
import { toast } from "react-toastify";
import { useState } from "react";
import { useUserAuth } from "@context/UserAuthContext";
import { uniqueToast } from "../../../../core/utils/unique-toast";

export default function CreateUser({ handleClose }) {
  const [pending, setPending] = useState(false);
  const { signUp } = useUserAuth();
  const toastId = uniqueToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, username, email, password } = event.target;
    const payload = {
      name: name.value,
      username: username.value,
      email: email.value,
      password: password.value,
    };

    try {
      // const newUser = await signUp(payload.email, payload.password, payload.username, payload.name)
      // const token = newUser.token;
      // console.log(token);
      // if (token) {
      setPending(true);
      createNewUser(payload)
        .then((response) => {
          handleClose();
          toast.success(response.data.message,{
            toastId
          });
        })
        .catch((error) => {
          // console.log(error);
          toast.success(error.response.data.message,{
            toastId
          });
        })
        .finally(() => {
          setPending(false);
        });
      // }
    } catch (err) {
      // console.log(err);
      toast.error(err.code,{
        toastId
      });
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
          {CreateUserForm.map((item) => {
            return (
              <div key={item.name} className="relative mb-3" data-te-input-wrapper-init>
                <label>{item.label}</label>
                <input
                  required
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
