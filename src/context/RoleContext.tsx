import { createContext, useContext, useState, type ReactNode } from "react";

export type Role = "user" | "admin" | "super-admin" | null;

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: Exclude<Role, null>;
  communityType: "buddhism" | "judaism";
  center?: string | null;
};

interface RoleContextType {
  role: Role;
  user: AuthUser | null;
  setRole: (role: Role) => void;
  setSession: (token: string, user: AuthUser) => void;
  logout: () => void;
}

const RoleContext = createContext<RoleContextType>({
  role: null,
  user: null,
  setRole: () => {},
  setSession: () => {},
  logout: () => {},
});

export function RoleProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem("auth_user");
    return saved ? JSON.parse(saved) as AuthUser : null;
  });
  const [role, setRoleState] = useState<Role>(() => user?.role ?? null);

  function setRole(nextRole: Role) {
    setRoleState(nextRole);
  }

  function setSession(token: string, nextUser: AuthUser) {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_user", JSON.stringify(nextUser));
    setUser(nextUser);
    setRoleState(nextUser.role);
  }

  function logout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setUser(null);
    setRoleState(null);
  }

  return (
    <RoleContext.Provider value={{ role, user, setRole, setSession, logout }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}
