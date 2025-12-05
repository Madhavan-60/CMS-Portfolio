import { useEffect, useState } from 'react';
import Router from 'next/router';

export const useAuth = () => {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('accessToken');
    setAuthed(Boolean(token));
    setReady(true);
  }, []);

  return { ready, authed };
};

export const withAuth = (Component) => {
  return (props) => {
    const { ready, authed } = useAuth();
    useEffect(() => {
      if (ready && !authed) Router.replace('/login');
    }, [ready, authed]);
    if (!ready) return <div className="p-6">Loading...</div>;
    if (!authed) return null;
    return <Component {...props} />;
  };
};
