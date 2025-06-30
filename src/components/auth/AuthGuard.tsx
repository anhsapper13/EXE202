"use client";

import { useAppSelector, useAppDispatch } from "@/store/store";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getProfile, clearUser } from "@/store/slices/userSlice";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, allowedRoles }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const { isAuthenticated, currentUser, isLoading } = useAppSelector(
    (state) => state.user
  );
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const isPublicRoute = [
      "/login",
      "/register",
      "/unauthorized",
      "/user/home",
      "/user/contact-us",
      "/user/about-us",
      "/user/pet-service",
      "/user/pet-service/[id]",
      "/booking",
      "/booking/[id]",
      "/forum",
      "/booking/success",
      "/booking/failure",
      "/products",
      "/products/[id]",
    ].some((route) => pathname.startsWith(route));

    if (isPublicRoute) {
      setIsAuthorized(true);
      return;
    }

    const token = localStorage.getItem("accessToken");

    if (!isAuthenticated && token) {
      dispatch(getProfile())
        .unwrap()
        .then(() => setIsAuthorized(true))
        .catch(() => {
          dispatch(clearUser());
          router.push("/login");
        });
      return;
    }

    if (!isAuthenticated && !token) {
      router.push("/login");
      return;
    }

    if (allowedRoles && currentUser) {
      console.log("Current User Role:", currentUser.role.toUpperCase());
      console.log("Allowed Roles:", allowedRoles);
      
      if (!allowedRoles.includes(currentUser.role?.toUpperCase())) {
        router.push("/unauthorized");
        return;
      }
    }

    setIsAuthorized(true);
  }, [isAuthenticated, pathname, currentUser, allowedRoles, router, dispatch]);

  if (!isAuthorized || isLoading) return null;

  return <>{children}</>;
};

export default AuthGuard;
