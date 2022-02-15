import React, {useEffect} from "react";
import get from 'lodash/get';

export default function  index(props){

    const {currentUser} = props;
    const currentUser_uid = get(currentUser, "uid", false);
    const email = get(currentUser, "email", "");
    const user_type = get(currentUser, "user_type", "FREELA");

    useEffect(() => {
        window.OneSignal = window.OneSignal || [];
        OneSignal.push(function () {

            OneSignal.init({
                appId: "667e7a91-fbe8-4114-8fd0-0854d7060678",
                notifyButton: {
                    enable: true,
                },
                allowLocalhostAsSecureOrigin: true,
                autoResubscribe:true,
            });
            OneSignal.setExternalUserId(currentUser_uid);
        }
        );

        return () => {
            window.OneSignal = undefined;
        };
    }, []); // <-- run this effect once on mount

    return(<></>);
}
