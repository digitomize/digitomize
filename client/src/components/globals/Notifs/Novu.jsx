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
            stores={[
                {
                    storeId: "default_store",
                },
                {
                    storeId: "Contest Alerts",
                    query: { feedIdentifier: "Contest Alerts" },
                },
                {
                    storeId: "System",
                    query: { feedIdentifier: "System" }
                },
            ]}
            subscriberId={user.uid}
            applicationIdentifier={import.meta.env.VITE_REACT_APP_NOVU_IDENTIFIER}
        >
            <PopoverNotificationCenter colorScheme="dark" position="bottom"
                tabs={[
                    { name: "All", storeId: "default_store" },
                    { name: "Contest Alerts", storeId: "Contest Alerts" },
                    { name: "System", storeId: "System" }
                ]}
            >
                {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
            </PopoverNotificationCenter>
        </NovuProvider>
    );
}

export default Novu;
