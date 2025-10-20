import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function authUser(){
    const router = useRouter();
    const user = useSelector((state: any) => state.user.user);

    useEffect(() => {
    if (!user) {
        router.replace("/login");
    }
    }, [user, router]);
}