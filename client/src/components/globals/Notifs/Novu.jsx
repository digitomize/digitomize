import {
    NovuProvider,
    PopoverNotificationCenter,
    NotificationBell,
} from "@novu/notification-center";

function Novu(user) {
    console.log("NVOIIIIIUUUUU");
    user = user.user;
    console.log(user);
    return (
        <NovuProvider
            subscriberId={user.uid}
            applicationIdentifier={"-H0R8Ne2fWHf"}
        >
            <PopoverNotificationCenter colorScheme="dark">
                {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
            </PopoverNotificationCenter>
        </NovuProvider>
    );
}

export default Novu;
