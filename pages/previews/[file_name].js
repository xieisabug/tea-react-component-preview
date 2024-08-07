import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import "../../app/globals.css";
import { useRouter } from 'next/router';

const OnlinePreviewPage= () => {
  const [DynamicComponent, setDynamicComponent] = useState(null);
  const router = useRouter();
  const { file_name } = router.query;
  console.log(file_name)

  useEffect(() => {
    const loadComponent = async () => {
      const module = await import('../components/' + file_name);
      setDynamicComponent(() => module.default);
    };
    if (file_name) {
      loadComponent();
    }
  }, [file_name]);

  if (!DynamicComponent) {
    return <div>Loading...</div>;
  }

  return <DynamicComponent />;
};

export default OnlinePreviewPage;
