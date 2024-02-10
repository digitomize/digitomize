import { useUserAuth } from "../../../context/UserAuthContext";
function BasicInfo() {
    const { user } = useUserAuth();

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:space-x-20 space-y-8 sm:space-y-0 my-8">
                <div class="flex-1 mt-8">
                    <h3 class="text-base font-semibold text-gray-200">Basic account information</h3>
                    <p class="mt-3 font-light text-sm text-gray-500">We'll ask you to click a magic link in your email everytime you sign in.</p>
                    <p class="mt-3 font-light text-sm text-gray-500">You can configure your profile picture here or at <a target="_blank" class="underline" href="https://en.gravatar.com/">Gravatar</a>.</p>
                </div>

                <div className="flex-2 rounded-lg shadow bg-dashboardColor border border-jet">
                    <div className="px-6 py-8 border-b border-jet">
                        <div className="flex flex-col sm:flex-row sm:space-x-5 items-center">

                            <div className="flex-0 px-4 flex flex-col justify-center h-28">
                                <div className="relative">
                                    <img src={user.photoURL} alt="profile" className="w-16 rounded-full" />
                                <label class="ml-1 mt-5 text-xs font-medium text-secondary text-center">Upload</label>
                                </div>
                            </div>


                            <div class="flex-1 w-full">
                                <label class="ml-1 mt-5 text-xs font-medium text-secondary" for="user_first_name">Display Name</label>
                                <input style={{ backgroundColor: 'RGB(17, 19, 18)' }} placeholder="Bill" class="border border-jet rounded px-3 py-[10px] w-full mt-2 text-sm" required="required" type="text" value="Pranshu" />
                            </div>

                        </div>

                    </div>
                    <div class="px-6 py-8">
                        <div class="sm:w-9/12">
                            <label class="ml-1 mt-5 text-xs font-medium text-secondary" for="user_email">E-mail</label>
                            <input disabled style={{ backgroundColor: 'RGB(17, 19, 18)' }} placeholder="bill.gates@example.com" autocomplete="email" required="required" value="pranshgupta54@gmail.com" class="border border-jet rounded px-3 py-[10px] w-full mt-2 text-sm" type="email" />
                        </div>
                        <div class="mt-5">
                            <div class="sm:w-9/12">
                                <div class="mt-5">
                                    <label for="phone-numbers-multiplying-input" class="ml-1 text-xs font-medium text-secondary">Phone</label>
                                    <input style={{ backgroundColor: 'RGB(17, 19, 18)' }} type="text" placeholder="+32 460 23 47 50" name="phone_numbers[]" class="border border-jet rounded px-3 py-[10px] w-full mt-2 text-sm" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default BasicInfo;