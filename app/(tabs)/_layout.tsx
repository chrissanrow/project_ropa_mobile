import { router, Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const _layout = () => {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if a user session exists
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (!session) {
        router.replace("/login"); // Redirect if not logged in
      } else {
        fetchUserRole(session.user.id); // Fetch role ONLY IF user is logged in
      }

      setLoading(false);
    };

    checkSession();

    // Listen for auth state changes
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      if (!session) {
        router.replace("/login"); // Redirect on logout
        setIsAdmin(false); // Clear user role when logged out
      } else {
        fetchUserRole(session.user.id); // Fetch user role on login
      }
    });
  }, []);

  const fetchUserRole = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("user_id", userId);
  
    if (error || !data || data.length === 0) {
      console.error("Error fetching user role:", error);
      setIsAdmin(false);
      return;
    }
  
    setIsAdmin(data[0].is_admin);
  };
  

  // Prevent rendering tabs while loading auth state
  if (loading || isAdmin === null) return null;

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          href: null
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Tabs.Screen name="admin_scan" options={{ title: "Admin Scan", headerShown: false, href: isAdmin ? '/admin_scan' : null }} />
      <Tabs.Screen name="admin_profile" options={{ title: "Admin Profile", headerShown: false, href: isAdmin ? '/admin_profile' : null }} />
      <Tabs.Screen name="donor_scan" options={{ title: "Donor Scan", headerShown: false, href: !isAdmin ? '/donor_scan' : null }} />
      <Tabs.Screen name="donor_profile" options={{ title: "Donor Profile", headerShown: false, href: !isAdmin ? '/donor_profile' : null }} />
    </Tabs>
  );
};

export default _layout;