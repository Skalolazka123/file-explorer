import { useState, useEffect } from "react";
import FileNode from "./FileNode";

const FileNodeProvider = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch the file system structure from the public directory or API
        const response = await fetch("/data/fs.json");
        if (!response.ok) {
          throw new Error(
            `Network error: ${response.status} ${response.statusText}`,
          );
        }

        const res = await response.json();
        setData(res);

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle loading and error states
  if (isLoading) return <div className="loading-status">Loading...</div>;
  if (error)
    return <div className="error-status">⚠️ Loading error: {error}</div>;
  // Safely check if the root data exists and contains any items
  if (!data?.root || Object.keys(data.root).length === 0) {
    return <div className="empty-status">The file system is empty</div>;
  }

  // Render the top-level folders/files, skipping the technical "root" object wrapper
  return (
    <div className="file-tree-wrapper">
      {Object.entries(data.root).map(([name, nodeData]) => (
        <FileNode key={name} name={name} data={nodeData} path="" />
      ))}
    </div>
  );
};

export default FileNodeProvider;
